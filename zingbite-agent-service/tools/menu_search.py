from tools.base import AgentTool, ToolResult
from tools.menu_utils import display_menu_description, display_menu_name
from agent.context import AgentContext
from sqlalchemy import create_engine, text
import pandas as pd
import os
import re

class MenuSearchTool(AgentTool):
    def __init__(self, db_url: str, embeddings=None):
        self.db_url = db_url
        self.embeddings = embeddings
        self.engine = create_engine(db_url, pool_pre_ping=True, pool_recycle=1800) if db_url else None
        self.enable_mock_fallbacks = os.getenv("ZINGBITE_AGENT_ENABLE_MOCKS", "false").lower() == "true"

    def name(self) -> str:
        return "MenuSearch"

    def description(self) -> str:
        return "Search the menu for food items based on keyword, price, cuisine, and dietary requirements."

    def execute(self, params: dict, context: AgentContext) -> ToolResult:
        raw_message = params.get("raw_message") or ""
        query = params.get("query") or params.get("food_item") or raw_message
        price_max = params.get("price_max")
        cuisine = params.get("cuisine_filter")
        dietary = params.get("dietary")
        search_terms = self._search_terms(query, raw_message)

        # Load menu items
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
                print("DB Error in MenuSearchTool:", e)

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
                output="I can't reach the menu catalog right now, so I can't search reliable live menu data.",
                action="NONE",
                payload={"status": "error", "reason": "menu_catalog_unavailable"},
                quick_actions=["Try again", "Open homepage"]
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

        # Filter
        scored_matches = []
        for item in menu_items:
            name_lower = item["menuName"].lower()
            desc_lower = str(item["description"]).lower()
            searchable_text = " ".join([
                name_lower,
                desc_lower,
                str(item["restaurantName"]).lower(),
                str(item["cuisineType"]).lower()
            ])
            
            # Text match
            keyword_score = self._keyword_score(search_terms, name_lower, desc_lower, searchable_text)
            keyword_match = keyword_score > 0
            
            # Semantic search override if available
            if not keyword_match and self.embeddings and query:
                # Calculate similarity score inside execute or rely on embedding index search
                pass

            # Cuisine filter
            cuisine_match = not cuisine or (cuisine.lower() in str(item["cuisineType"]).lower())
            
            # Price filter
            price_match = not price_max or (item["price"] <= price_max)
            
            # Dietary filter
            dietary_match = True
            if dietary:
                d_val = dietary.lower()
                if d_val == "veg" and "chicken" in name_lower:
                    dietary_match = False
                elif d_val == "non-veg" and "paneer" in name_lower:
                    dietary_match = False

            if keyword_match and cuisine_match and price_match and dietary_match:
                scored_matches.append((keyword_score, item))

        # Enforce limit
        matches = []
        if scored_matches:
            scored_matches.sort(key=lambda match: match[0], reverse=True)
            best_score = scored_matches[0][0]
            threshold = max(1, best_score * 0.5) if search_terms else 1
            matches = [item for score, item in scored_matches if score >= threshold][:5]
        
        if not matches:
            return ToolResult(
                output=f"I couldn't find any items matching '{query or 'filters'}' under your specifications.",
                action="NONE",
                quick_actions=["Show popular menu", "Open homepage"]
            )

        # Format items list
        items_list = []
        for m in matches:
            items_list.append(f"- {m['menuName']} from {m['restaurantName']} (Rs {m['price']})")
        
        output_text = "I found these delicious options for you:\n" + "\n".join(items_list)
        
        return ToolResult(
            output=output_text,
            action="SEARCH",
            payload={"items": matches},
            card_type="food_results",
            card_data={"items": matches},
            quick_actions=[f"Add {matches[0]['menuName']}" if matches else "Checkout"]
        )

    def _search_terms(self, query: str, raw_message: str) -> list[str]:
        stopwords = {
            "show", "me", "find", "search", "looking", "for", "where", "can", "get", "some",
            "food", "dish", "dishes", "item", "items", "menu", "popular", "near", "with",
            "under", "below", "less", "than", "within", "rs", "please", "want"
        }
        terms = []
        for source in [query, raw_message]:
            normalized = re.sub(r"[^a-z0-9\s]", " ", str(source or "").lower()).strip()
            if not normalized:
                continue
            tokens = [token for token in normalized.split() if len(token) > 2 and token not in stopwords and not token.isdigit()]
            if len(tokens) <= 3:
                phrase = " ".join(tokens)
                if phrase:
                    terms.append(phrase)
            terms.extend(tokens)

        unique_terms = []
        for term in terms:
            if term and term not in unique_terms:
                unique_terms.append(term)
        return unique_terms

    def _keyword_score(self, terms: list[str], name: str, description: str, searchable_text: str) -> float:
        if not terms:
            return 1.0

        score = 0.0
        for term in terms:
            if not term:
                continue
            is_phrase = " " in term
            if term in name:
                score += 5.0 if is_phrase else 2.0
            elif term in description:
                score += 3.0 if is_phrase else 1.0
            elif term in searchable_text:
                score += 1.0
        return score
