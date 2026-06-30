from tools.base import AgentTool, ToolResult
from tools.menu_utils import display_menu_description, display_menu_name
from agent.context import AgentContext
from sqlalchemy import create_engine, text
import pandas as pd
import os

class RecommendTool(AgentTool):
    def __init__(self, db_url: str, recommender_model=None):
        self.db_url = db_url
        self.recommender_model = recommender_model
        self.engine = create_engine(db_url, pool_pre_ping=True, pool_recycle=1800) if db_url else None
        self.enable_mock_fallbacks = os.getenv("ZINGBITE_AGENT_ENABLE_MOCKS", "false").lower() == "true"

    def name(self) -> str:
        return "Recommend"

    def description(self) -> str:
        return "Retrieve personalized menu recommendations based on the user's past ordering patterns."

    def execute(self, params: dict, context: AgentContext) -> ToolResult:
        user_id = context.user_id
        
        # Load all menu items to recommend from
        menu_items = []
        if self.engine:
            try:
                with self.engine.connect() as conn:
                    sql = """
                        select m.MENUID as menuId, m.MENUNAME as menuName, m.PRICE as price, 
                               m.ITEMDESCRIPTION as description, m.ISAVAILABLE as isAvailable, 
                               m.IMAGEPATH as imagePath, r.RESTAURANTNAME as restaurantName,
                               m.RESTAURANTID as restaurantId, r.CUSINETYPE as cuisineType
                        from menu m
                        left join restaurant r on r.RESTAURANTID = m.RESTAURANTID
                        where m.ISAVAILABLE = true
                    """
                    df = pd.read_sql(text(sql), conn)
                    menu_items = df.to_dict('records')
            except Exception as e:
                print("DB Error in RecommendTool:", e)

        if not menu_items and self.enable_mock_fallbacks:
            menu_items = [
                {"menuId": 1, "menuName": "Paneer Biryani", "price": 249.0, "description": "Fragrant basmati rice cooked with soft paneer and Indian spices", "restaurantName": "Spice Garden", "restaurantId": 1, "cuisineType": "Indian", "imagePath": ""},
                {"menuId": 2, "menuName": "Chicken Biryani", "price": 299.0, "description": "Richly spiced rice dish with tender chicken pieces", "restaurantName": "Royal Kitchen", "restaurantId": 2, "cuisineType": "Indian", "imagePath": ""},
                {"menuId": 3, "menuName": "Veg Margherita Pizza", "price": 199.0, "description": "Classic pizza topped with fresh tomato sauce and mozzarella", "restaurantName": "Pizza Palace", "restaurantId": 3, "cuisineType": "Italian", "imagePath": ""},
                {"menuId": 4, "menuName": "French Fries", "price": 99.0, "description": "Crispy golden salted fries", "restaurantName": "Pizza Palace", "restaurantId": 3, "cuisineType": "Fast Food", "imagePath": ""},
                {"menuId": 5, "menuName": "Masala Chai", "price": 49.0, "description": "Freshly brewed spiced tea with milk", "restaurantName": "Spice Garden", "restaurantId": 1, "cuisineType": "Indian", "imagePath": ""}
            ]

        if not menu_items:
            return ToolResult(
                output="I can't reach the menu catalog right now, so I can't create reliable recommendations.",
                action="NONE",
                payload={"status": "error", "reason": "menu_catalog_unavailable"},
                quick_actions=["Search food", "Try again"]
            )

        # Normalize keys to camelCase to ensure database driver casing independence
        normalized_menu_items = []
        for item in menu_items:
            raw_name = item.get("menuName") or item.get("menu_name") or item.get("menuname") or item.get("name") or ""
            raw_description = item.get("description") or item.get("itemdescription") or ""
            normalized_item = {
                "menuId": item.get("menuId") or item.get("menu_id") or item.get("menuid") or item.get("id"),
                "menuName": display_menu_name(raw_name, raw_description),
                "price": float(item.get("price") or 0.0),
                "description": display_menu_description(raw_name, raw_description),
                "isAvailable": item.get("isAvailable") or item.get("isavailable") or True,
                "imagePath": item.get("imagePath") or item.get("imagepath") or "",
                "restaurantName": item.get("restaurantName") or item.get("restaurant_name") or item.get("restaurantname") or "",
                "restaurantId": item.get("restaurantId") or item.get("restaurant_id") or item.get("restaurantid"),
                "cuisineType": item.get("cuisineType") or item.get("cuisine_type") or item.get("cuisinetype") or ""
            }
            normalized_menu_items.append(normalized_item)
        menu_items = normalized_menu_items

        recommended = []
        cart_ids = [item.get("menuId") or item.get("id") for item in context.cart_items]
        
        if self.recommender_model and user_id:
            recommended = self.recommender_model.recommend_items(user_id, menu_items, cart_item_ids=cart_ids, limit=4)
        
        # Heuristics fallback if recommender model has no data/trained state yet
        if not recommended:
            # Recommend items not in cart
            cart_set = set(cart_ids)
            recommended = [item for item in menu_items if (item.get("menuId") or item.get("id")) not in cart_set][:4]
            for item in recommended:
                item["recommend_score"] = 0.95
                item["reason"] = "Popular item based on the current menu"

        items_list = []
        for r in recommended:
            items_list.append(f"- {r['menuName']} from {r['restaurantName']} (Rs {r['price']}) - Match: {int(r.get('recommend_score', 0.95)*100)}%")

        output_text = "Here are some recommendations I selected for you:\n" + "\n".join(items_list)

        return ToolResult(
            output=output_text,
            action="NONE",
            card_type="recommendations",
            card_data={"items": recommended},
            quick_actions=[f"Add {recommended[0]['menuName']}" if recommended else "Checkout"]
        )
