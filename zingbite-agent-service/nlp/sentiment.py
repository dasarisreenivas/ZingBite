import joblib
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from nlp.preprocessor import clean_text

class ZingSentimentAnalyzer:
    def __init__(self, model_path: Path = None):
        self.model_path = model_path
        self.vectorizer = None
        self.model = None
        
        # Domain lexicon
        self.lexicon = {
            "delicious": 1.5, "awesome": 1.2, "amazing": 1.4, "best": 1.0, "love": 1.0, "loved": 1.0,
            "excellent": 1.5, "fresh": 1.0, "hot": 0.5, "fast": 0.8, "yummy": 1.2, "tasty": 1.0,
            "perfect": 1.3, "great": 0.8, "good": 0.5, "friendly": 0.7,
            "cold": -0.8, "bad": -0.8, "worst": -1.5, "terrible": -1.4, "poor": -0.8, "slow": -0.7,
            "stale": -1.2, "bland": -0.9, "salty": -0.6, "burnt": -1.1, "undercooked": -1.0,
            "spill": -0.8, "spilled": -0.9, "leak": -0.8, "leaking": -0.9, "mess": -0.7,
            "missing": -1.0, "wrong": -1.0, "delayed": -0.8, "late": -0.8, "refund": -0.5,
            "hate": -1.0, "disappointed": -1.2, "waste": -1.1, "horrible": -1.3
        }

    def train(self, texts: list[str], ratings: list[int]):
        # Map ratings (1-5) to 5 sentiment classes
        # 1 -> VERY_NEGATIVE, 2 -> NEGATIVE, 3 -> NEUTRAL, 4 -> POSITIVE, 5 -> VERY_POSITIVE
        label_map = {1: "VERY_NEGATIVE", 2: "NEGATIVE", 3: "NEUTRAL", 4: "POSITIVE", 5: "VERY_POSITIVE"}
        labels = [label_map.get(r, "NEUTRAL") for r in ratings]
        
        cleaned_texts = [clean_text(t) for t in texts]
        self.vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=1)
        X = self.vectorizer.fit_transform(cleaned_texts)
        self.model = LogisticRegression(max_iter=1000, C=1.0)
        self.model.fit(X, labels)

    def predict(self, text: str) -> tuple[str, float]:
        cleaned = clean_text(text)
        
        if self.model and self.vectorizer:
            try:
                vec = self.vectorizer.transform([cleaned])
                prob = self.model.predict_proba(vec)[0]
                idx = prob.argmax()
                pred_label = self.model.classes_[idx]
                confidence = float(prob[idx])
                return pred_label, confidence
            except Exception:
                pass
                
        # Lexicon scoring
        score = 0.0
        words = cleaned.split()
        matched = 0
        for word in words:
            if word in self.lexicon:
                score += self.lexicon[word]
                matched += 1
                
        if matched > 0:
            avg_score = score / matched
            if avg_score >= 1.0:
                return "VERY_POSITIVE", 0.80
            elif avg_score >= 0.3:
                return "POSITIVE", 0.70
            elif avg_score <= -1.0:
                return "VERY_NEGATIVE", 0.80
            elif avg_score <= -0.3:
                return "NEGATIVE", 0.70
            else:
                return "NEUTRAL", 0.60
                
        # Default neutral
        return "NEUTRAL", 0.50

    def save(self, path: Path):
        path.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump((self.vectorizer, self.model), path)

    def load(self, path: Path):
        if path.exists():
            self.vectorizer, self.model = joblib.load(path)
