from nlp.ner import ZingNER
from nlp.intent import ZingIntentClassifier
from nlp.sentiment import ZingSentimentAnalyzer
from models.dst import ZingDST

class DialogueManager:
    def __init__(self, ner: ZingNER, intent_clf: ZingIntentClassifier, sentiment_clf: ZingSentimentAnalyzer):
        self.ner = ner
        self.intent_clf = intent_clf
        self.sentiment_clf = sentiment_clf

    def process_input(self, text: str, dst: ZingDST) -> tuple[str, dict, str]:
        # 1. Classify intent
        intent, intent_conf = self.intent_clf.predict(text)
        
        # 2. Extract Entities
        entities = self.ner.extract_entities(text)
        
        # 3. Analyze Sentiment
        sentiment, sentiment_conf = self.sentiment_clf.predict(text)
        
        # 4. Update Dialogue State
        dst_state = dst.update(intent, entities)
        
        return intent, dst_state, sentiment
