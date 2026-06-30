from tools.base import AgentTool, ToolResult
from agent.context import AgentContext

class NavigationTool(AgentTool):
    def name(self) -> str:
        return "Navigation"

    def description(self) -> str:
        return "Navigate user browser to specific sections of the app (e.g. cart, checkout, profile, admin panels)."

    def execute(self, params: dict, context: AgentContext) -> ToolResult:
        destination = params.get("destination") or params.get("page_name") or ""
        destination = destination.lower().strip()

        dest_map = {
            "cart": "/cart",
            "checkout": "/checkout",
            "profile": "/profile",
            "orders": "/profile",
            "history": "/profile",
            "wishlist": "/wishlist",
            "favorites": "/wishlist",
            "home": "/home",
            "restaurants": "/home",
            "admin": "/restaurant-admin",
            "restaurant-admin": "/restaurant-admin",
            "super-admin": "/super-admin",
            "careers": "/careers",
            "apply": "/careers"
        }

        # Find best match in keys
        matched_path = None
        for key, path in dest_map.items():
            if key in destination:
                matched_path = path
                break

        if not matched_path:
            # check default
            matched_path = "/home"
            destination = "home"

        return ToolResult(
            output=f"Opening the {destination} page now.",
            action="NAVIGATE",
            payload=matched_path,
            quick_actions=["Go back to chat", "Show recommendations"]
        )
