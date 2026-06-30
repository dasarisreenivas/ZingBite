import joblib
import re
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from nlp.preprocessor import clean_text

class ZingIntentClassifier:
    def __init__(self, model_path: Path = None):
        self.model_path = model_path
        self.vectorizer = None
        self.model = None
        self.ml_confidence_threshold = 0.68
        
        # Rule-based fallback keywords for zero-shot capability
        self.rules = {
            "TRACK_ORDER": ["track order", "order status", "delivery status", "delay", "late", "arrived", "arriving"],
            "REFUND_REQUEST": ["refund", "money back", "refunded", "chargeback"],
            "COMPLAINT": ["cold", "bad", "worst", "burnt", "stale", "hair", "spilled", "leaking", "wrong item", "missing item"],
            "CHECKOUT": ["checkout", "pay", "payment", "place order", "buy", "purchase", "order now"],
            "CHECK_CART": ["cart", "basket", "bag", "items in my", "my order list"],
            "GET_RECOMMENDATION": ["recommend", "suggest", "recommendation", "popular", "best", "top rated", "what should i eat", "what is good", "special today"],
            "ASK_ETA": ["eta", "how long", "arrival time", "minutes", "duration"],
            "DEMAND_FORECAST": ["forecast", "prep", "tomorrow", "demand", "stock tomorrow", "ingredients"],
            "FRAUD_CHECK": ["fraud", "suspicious", "anomalous", "fake", "block user", "multiaccount"],
            "NAVIGATE": ["go to", "open page", "navigate", "profile page", "admin dashboard", "super admin", "careers"],
            "GREETING": ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings"],
            "ORDER_FOOD": ["add to cart", "add", "order", "get me", "want to eat", "want", "please add"],
            "SEARCH_FOOD": ["search", "find", "looking for", "show me", "cuisine", "restaurants with", "food near"]
        }

    def train(self, texts: list[str], labels: list[str]):
        cleaned_texts = [clean_text(t) for t in texts]
        self.vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=1)
        X = self.vectorizer.fit_transform(cleaned_texts)
        self.model = LogisticRegression(max_iter=1000, C=1.0)
        self.model.fit(X, labels)

    def predict(self, text: str) -> tuple[str, float]:
        cleaned = clean_text(text)

        rule_intent = self._predict_with_patterns(cleaned)
        if rule_intent:
            return rule_intent, 0.95
        
        # Try ML prediction if trained
        if self.model and self.vectorizer:
            try:
                vec = self.vectorizer.transform([cleaned])
                prob = self.model.predict_proba(vec)[0]
                idx = prob.argmax()
                pred_label = str(self.model.classes_[idx])
                confidence = float(prob[idx])
                if confidence >= self.ml_confidence_threshold:
                    return pred_label, confidence
            except Exception:
                pass
                
        # Rule-based fallback
        matched_scores = {}
        for intent, keywords in self.rules.items():
            score = sum(1 for kw in keywords if kw in cleaned)
            if score > 0:
                matched_scores[intent] = score
                
        if matched_scores:
            best_intent = max(matched_scores, key=matched_scores.get)
            return best_intent, 0.70
            
        # Default fallback
        if any(w in cleaned for w in ["menu", "food", "eat", "hungry", "dish"]):
            return "SEARCH_FOOD", 0.50
        return "GENERAL_QUERY", 0.40

    def _predict_with_patterns(self, cleaned: str) -> str | None:
        if not cleaned:
            return None

        if re.fullmatch(r"(hi|hello|hey|good morning|good afternoon|good evening|greetings)( there| bot)?", cleaned):
            return "GREETING"

        if re.search(r"\b(refund|money back|refunded|chargeback)\b", cleaned):
            return "REFUND_REQUEST"

        if re.search(r"\b(cold|bad|worst|burnt|stale|hair|spilled|leaking|wrong item|missing item)\b", cleaned):
            return "COMPLAINT"

        if re.search(r"\b(track|tracking|status)\b.*\border\b|\border\b.*\b(status|tracking)\b|where\s+(is|s)\s+(my|the)?\s*order|\bdelivery\b.*\b(late|delay|status|arriv)", cleaned):
            return "TRACK_ORDER"

        if re.search(r"\b(cart|basket)\b|\b(items in my|my order list)\b", cleaned):
            return "CHECK_CART"

        if re.search(r"\b(checkout|pay|payment|place order|buy now|purchase)\b", cleaned):
            return "CHECKOUT"

        if re.search(r"\b(eta|how long|arrival time|minutes|duration)\b", cleaned):
            return "ASK_ETA"

        if re.search(r"\b(forecast|prep tomorrow|demand|stock tomorrow|ingredients)\b", cleaned):
            return "DEMAND_FORECAST"

        if re.search(r"\b(fraud|suspicious|anomalous|fake|block user|multiaccount)\b", cleaned):
            return "FRAUD_CHECK"

        if re.search(r"\b(go to|open page|navigate|profile page|admin dashboard|super admin|careers)\b", cleaned):
            return "NAVIGATE"

        if re.search(r"\b(recommend|suggest|recommendation|popular|best|top rated|special today|what should i eat|what is good)\b", cleaned):
            return "GET_RECOMMENDATION"

        if re.search(r"\b(add|order|get me|please add|want to eat)\b", cleaned):
            return "ORDER_FOOD"

        if re.search(r"\b(search|find|show me|show|looking for|cuisine|restaurants with|food near|near me)\b", cleaned):
            return "SEARCH_FOOD"

        return None

    def save(self, path: Path):
        path.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump((self.vectorizer, self.model), path)

    def load(self, path: Path):
        if path.exists():
            self.vectorizer, self.model = joblib.load(path)
