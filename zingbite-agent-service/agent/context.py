class AgentContext:
    def __init__(self, user_id: int = None, role: str = "customer", active_page: str = None, cart_items: list = None):
        try:
            self.user_id = int(user_id) if user_id is not None else None
        except (TypeError, ValueError):
            self.user_id = None
        self.role = str(role or "customer").lower()
        self.active_page = active_page
        self.cart_items = cart_items if isinstance(cart_items, list) else []
