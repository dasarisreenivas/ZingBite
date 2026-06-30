from agent.context import AgentContext
from agent.conversation_memory import ConversationMemory
from agent.dialogue_manager import DialogueManager
from agent.response_builder import ResponseBuilder
from nlp.nlg import ZingNLG
from tools.base import AgentTool

class AgentOrchestrator:
    def __init__(self, dialogue_manager: DialogueManager, nlg: ZingNLG, tools: list[AgentTool], memory: ConversationMemory):
        self.dialogue_manager = dialogue_manager
        self.nlg = nlg
        self.memory = memory
        self.tools = {tool.name(): tool for tool in tools}

    def process_message(self, session_id: str, message: str, context: AgentContext) -> dict:
        # Get memory and Dialogue state tracker
        history = self.memory.get_history(session_id)
        dst = self.memory.get_dst(session_id)
        
        # 1. Update memory
        self.memory.add_message(session_id, "user", message)
        
        # 2. Process inputs (classify intent, entities, sentiment, dialogue state update)
        intent, slots, sentiment = self.dialogue_manager.process_input(message, dst)
        
        # 3. Reason & execute appropriate tool
        tool_name = self._map_intent_to_tool(intent)
        tool_result = None
        
        if tool_name and tool_name in self.tools:
            tool = self.tools[tool_name]
            # Build tool parameters from dialog state slots
            tool_params = self._build_tool_params(intent, slots)
            tool_params["raw_message"] = message
            try:
                tool_result = tool.execute(tool_params, context)
            except Exception as e:
                print(f"Error executing tool {tool_name}:", e)
                
        # 4. Generate response message (NLG)
        if self._is_tool_error(tool_result):
            self.memory.add_message(session_id, "bot", tool_result.output)
            return ResponseBuilder.build_response(
                text=tool_result.output,
                action=tool_result.action,
                payload=tool_result.payload,
                quick_actions=tool_result.quick_actions
            )

        # 5. Build structured response
        if tool_result:
            nlg_output = tool_result.output
            action = tool_result.action
            payload = tool_result.payload
            card_type = tool_result.card_type
            card_data = tool_result.card_data
            quick_actions = tool_result.quick_actions
        else:
            nlg_slots = self._build_nlg_slots(intent, slots, tool_result)
            nlg_category = self._map_intent_to_nlg_category(intent, tool_result)
            nlg_output = self.nlg.generate(nlg_category, nlg_slots, sentiment)
            action = "NONE"
            payload = {}
            card_type = None
            card_data = {}
            quick_actions = ["Search food", "Open cart"]
            if intent == "GREETING":
                quick_actions = ["Show popular food", "Order pizza"]

        # Append assistant response to history
        self.memory.add_message(session_id, "bot", nlg_output)
        
        return ResponseBuilder.build_response(
            text=nlg_output,
            action=action,
            payload=payload,
            card_type=card_type,
            card_data=card_data,
            quick_actions=quick_actions
        )

    def _is_tool_error(self, tool_result) -> bool:
        return bool(tool_result and (tool_result.payload or {}).get("status") == "error")

    def _map_intent_to_tool(self, intent: str) -> str:
        intent_tool_map = {
            "SEARCH_FOOD": "MenuSearch",
            "ORDER_FOOD": "Cart",
            "CHECK_CART": "Cart",
            "TRACK_ORDER": "OrderTracker",
            "GET_RECOMMENDATION": "Recommend",
            "ASK_ETA": "ETA",
            "DEMAND_FORECAST": "DemandForecast",
            "FRAUD_CHECK": "FraudScan",
            "NAVIGATE": "Navigation",
            "GENERAL_QUERY": "KnowledgeQuery"
        }
        return intent_tool_map.get(intent)

    def _build_tool_params(self, intent: str, slots: dict) -> dict:
        params = dict(slots)
        if intent == "CHECK_CART":
            params["action_type"] = "view"
        elif intent == "ORDER_FOOD":
            params["action_type"] = "add"
        return params

    def _map_intent_to_nlg_category(self, intent: str, tool_result) -> str:
        if intent == "GREETING":
            return "GREETING"
        if intent == "ORDER_FOOD":
            return "ORDER_ADDED" if (tool_result and tool_result.action == "ADD_TO_CART") else "NO_SEARCH_RESULTS"
        if intent == "CHECK_CART":
            return "CART_ITEMS" if (tool_result and tool_result.card_type == "cart_items") else "CART_EMPTY"
        if intent == "SEARCH_FOOD":
            return "SEARCH_RESULTS" if (tool_result and tool_result.card_type == "food_results") else "NO_SEARCH_RESULTS"
        if intent == "TRACK_ORDER":
            return "TRACK_ORDER"
        if intent == "GET_RECOMMENDATION":
            return "RECOMMENDATIONS"
        if intent == "ASK_ETA":
            return "ETA_PREDICTION"
        if intent == "COMPLAINT":
            return "COMPLAINT_ACK"
        if intent == "REFUND_REQUEST":
            return "REFUND_ACK"
        if intent == "DEMAND_FORECAST":
            return "DEMAND_FORECAST"
        if intent == "FRAUD_CHECK":
            return "FRAUD_DETECT"
        if intent == "NAVIGATE":
            return "NAVIGATE"
        return "CLARIFY_INTENT"

    def _build_nlg_slots(self, intent: str, slots: dict, tool_result) -> dict:
        nlg_slots = {
            "quantity": slots.get("quantity", 1),
            "food_item": slots.get("food_item") or "food",
            "restaurant": slots.get("restaurant_id") or "restaurant",
            "price": slots.get("price_max") or 0,
            "total": slots.get("price_max") or 0,
            "query": slots.get("food_item") or "food",
            "order_id": slots.get("order_id") or 101,
            "status": "in progress",
            "eta_msg": "",
            "eta_minutes": 25,
            "factors": "normal delivery conditions",
            "items_list": "",
            "forecast_list": "",
            "alert_msg": "",
            "page_name": slots.get("page_name") or "home",
            "refund_reason": "order cancelation",
            "sentiment_reason": "unsatisfactory",
            "count": 0,
            "action": "none"
        }
        
        if tool_result:
            p = tool_result.payload or {}
            c_data = tool_result.card_data or {}
            
            # Map tool execution outputs back to NLG placeholders
            if "total" in p:
                nlg_slots["total"] = p["total"]
            if "price" in p:
                nlg_slots["price"] = p["price"]
            if "restaurant" in p:
                nlg_slots["restaurant"] = p["restaurant"]
                
            if intent == "SEARCH_FOOD" and "items" in c_data:
                items = c_data["items"]
                nlg_slots["items_list"] = "\n".join([f"- {item['menuName']} from {item['restaurantName']} (Rs {item['price']})" for item in items])
                
            if intent == "CHECK_CART" and "items" in c_data:
                items = c_data["items"]
                nlg_slots["items_list"] = "\n".join([f"- {item.get('name') or item.get('menuName')} x {item.get('quantity') or 1} (Rs {item.get('price')})" for item in items])
                nlg_slots["total"] = c_data.get("total", 0.0)
                
            if intent == "GET_RECOMMENDATION" and "items" in c_data:
                items = c_data["items"]
                nlg_slots["items_list"] = "\n".join([f"- {item['menuName']} from {item['restaurantName']} (Rs {item['price']})" for item in items])
                
            if intent == "TRACK_ORDER":
                nlg_slots["status"] = c_data.get("orderStatus", "PLACED")
                nlg_slots["order_id"] = c_data.get("orderId", 101)
                
            if intent == "ASK_ETA":
                nlg_slots["eta_minutes"] = p.get("etaMinutes", 25)
                nlg_slots["factors"] = ", ".join(p.get("delayFactors", ["normal route conditions"]))

            if intent == "DEMAND_FORECAST" and "forecasts" in c_data:
                forecasts = c_data["forecasts"]
                nlg_slots["forecast_list"] = "\n".join([f"- {f['itemName']}: Forecast {f['predictedQuantity']} orders" for f in forecasts])
                
            if intent == "FRAUD_CHECK" and "clusters" in c_data:
                nlg_slots["count"] = len(c_data["clusters"])
                nlg_slots["action"] = "review and block"

        return nlg_slots
