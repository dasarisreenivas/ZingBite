import random

class ZingNLG:
    def __init__(self):
        # Sensory adjectives for food
        self.food_descriptors = [
            "sizzling, freshly-prepared", "aromatic, spiced-to-perfection", "mouth-watering",
            "absolutely heavenly", "flavor-packed", "deliciously authentic", "rich and comforting"
        ]
        
        # Enthusiastic comments about food items
        self.food_reactions = {
            "biryani": [
                "Oh, Biryani! The ultimate crown jewel of Indian cuisine. The fragrant basmati rice and slow-cooked spices are hard to beat.",
                "Mmm, Biryani! An absolute masterpiece of flavor. You can never go wrong with those aromatic layers."
            ],
            "pizza": [
                "Pizza time! There is nothing better than hot, melted bubbly cheese on a perfectly baked crust.",
                "Ah, Pizza! The universal language of comfort food. Truly a slice of heaven."
            ],
            "burger": [
                "A juicy burger is always a good idea. That perfect combination of savory goodness and soft buns is unbeatable.",
                "Burgers! Sizzling, flavor-packed, and completely satisfying. You're in for a treat."
            ],
            "fries": [
                "French Fries! Golden, crispy, and addictive. The perfect sidekick to any meal.",
                "Ah, crispy golden fries! Lightly salted and absolutely delicious."
            ],
            "chai": [
                "Ah, Masala Chai! Spiced, warm, and comforting. It's not just a drink, it's an emotion.",
                "Masala Chai! Spiced to perfection with milk and love. The ultimate refresher."
            ]
        }

        self.greetings = [
            "Hey there, fellow food lover! ZingBot here, ready to guide you on a delicious culinary adventure. What are we craving today?",
            "Welcome! I'm ZingBot, and I am absolutely obsessed with food. Let's find you some mouth-watering dishes, track your orders, or build the perfect combo today.",
            "Hi! ZingBot at your service. I've been dreaming about sizzling cuisines all day. What can I help you discover or order right now?"
        ]

    def _get_food_reaction(self, food_item: str) -> str:
        food_item = food_item.lower()
        for key, reactions in self.food_reactions.items():
            if key in food_item:
                return random.choice(reactions)
        return f"Ah, {food_item}! An absolute delight for the tastebuds. Excellent choice."

    def _get_descriptor(self) -> str:
        return random.choice(self.food_descriptors)

    def generate(self, category: str, slots: dict, sentiment: str = "NEUTRAL") -> str:
        food_item = slots.get("food_item") or ""
        restaurant = slots.get("restaurant") or "our kitchen"
        quantity = slots.get("quantity") or 1
        price = slots.get("price") or 0
        total = slots.get("total") or 0
        order_id = slots.get("order_id") or 100
        status = slots.get("status") or "processing"
        eta_minutes = slots.get("eta_minutes") or 20
        factors = slots.get("factors") or "normal route conditions"
        query = slots.get("query") or "food"

        # 1. GREETING
        if category == "GREETING":
            return random.choice(self.greetings)

        # 2. ORDER_ADDED
        if category == "ORDER_ADDED":
            desc = self._get_descriptor()
            reaction = self._get_food_reaction(food_item)
            templates = [
                f"{reaction}\n\nI've successfully added {quantity}x {desc} **{food_item}** from *{restaurant}* to your cart. That comes to Rs {total}. Shall we head to the checkout page, or are we looking for more treats?",
                f"Awesome choice! {quantity}x {desc} **{food_item}** is now safe in your cart (Rs {price} each). {reaction} Total is Rs {total}. What's next on our food map?",
                f"Done! {quantity}x **{food_item}** from *{restaurant}* is in the cart. {reaction} Ready to place the order?"
            ]
            return random.choice(templates)

        # 3. SEARCH_RESULTS
        if category == "SEARCH_RESULTS":
            items_list = slots.get("items_list") or ""
            templates = [
                f"Here are some delicious matches I found for '{query}':\n\n{items_list}\n\nClick 'Add' next to any dish to start building your feast.",
                f"Look what we have here! The kitchen is ready to prepare these matching dishes:\n\n{items_list}\n\nWhich one is calling your name?"
            ]
            return random.choice(templates)

        # 4. RECOMMENDATIONS
        if category == "RECOMMENDATIONS":
            items_list = slots.get("items_list") or ""
            templates = [
                f"I did a little flavor-profiling and picked out these recommendations:\n\n{items_list}\n\nThey pair nicely with our trending items. What do you think?",
                f"Since you appreciate good food, you've got to check these out:\n\n{items_list}\n\nHighly recommended by our local chefs."
            ]
            return random.choice(templates)

        # 5. CART_ITEMS
        if category == "CART_ITEMS":
            items_list = slots.get("items_list") or ""
            templates = [
                f"Your cart looks absolutely spectacular! Here is the feast you've selected:\n\n{items_list}\n\n**Total: Rs {total}**\n\nEverything is set for preparation. Shall we go to checkout and get this cooking?",
                f"Here's your current selection of goodies:\n\n{items_list}\n\n**Total: Rs {total}**. Ready to place the order and satisfy that hunger?"
            ]
            return random.choice(templates)

        # 6. CART_EMPTY
        if category == "CART_EMPTY":
            return "Your cart is currently empty. Ask me to search for 'Pizza', 'Biryani', or 'Burger' to start your feast."

        # 7. TRACK_ORDER
        if category == "TRACK_ORDER":
            status_map = {
                "PLACED": "is placed and the kitchen is getting ready to prepare it!",
                "ACCEPTED": "is accepted! The chefs are selecting the finest ingredients.",
                "PREPARING": "is sizzling in the kitchen right now.",
                "READY_FOR_PICKUP": "is packed and ready for rider pickup.",
                "PICKED_UP": "has been picked up by the delivery partner.",
                "OUT_FOR_DELIVERY": "is out for delivery! The delivery partner is heading to your location.",
                "DELIVERED": "has been delivered! Time to dig in and enjoy the feast."
            }
            desc = status_map.get(status.upper(), "is being processed.")
            return f"Great news! Your order #{order_id} {desc} I'll keep monitoring it for you."

        # 8. ETA_PREDICTION
        if category == "ETA_PREDICTION":
            return f"Your food will arrive in approximately **{eta_minutes} minutes**. Current route factors: {factors}. Almost time to eat!"

        # 9. COMPLAINT_ACK
        if category == "COMPLAINT_ACK":
            reason = slots.get("sentiment_reason") or "issue"
            return f"I'm sorry to hear that. I have flagged order #{order_id} regarding '{reason}' and escalated it to our support team."

        # 10. REFUND_ACK
        if category == "REFUND_ACK":
            return f"I've initiated a refund ticket for your order #{order_id} due to order issues. Our support team will process it."

        # 11. NO_SEARCH_RESULTS
        if category == "NO_SEARCH_RESULTS":
            return f"I couldn't find any dishes matching '{query}' on the menu today. Try another craving, like pizza or masala chai."

        # 12. CLARIFY_ORDER
        if category == "CLARIFY_ORDER":
            options = slots.get("options") or "our restaurants"
            return f"I found the delicious '{food_item}' at multiple spots! Which restaurant should we add it from? \n{options}"

        # 13. CLARIFY_INTENT
        return "I'm not sure I quite got that. You can ask me to 'search spicy food', 'add biryani to cart', 'track my latest order', or 'recommend what to eat'."
