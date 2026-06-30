from tools.base import AgentTool, ToolResult
from tools.menu_utils import display_menu_name
from agent.context import AgentContext
from sqlalchemy import create_engine, text
import os

class CartTool(AgentTool):
    def __init__(self, db_url: str):
        self.db_url = db_url
        self.engine = create_engine(db_url, pool_pre_ping=True, pool_recycle=1800) if db_url else None
        self.enable_mock_fallbacks = os.getenv("ZINGBITE_AGENT_ENABLE_MOCKS", "false").lower() == "true"

    def name(self) -> str:
        return "Cart"

    def description(self) -> str:
        return "Add food items to the cart, or remove them, and retrieve current cart items."

    def execute(self, params: dict, context: AgentContext) -> ToolResult:
        # Determine add/remove/view
        action_type = params.get("action_type", "add").lower()
        food_item = params.get("food_item")
        quantity = params.get("quantity", 1)

        if action_type == "add" and food_item:
            # First find item menuId
            menu_id = None
            price = 0.0
            rest_name = "restaurant"
            
            if self.engine:
                try:
                    with self.engine.connect() as conn:
                        sql = """
                            select m.MENUID, m.PRICE, r.RESTAURANTNAME, m.MENUNAME, m.ITEMDESCRIPTION
                            from menu m
                            left join restaurant r on r.RESTAURANTID = m.RESTAURANTID
                            where lower(m.MENUNAME) = :exact
                               or lower(m.ITEMDESCRIPTION) = :exact
                               or lower(m.MENUNAME) like :like
                               or lower(m.ITEMDESCRIPTION) like :like
                            order by
                                case
                                    when lower(m.ITEMDESCRIPTION) = :exact then 0
                                    when lower(m.MENUNAME) = :exact then 1
                                    when lower(m.ITEMDESCRIPTION) like :like then 2
                                    else 3
                                end
                            limit 1
                        """
                        res = conn.execute(text(sql), {
                            "exact": food_item.lower(),
                            "like": f"%{food_item.lower()}%"
                        }).fetchone()
                        if res:
                            menu_id = res[0]
                            price = float(res[1])
                            rest_name = res[2]
                            food_item = display_menu_name(res[3], res[4])
                except Exception as e:
                    print("DB Error in CartTool:", e)

            if not menu_id and self.enable_mock_fallbacks:
                mock_menu = {
                    "paneer biryani": (1, 249.0, "Spice Garden"),
                    "chicken biryani": (2, 299.0, "Royal Kitchen"),
                    "veg margherita pizza": (3, 199.0, "Pizza Palace"),
                    "french fries": (4, 99.0, "Pizza Palace"),
                    "masala chai": (5, 49.0, "Spice Garden")
                }
                match = mock_menu.get(food_item.lower())
                if match:
                    menu_id, price, rest_name = match

            if menu_id:
                total = price * quantity
                return ToolResult(
                    output=f"I've added {quantity}x {food_item} from {rest_name} to your cart. Total for this item is Rs {total}.",
                    action="ADD_TO_CART",
                    payload={"menuId": menu_id, "quantity": quantity, "food_item": food_item, "restaurant": rest_name, "price": price, "total": total},
                    quick_actions=["Go to checkout", "View cart"]
                )
            else:
                return ToolResult(
                    output=f"Sorry, I couldn't find a dish named '{food_item}' to add to your cart.",
                    action="NONE"
                )
        
        elif action_type == "view":
            if not context.cart_items:
                return ToolResult(
                    output="Your cart is currently empty.",
                    action="NONE"
                )
            
            items_list = []
            total_cart = 0.0
            for idx, item in enumerate(context.cart_items):
                name = item.get("name") or item.get("menuName") or "Item"
                qty = item.get("quantity") or 1
                price = item.get("price") or 0.0
                subtotal = price * qty
                total_cart += subtotal
                items_list.append(f"{idx+1}. {name} x {qty} (Rs {price}) = Rs {subtotal}")

            return ToolResult(
                output=f"Your cart has these items:\n" + "\n".join(items_list) + f"\nTotal: Rs {total_cart}",
                action="NAVIGATE",
                payload="/cart",
                card_type="cart_items",
                card_data={"items": context.cart_items, "total": total_cart},
                quick_actions=["Go to checkout", "Search more food"]
            )
            
        return ToolResult(
            output="No action taken on the cart.",
            action="NONE"
        )
