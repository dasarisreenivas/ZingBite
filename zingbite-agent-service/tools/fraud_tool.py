from tools.base import AgentTool, ToolResult
from agent.context import AgentContext
from sqlalchemy import create_engine, text
import pandas as pd
import os

class FraudScanTool(AgentTool):
    def __init__(self, db_url: str):
        self.db_url = db_url
        self.engine = create_engine(db_url, pool_pre_ping=True, pool_recycle=1800) if db_url else None
        self.enable_mock_fallbacks = os.getenv("ZINGBITE_AGENT_ENABLE_MOCKS", "false").lower() == "true"

    def name(self) -> str:
        return "FraudScan"

    def description(self) -> str:
        return "Scan the system for suspicious user registrations, coordinate duplication, and multi-accounts."

    def execute(self, params: dict, context: AgentContext) -> ToolResult:
        if context.role != "super_admin":
            return ToolResult(
                output="Access denied: only platform super administrators can run fraud scans.",
                action="NONE",
                payload={"status": "error", "reason": "forbidden"},
                quick_actions=["Search food", "Open homepage"]
            )

        users = []
        if self.engine:
            try:
                with self.engine.connect() as conn:
                    # Retrieve recent users
                    sql = "select userid, USERNAME, EMAIL, ADDRESS, latitude, longitude, CREATEDON from user order by CREATEDON desc limit 100"
                    df = pd.read_sql(text(sql), conn)
                    users = df.to_dict('records')
            except Exception as e:
                print("DB Error in FraudScanTool:", e)

        # Basic multi-account checking logic
        clusters = []
        # Group users registered from the same coordinates or identical address
        coords_map = {}
        for u in users:
            lat = u.get("latitude")
            lng = u.get("longitude")
            addr = u.get("ADDRESS")
            if lat and lng:
                key = f"{round(lat, 3)},{round(lng, 3)}"
                coords_map.setdefault(key, []).append(u)

        for coord, matched_users in coords_map.items():
            if len(matched_users) >= 2:
                user_ids = [mu["userid"] for mu in matched_users]
                names = [mu["USERNAME"] for mu in matched_users]
                threat = "CRITICAL" if len(matched_users) >= 4 else "SUSPICIOUS"
                clusters.append({
                    "threatLevel": threat,
                    "explanations": [f"Shared coordinate {coord} across {len(matched_users)} accounts"],
                    "userIds": user_ids,
                    "usernames": names,
                    "description": f"Sybil registration match. {len(matched_users)} users registered from coordinate {coord}: {', '.join(names)}"
                })

        if not clusters and self.enable_mock_fallbacks:
            clusters = [{
                "threatLevel": "SUSPICIOUS",
                "explanations": ["shared delivery coordinates", "new account"],
                "userIds": [22, 23],
                "usernames": ["SybilUser1", "SybilUser2"],
                "description": "Multi-accounts created within 5 minutes sharing IP 192.168.1.15"
            }]

        if not users and not self.enable_mock_fallbacks:
            return ToolResult(
                output="I can't reach user data right now, so I can't run a reliable fraud scan.",
                action="NONE",
                payload={"status": "error", "reason": "user_data_unavailable"},
                quick_actions=["Try again", "Open admin dashboard"]
            )

        output_lines = [f"Fraud detection scan complete. Found {len(clusters)} anomalies:"]
        for c in clusters:
            output_lines.append(f"- [{c['threatLevel']}] {c['description']}")

        return ToolResult(
            output="\n".join(output_lines),
            action="NONE",
            card_type="fraud_alert",
            card_data={"clusters": clusters},
            quick_actions=["Block suspected users", "Export security audit log"]
        )
