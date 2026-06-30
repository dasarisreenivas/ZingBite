import re
from difflib import get_close_matches

class ZingNER:
    def __init__(self):
        self.food_items = []
        self.cuisines = []
        self.restaurants = []
        self.dietary_tags = ["veg", "non-veg", "spicy", "extra spicy", "vegan", "gluten-free", "healthy", "sweet"]
        self.locations = ["koramangala", "jp nagar", "indiranagar", "whitefield", "hsr layout", "jayanagar"]

    def update_dictionary(self, food_items: list[str], cuisines: list[str], restaurants: list[str]):
        self.food_items = list(set([item.lower() for item in food_items if item]))
        self.cuisines = list(set([c.lower() for c in cuisines if c]))
        self.restaurants = list(set([r.lower() for r in restaurants if r]))

    def extract_entities(self, text: str) -> dict[str, list]:
        entities = {
            "FOOD_ITEM": [],
            "CUISINE": [],
            "QUANTITY": [],
            "PRICE": [],
            "RESTAURANT": [],
            "DIETARY": [],
            "LOCATION": []
        }
        
        text_lower = text.lower().strip()
        
        # 1. Extract Price Pattern (e.g. under 200, below 300, less than 400, under rs 500)
        price_patterns = [
            r'(?:under|below|less than|within)\s*(?:rs\.?|₹)?\s*(\d+)',
            r'(?:rs\.?|₹)?\s*(\d+)\s*(?:budget|or less|under)'
        ]
        for pattern in price_patterns:
            matches = re.findall(pattern, text_lower)
            for m in matches:
                entities["PRICE"].append(int(m))
                
        # 2. Extract Quantity Pattern (e.g., 2 biryani, two burgers, a plate of fries)
        qty_word_map = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10}
        qty_patterns = [
            r'\b(\d+)\b',
            r'\b(one|two|three|four|five|six|seven|eight|nine|ten)\b'
        ]
        # Match quantity when it precedes a food item or word or stand-alone
        for pattern in qty_patterns:
            matches = re.finditer(pattern, text_lower)
            for m in matches:
                val = m.group(1)
                num = int(val) if val.isdigit() else qty_word_map.get(val, 1)
                entities["QUANTITY"].append(num)

        if not entities["QUANTITY"]:
            # Check default "a plate of", "an order of" -> 1
            if "plate of" in text_lower or "order of" in text_lower or "add a " in text_lower or "add an " in text_lower:
                entities["QUANTITY"].append(1)

        # 3. Extract Dietary tags
        for tag in self.dietary_tags:
            if tag in text_lower:
                entities["DIETARY"].append(tag)
        if "vegetarian" in text_lower:
            entities["DIETARY"].append("veg")

        # 4. Extract Locations
        for loc in self.locations:
            if loc in text_lower:
                entities["LOCATION"].append(loc)

        # 5. Extract Restaurants
        for rest in self.restaurants:
            if rest in text_lower:
                entities["RESTAURANT"].append(rest)
        
        # 6. Extract Cuisines
        for cuisine in self.cuisines:
            if cuisine in text_lower:
                entities["CUISINE"].append(cuisine)

        # 7. Extract Food Items using matching & substring searches
        # Sort food items by length descending so longer matches take precedence
        sorted_foods = sorted(self.food_items, key=len, reverse=True)
        for food in sorted_foods:
            if food in text_lower:
                # Avoid duplicates and check if it's already sub-part of a matched food
                if not any(food in matched for matched in entities["FOOD_ITEM"]):
                    entities["FOOD_ITEM"].append(food)
            else:
                # Token-level keyword matching (e.g. user said "pizza" which matches "veg margherita pizza")
                food_tokens = [t for t in food.split() if len(t) > 3 and t not in ["with", "fresh", "cooked", "spiced", "spices", "style", "plate", "dish"]]
                for token in food_tokens:
                    if token in text_lower:
                        if not any(food in matched for matched in entities["FOOD_ITEM"]):
                            entities["FOOD_ITEM"].append(food)
                            break

        # If no food item is found, do a fuzzy word-by-word match
        if not entities["FOOD_ITEM"] and sorted_foods:
            words = text_lower.split()
            for word in words:
                if len(word) > 3:
                    fuzzy_matches = get_close_matches(word, sorted_foods, n=1, cutoff=0.75)
                    if fuzzy_matches:
                        entities["FOOD_ITEM"].append(fuzzy_matches[0])
                        break

        return entities
