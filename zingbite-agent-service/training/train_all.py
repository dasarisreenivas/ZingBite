import os
import sys
from pathlib import Path

# Add root folder to python path so relative imports work during execution
sys.path.append(str(Path(__file__).resolve().parent.parent))

from config import AgentConfig
from training.data_synthesizer import DataSynthesizer
from nlp.ner import ZingNER
from nlp.intent import ZingIntentClassifier
from nlp.sentiment import ZingSentimentAnalyzer
from nlp.embeddings import ZingEmbeddings
from models.recommender import ZingRecommender
from models.knowledge_graph import ZingFoodKG

def train_all():
    print("Initializing Training Pipeline...")
    config = AgentConfig()
    
    # 1. Synthesize Data
    synthesizer = DataSynthesizer(config.db_url)
    
    print("Synthesizing datasets...")
    ner_data = synthesizer.synthesize_ner_data()
    intent_data = synthesizer.synthesize_intent_data()
    sentiment_data = synthesizer.download_real_world_sentiment_data()
    
    # 2. Fit Intent Classifier
    print("Training Intent Classifier...")
    intent_clf = ZingIntentClassifier()
    intent_texts = [d["text"] for d in intent_data]
    intent_labels = [d["label"] for d in intent_data]
    intent_clf.train(intent_texts, intent_labels)
    intent_clf.save(config.models_dir / "zing_intent" / "model.joblib")
    
    # 3. Fit Sentiment Analyzer
    print("Training Sentiment Analyzer...")
    sentiment_clf = ZingSentimentAnalyzer()
    sent_texts = [d["text"] for d in sentiment_data]
    sent_ratings = [d["rating"] for d in sentiment_data]
    sentiment_clf.train(sent_texts, sent_ratings)
    sentiment_clf.save(config.models_dir / "zing_sentiment" / "model.joblib")

    # 4. Build Menu Embeddings Index
    print("Indexing Menu Embeddings...")
    embeddings = ZingEmbeddings()
    # Grab menu items
    menu_items = synthesizer.get_menu_items()
    if not menu_items:
        # Load default fallback menu items
        menu_items = [
            {"menuId": 1, "menuName": "Paneer Biryani", "price": 249.0, "description": "Fragrant basmati rice cooked with soft paneer and Indian spices", "restaurantName": "Spice Garden", "restaurantId": 1, "cuisineType": "Indian", "imagePath": ""},
            {"menuId": 2, "menuName": "Chicken Biryani", "price": 299.0, "description": "Richly spiced rice dish with tender chicken pieces", "restaurantName": "Royal Kitchen", "restaurantId": 2, "cuisineType": "Indian", "imagePath": ""},
            {"menuId": 3, "menuName": "Veg Margherita Pizza", "price": 199.0, "description": "Classic pizza topped with fresh tomato sauce and mozzarella", "restaurantName": "Pizza Palace", "restaurantId": 3, "cuisineType": "Italian", "imagePath": ""},
            {"menuId": 4, "menuName": "French Fries", "price": 99.0, "description": "Crispy golden salted fries", "restaurantName": "Pizza Palace", "restaurantId": 3, "cuisineType": "Fast Food", "imagePath": ""},
            {"menuId": 5, "menuName": "Masala Chai", "price": 49.0, "description": "Freshly brewed spiced tea with milk", "restaurantName": "Spice Garden", "restaurantId": 1, "cuisineType": "Indian", "imagePath": ""}
        ]
    embeddings.fit_and_index(menu_items)
    embeddings.save(config.models_dir / "zing_embed" / "model.joblib")

    # 5. Fit Recommender System
    print("Training Recommendation Model...")
    recommender = ZingRecommender()
    interactions = synthesizer.get_user_interactions()
    if interactions.empty:
        # Synthesize fallback interactions df
        import pandas as pd
        rows = []
        import random
        r = random.Random(42)
        for uid in range(1, 10):
            for iid in range(1, 6):
                if r.random() > 0.4:
                    rows.append({"user_id": uid, "menu_id": iid, "weight": float(r.randint(1, 5))})
        interactions = pd.DataFrame(rows)
    
    recommender.fit(interactions)
    recommender.save(config.models_dir / "zing_rec" / "model.joblib")

    # 6. Save Knowledge Graph
    print("Saving Knowledge Graph...")
    food_kg = ZingFoodKG()
    # Pull items to enrich graph if needed
    for item in menu_items:
        name = item.get("menuName") or item.get("menu_name") or item.get("name")
        cuisine = item.get("cuisineType") or item.get("cuisine_type")
        if name and cuisine:
            food_kg.add_relationship(name, cuisine, "BELONGS_TO")
    food_kg.save(config.models_dir / "zing_foodkg" / "graph.json")

    # 7. Pre-warm NER dictionary
    print("Pre-warming NER dictionaries...")
    ner = ZingNER()
    foods = [m.get("menuName") or m.get("menu_name") or m.get("name") for m in menu_items]
    cuisines = [m.get("cuisineType") or m.get("cuisine_type") for m in menu_items]
    restaurants = [m.get("restaurantName") or "Spice Garden" for m in menu_items]
    ner.update_dictionary(foods, cuisines, restaurants)
    import joblib
    ner_dir = config.models_dir / "zing_ner"
    ner_dir.mkdir(parents=True, exist_ok=True)
    joblib.dump((foods, cuisines, restaurants), ner_dir / "dict.joblib")

    print("Model training pipeline completed successfully! All artifacts saved.")

if __name__ == "__main__":
    train_all()
