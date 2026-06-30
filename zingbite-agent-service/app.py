import os
import joblib
from flask import Flask, request, jsonify
from config import AgentConfig
from training.train_all import train_all

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

app = Flask(__name__)
config = AgentConfig()

REQUIRED_ARTIFACTS = [
    config.models_dir / "zing_intent" / "model.joblib",
    config.models_dir / "zing_sentiment" / "model.joblib",
    config.models_dir / "zing_embed" / "model.joblib",
    config.models_dir / "zing_rec" / "model.joblib",
    config.models_dir / "zing_foodkg" / "graph.json",
]

missing_artifacts = [str(path) for path in REQUIRED_ARTIFACTS if not path.exists()]
if missing_artifacts:
    if not config.auto_train_models:
        raise RuntimeError(
            "Missing AI model artifacts. Run training first or set "
            "ZINGBITE_AGENT_AUTO_TRAIN=true for local/demo startup. Missing: "
            + ", ".join(missing_artifacts)
        )
    print("No trained models found. Running initial training...")
    train_all()

# Load models
print("Loading NLP models...")
intent_clf = ZingIntentClassifier()
intent_clf.load(config.models_dir / "zing_intent" / "model.joblib")

sentiment_clf = ZingSentimentAnalyzer()
sentiment_clf.load(config.models_dir / "zing_sentiment" / "model.joblib")

embeddings = ZingEmbeddings()
embeddings.load(config.models_dir / "zing_embed" / "model.joblib")

recommender = ZingRecommender.load(config.models_dir / "zing_rec" / "model.joblib")

food_kg = ZingFoodKG()
food_kg.load(config.models_dir / "zing_foodkg" / "graph.json")

# Pre-warmed NER
ner = ZingNER()
dict_path = config.models_dir / "zing_ner" / "dict.joblib"
if dict_path.exists():
    foods, cuisines, restaurants = joblib.load(dict_path)
    ner.update_dictionary(foods, cuisines, restaurants)

nlg = ZingNLG()
memory = ConversationMemory()
dialogue_manager = DialogueManager(ner, intent_clf, sentiment_clf)

# Initialize tools
from tools.menu_search import MenuSearchTool
from tools.cart_tool import CartTool
from tools.order_tracker import OrderTrackerTool
from tools.recommend_tool import RecommendTool
from tools.knowledge_tool import KnowledgeQueryTool
from tools.eta_tool import ETATool
from tools.demand_tool import DemandForecastTool
from tools.fraud_tool import FraudScanTool
from tools.navigate_tool import NavigationTool

def build_tools(recommender_model):
    return [
        MenuSearchTool(config.db_url, embeddings),
        CartTool(config.db_url),
        OrderTrackerTool(config.db_url),
        RecommendTool(config.db_url, recommender_model),
        KnowledgeQueryTool(food_kg),
        ETATool(config.ml_service_url),
        DemandForecastTool(config.db_url, config.ml_service_url),
        FraudScanTool(config.db_url),
        NavigationTool()
    ]

tools = build_tools(recommender)

orchestrator = AgentOrchestrator(dialogue_manager, nlg, tools, memory)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "zingbite-agent-service",
        "models": ["ner", "intent", "sentiment", "embeddings", "recommender", "knowledge_graph"]
    })

@app.route("/train", methods=["POST"])
def train():
    global recommender, tools, orchestrator
    try:
        train_all()
        # Reload models
        intent_clf.load(config.models_dir / "zing_intent" / "model.joblib")
        sentiment_clf.load(config.models_dir / "zing_sentiment" / "model.joblib")
        embeddings.load(config.models_dir / "zing_embed" / "model.joblib")
        recommender = ZingRecommender.load(config.models_dir / "zing_rec" / "model.joblib")
        food_kg.load(config.models_dir / "zing_foodkg" / "graph.json")
        if dict_path.exists():
            foods, cuisines, restaurants = joblib.load(dict_path)
            ner.update_dictionary(foods, cuisines, restaurants)
        tools = build_tools(recommender)
        orchestrator = AgentOrchestrator(dialogue_manager, nlg, tools, memory)
        return jsonify({"status": "success", "message": "All models trained and reloaded successfully."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/agent/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = data.get("message", "").strip()
    session_id = data.get("sessionId") or "default_session"
    
    if not message:
        return jsonify({"status": "error", "message": "Missing 'message' parameter"}), 400

    # Parse AgentContext
    context_data = data.get("context")
    if not isinstance(context_data, dict):
        context_data = {}
    user_id = context_data.get("userId")
    role = context_data.get("role", "customer")
    active_page = context_data.get("activePage")
    cart_items = context_data.get("cartItems")
    if not isinstance(cart_items, list):
        cart_items = []
    
    context = AgentContext(user_id=user_id, role=role, active_page=active_page, cart_items=cart_items)
    
    # Process message via Orchestrator
    try:
        response = orchestrator.process_message(session_id, message, context)
        return jsonify(response)
    except Exception as e:
        print("Chat processing error:", e)
        return jsonify({"status": "error", "message": f"Orchestration failure: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=config.port)
