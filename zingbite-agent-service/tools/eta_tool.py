from tools.base import AgentTool, ToolResult
from agent.context import AgentContext
import requests

class ETATool(AgentTool):
    def __init__(self, ml_service_url: str):
        self.ml_service_url = ml_service_url

    def name(self) -> str:
        return "ETA"

    def description(self) -> str:
        return "Calculate delivery duration using distance, weather, prep time, and traffic parameters."

    def execute(self, params: dict, context: AgentContext) -> ToolResult:
        distance = params.get("distance") or params.get("distanceKm") or 4.0
        prep_time = params.get("prep_time") or params.get("prepTime") or 15
        traffic = params.get("traffic_level") or params.get("trafficLevel") or "Moderate"
        weather = params.get("weather") or "Sunny"
        is_high_rise = params.get("is_high_rise") or params.get("isHighRise") or False

        # Attempt ML service prediction
        ml_prediction = None
        if self.ml_service_url:
            try:
                payload = {
                    "distance": float(distance),
                    "prepTime": float(prep_time),
                    "trafficLevel": traffic,
                    "weather": weather,
                    "isHighRise": bool(is_high_rise)
                }
                r = requests.post(f"{self.ml_service_url}/predict/eta", json=payload, timeout=1.0)
                if r.status_code == 200:
                    ml_prediction = r.json()
            except Exception:
                pass

        if ml_prediction:
            eta = ml_prediction.get("etaMinutes", 25)
            factors = ml_prediction.get("delayFactors", ["normal route conditions"])
        else:
            # Fallback mathematical computation
            traffic_delay = 12 if traffic.lower() == "heavy" else 2 if traffic.lower() == "light" else 6
            weather_delay = 8 if "rain" in weather.lower() else 0
            high_rise_delay = 5 if is_high_rise else 0
            eta = int(max(8, round((distance * 3.8) + prep_time + traffic_delay + weather_delay + high_rise_delay)))
            
            factors = []
            if traffic_delay >= 10: factors.append("heavy traffic")
            if weather_delay > 0: factors.append("weather delay")
            if high_rise_delay > 0: factors.append("high-rise handoff")
            if not factors: factors.append("normal route conditions")

        return ToolResult(
            output=f"Estimated delivery time is {eta} minutes. Delay factors: {', '.join(factors)}.",
            action="NONE",
            payload={"etaMinutes": eta, "delayFactors": factors},
            quick_actions=["Refresh tracker"]
        )
