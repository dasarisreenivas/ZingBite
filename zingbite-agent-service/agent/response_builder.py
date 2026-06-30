import math
from datetime import date, datetime
from decimal import Decimal


class ResponseBuilder:
    @staticmethod
    def build_response(
        text: str,
        action: str = "NONE",
        payload: dict = None,
        card_type: str = None,
        card_data: dict = None,
        quick_actions: list[str] = None
    ) -> dict:
        response = {
            "status": "success",
            "message": text,
            "action": action,
            "payload": payload or {},
            "card": {
                "type": card_type,
                "data": card_data or {}
            } if card_type else None,
            "quickActions": quick_actions or []
        }
        return ResponseBuilder._json_safe(response)

    @staticmethod
    def _json_safe(value):
        if value is None or isinstance(value, (str, int, bool)):
            return value
        if isinstance(value, float):
            return value if math.isfinite(value) else None
        if isinstance(value, Decimal):
            numeric_value = float(value)
            return numeric_value if math.isfinite(numeric_value) else None
        if isinstance(value, (datetime, date)):
            return value.isoformat()
        if isinstance(value, (bytes, bytearray, memoryview)):
            raw_value = bytes(value)
            if raw_value in (b"\x00", b"\x01"):
                return raw_value == b"\x01"
            return raw_value.decode("utf-8", errors="replace")
        if isinstance(value, dict):
            return {
                str(ResponseBuilder._json_safe(key)): ResponseBuilder._json_safe(item)
                for key, item in value.items()
            }
        if isinstance(value, (list, tuple, set)):
            return [ResponseBuilder._json_safe(item) for item in value]
        if hasattr(value, "item"):
            try:
                return ResponseBuilder._json_safe(value.item())
            except Exception:
                pass
        return str(value)
