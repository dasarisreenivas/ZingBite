from abc import ABC, abstractmethod
from agent.context import AgentContext

class ToolResult:
    def __init__(self, output: str, action: str = "NONE", payload: dict = None, card_type: str = None, card_data: dict = None, quick_actions: list = None):
        self.output = output
        self.action = action
        self.payload = payload or {}
        self.card_type = card_type
        self.card_data = card_data or {}
        self.quick_actions = quick_actions or []

class AgentTool(ABC):
    @abstractmethod
    def name(self) -> str:
        pass

    @abstractmethod
    def description(self) -> str:
        pass

    @abstractmethod
    def execute(self, params: dict, context: AgentContext) -> ToolResult:
        pass
