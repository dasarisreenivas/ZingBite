import os
import sys
import json
import joblib
from pathlib import Path

# Add root folder to python path
sys.path.append(str(Path(__file__).resolve().parent))

from config import AgentConfig
from nlp.ner import ZingNER
from nlp.intent import ZingIntentClassifier
from nlp.sentiment import ZingSentimentAnalyzer
from nlp.embeddings import ZingEmbeddings
from nlp.nlg import ZingNLG
from models.recommender import ZingRecommender
from models.knowledge_graph import ZingFoodKG

from agent.context import AgentContext
from agent.conversation_memory import ConversationMemory
from agent.dialogue_manager import DialogueManager
from agent.orchestrator import AgentOrchestrator

from tools.menu_search import MenuSearchTool
from tools.cart_tool import CartTool
from tools.order_tracker import OrderTrackerTool
from tools.recommend_tool import RecommendTool
from tools.knowledge_tool import KnowledgeQueryTool
from tools.eta_tool import ETATool
from tools.demand_tool import DemandForecastTool
from tools.fraud_tool import FraudScanTool
from tools.navigate_tool import NavigationTool

def run_cli_agent():
    if len(sys.argv) < 2:
        print(json.dumps({"status": "error", "message": "Missing input payload. Usage: python cli_agent.py '<json_string>'"}))
        return

    payload_str = sys.argv[1]
    try:
        data = json.loads(payload_str)
    except Exception as e:
        print(json.dumps({"status": "error", "message": f"Invalid JSON input: {str(e)}"}))
        return

    message = data.get("message", "").strip()
    session_id = data.get("sessionId") or "default_session"
    
    if not message:
        print(json.dumps({"status": "error", "message": "Missing 'message' parameter"}))
        return

    # Parse context
    context_data = data.get("context") or {}
    user_id = context_data.get("userId")
    role = context_data.get("role", "customer")
    active_page = context_data.get("activePage")
    cart_items = context_data.get("cartItems") or []

    config = AgentConfig()
    
    # Load models
    intent_clf = ZingIntentClassifier()
    intent_clf.load(config.models_dir / "zing_intent" / "model.joblib")

    sentiment_clf = ZingSentimentAnalyzer()
    sentiment_clf.load(config.models_dir / "zing_sentiment" / "model.joblib")

    embeddings = ZingEmbeddings()
    embeddings.load(config.models_dir / "zing_embed" / "model.joblib")

    recommender = ZingRecommender.load(config.models_dir / "zing_rec" / "model.joblib")

    food_kg = ZingFoodKG()
    food_kg.load(config.models_dir / "zing_foodkg" / "graph.json")

    ner = ZingNER()
    dict_path = config.models_dir / "zing_ner" / "dict.joblib"
    if dict_path.exists():
        foods, cuisines, restaurants = joblib.load(dict_path)
        ner.update_dictionary(foods, cuisines, restaurants)

    nlg = ZingNLG()
    memory = ConversationMemory()
    dialogue_manager = DialogueManager(ner, intent_clf, sentiment_clf)

    tools = [
        MenuSearchTool(config.db_url, embeddings),
        CartTool(config.db_url),
        OrderTrackerTool(config.db_url),
        RecommendTool(config.db_url, recommender),
        KnowledgeQueryTool(food_kg),
        ETATool(config.ml_service_url),
        DemandForecastTool(config.db_url, config.ml_service_url),
        FraudScanTool(config.db_url),
        NavigationTool()
    ]

    orchestrator = AgentOrchestrator(dialogue_manager, nlg, tools, memory)
    context = AgentContext(user_id=user_id, role=role, active_page=active_page, cart_items=cart_items)

    try:
        response = orchestrator.process_message(session_id, message, context)
        print(json.dumps(response))
    except Exception as e:
        print(json.dumps({"status": "error", "message": f"CLI Orchestration failure: {str(e)}"}))

if __name__ == "__main__":
    run_cli_agent()
