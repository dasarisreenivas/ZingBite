from tools.base import AgentTool, ToolResult
from agent.context import AgentContext

class KnowledgeQueryTool(AgentTool):
    def __init__(self, food_kg):
        self.food_kg = food_kg

    def name(self) -> str:
        return "KnowledgeQuery"

    def description(self) -> str:
        return "Query food combinations, pairings, and cuisine tags from the food knowledge graph."

    def execute(self, params: dict, context: AgentContext) -> ToolResult:
        food_item = params.get("food_item")
        if not food_item:
            return ToolResult(output="Please specify a food item to search pairings for.", action="NONE")

        related_info = self.food_kg.get_related_info(food_item)
        pairings = related_info.get("pairings", [])
        cuisines = related_info.get("cuisines", [])
        dietary = related_info.get("dietary", [])
        ingredients = related_info.get("ingredients", [])

        output_parts = [f"Here's what I know about '{food_item}':"]
        if cuisines:
            output_parts.append(f"- Cuisine: {', '.join(cuisines).title()}")
        if dietary:
            output_parts.append(f"- Dietary Tags: {', '.join(dietary).upper()}")
        if ingredients:
            output_parts.append(f"- Key ingredients: {', '.join(ingredients)}")
        if pairings:
            output_parts.append(f"- Recommended pairings: {', '.join(pairings).title()} 🍟🥤")
        else:
            output_parts.append("- No specific food pairings are currently logged in the ontology.")

        output_text = "\n".join(output_parts)
        
        return ToolResult(
            output=output_text,
            action="NONE",
            card_type="knowledge",
            card_data={
                "food_item": food_item,
                "pairings": pairings,
                "cuisines": cuisines,
                "dietary": dietary,
                "ingredients": ingredients
            },
            quick_actions=[f"Search {pairings[0]}" if pairings else "Show recommendations"]
        )
