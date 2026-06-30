from collections import defaultdict
from models.dst import ZingDST

class ConversationMemory:
    def __init__(self):
        self.history = defaultdict(list)
        self.dst_states = defaultdict(ZingDST)

    def add_message(self, session_id: str, sender: str, text: str):
        self.history[session_id].append({"sender": sender, "text": text})
        # sliding window of last 20 messages
        if len(self.history[session_id]) > 20:
            self.history[session_id] = self.history[session_id][-20:]

    def get_history(self, session_id: str) -> list[dict]:
        return self.history[session_id]

    def get_dst(self, session_id: str) -> ZingDST:
        return self.dst_states[session_id]

    def clear(self, session_id: str):
        if session_id in self.history:
            del self.history[session_id]
        if session_id in self.dst_states:
            del self.dst_states[session_id]
