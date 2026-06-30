class ZingDST:
    def __init__(self):
        self.reset()

    def reset(self):
        self.state = {
            "intent": None,
            "food_item": None,
            "quantity": 1,
            "restaurant_id": None,
            "cuisine_filter": None,
            "price_max": None,
            "dietary": None,
            "confirmed": False
        }

    def update(self, intent: str, entities: dict) -> dict:
        self.state["intent"] = intent
        
        if entities.get("FOOD_ITEM"):
            self.state["food_item"] = entities["FOOD_ITEM"][0]
            
        if entities.get("QUANTITY"):
            self.state["quantity"] = int(entities["QUANTITY"][0])
            
        if entities.get("PRICE"):
            self.state["price_max"] = int(entities["PRICE"][0])
            
        if entities.get("CUISINE"):
            self.state["cuisine_filter"] = entities["CUISINE"][0]
            
        if entities.get("DIETARY"):
            self.state["dietary"] = entities["DIETARY"][0]
            
        if entities.get("RESTAURANT"):
            # If we match restaurant name, save it. ID resolution happens inside search tools
            self.state["restaurant_id"] = entities["RESTAURANT"][0]
            
        return self.state

    def check_missing_slots(self) -> list[str]:
        missing = []
        if self.state["intent"] == "ORDER_FOOD":
            if not self.state["food_item"]:
                missing.append("food_item")
        return missing
