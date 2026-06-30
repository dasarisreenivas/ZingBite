from tools.base import AgentTool, ToolResult
from agent.context import AgentContext
from sqlalchemy import create_engine, text

ORDER_STATUS_ALIASES = {
    "CONFIRMED": "ACCEPTED",
    "DELIVERING": "OUT_FOR_DELIVERY"
}

STATUS_MESSAGES = {
    "PLACED": "has been placed and is awaiting restaurant confirmation.",
    "ACCEPTED": "has been accepted by the restaurant.",
    "PREPARING": "is being prepared in the kitchen right now.",
    "READY_FOR_PICKUP": "is packed and ready for rider pickup.",
    "PICKED_UP": "has been picked up by the delivery partner.",
    "OUT_FOR_DELIVERY": "is out for delivery. The delivery partner is on the way.",
    "DELIVERED": "has been successfully delivered. Hope you enjoyed the meal."
}

ELEVATED_ROLES = {"super_admin", "restaurant_admin", "delivery_partner"}

class OrderTrackerTool(AgentTool):
    def __init__(self, db_url: str):
        self.db_url = db_url
        self.engine = create_engine(db_url, pool_pre_ping=True, pool_recycle=1800) if db_url else None

    def name(self) -> str:
        return "OrderTracker"

    def description(self) -> str:
        return "Track order status, estimated delivery time, and rider updates for active orders."

    def execute(self, params: dict, context: AgentContext) -> ToolResult:
        order_id = self._parse_order_id(params.get("order_id"))
        user_id = context.user_id
        role = (context.role or "customer").lower()

        if not user_id and role not in ELEVATED_ROLES:
            return ToolResult(
                output="Please log in to track your orders securely.",
                action="NONE",
                payload={"status": "error", "reason": "auth_required"},
                quick_actions=["Log in", "Search food"]
            )

        if not self.engine:
            return self._service_unavailable_result()

        order = None
        try:
            with self.engine.connect() as conn:
                res = self._fetch_order(conn, order_id, user_id, role)
                if res:
                    order = {
                        "orderId": res[0],
                        "orderStatus": self._normalize_status(res[1]),
                        "totalAmount": float(res[2] or 0.0),
                        "riderId": res[3],
                        "gpsProgress": res[4],
                        "surgeMultiplier": float(res[5] or 1.0)
                    }
        except Exception as e:
            print("DB Error in OrderTrackerTool:", e)
            return self._service_unavailable_result()

        if not order:
            return ToolResult(
                output="I couldn't find that order for your account.",
                action="NONE",
                payload={"status": "error", "reason": "not_found"},
                quick_actions=["Refresh tracking", "Open support chat"]
            )

        status = order["orderStatus"]
        oid = order["orderId"]
        msg = f"Order #{oid} {STATUS_MESSAGES.get(status, 'is in progress')}."
        
        return ToolResult(
            output=msg,
            action="NONE",
            card_type="order_status",
            card_data=order,
            quick_actions=["Refresh tracking", "Open support chat"]
        )

    def _fetch_order(self, conn, order_id, user_id, role: str):
        fields = "orderId, orderStatus, totalAmount, riderId, gpsProgress, surgeMultiplier"
        if order_id and role in ELEVATED_ROLES:
            sql = f"select {fields} from orders where orderId = :oid limit 1"
            return conn.execute(text(sql), {"oid": order_id}).fetchone()

        if order_id:
            sql = f"select {fields} from orders where orderId = :oid and userId = :uid limit 1"
            return conn.execute(text(sql), {"oid": order_id, "uid": user_id}).fetchone()

        sql = f"select {fields} from orders where userId = :uid order by orderId desc limit 1"
        return conn.execute(text(sql), {"uid": user_id}).fetchone()

    def _parse_order_id(self, raw_order_id):
        if raw_order_id is None:
            return None
        value = str(raw_order_id).strip().upper().removeprefix("ZB-")
        if not value.isdigit():
            return None
        return int(value)

    def _normalize_status(self, raw_status) -> str:
        status = str(raw_status or "PLACED").strip().upper().replace(" ", "_")
        return ORDER_STATUS_ALIASES.get(status, status)

    def _service_unavailable_result(self) -> ToolResult:
        return ToolResult(
            output="I can't reach the order system right now. Please try again in a moment.",
            action="NONE",
            payload={"status": "error", "reason": "order_service_unavailable"},
            quick_actions=["Refresh tracking", "Open support chat"]
        )
