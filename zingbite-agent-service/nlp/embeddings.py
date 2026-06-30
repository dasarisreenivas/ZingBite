import joblib
import numpy as np
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.metrics.pairwise import cosine_similarity
from nlp.preprocessor import clean_text

class ZingEmbeddings:
    def __init__(self, n_components: int = 64):
        self.n_components = n_components
        self.vectorizer = None
        self.svd = None
        self.corpus_embeddings = None
        self.corpus_metadata = []

    def fit_and_index(self, items: list[dict]):
        # Each item has: id/menuId, name/menuName, description, cuisine_type/cuisineType, price
        self.corpus_metadata = items
        corpus_texts = []
        for item in items:
            name = item.get("menuName") or item.get("menu_name") or item.get("name") or ""
            desc = item.get("description") or ""
            cuisine = item.get("cuisineType") or item.get("cuisine_type") or ""
            text = f"{name} {desc} {cuisine}"
            corpus_texts.append(clean_text(text))

        self.vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=1)
        tfidf_matrix = self.vectorizer.fit_transform(corpus_texts)
        
        # SVD projection dimensions
        n_comp = min(self.n_components, len(items))
        if n_comp > 1:
            self.svd = TruncatedSVD(n_components=n_comp, random_state=42)
            self.corpus_embeddings = self.svd.fit_transform(tfidf_matrix)
        else:
            self.svd = None
            self.corpus_embeddings = tfidf_matrix.toarray()

    def embed_query(self, query: str) -> np.ndarray:
        if not self.vectorizer:
            raise ValueError("Embeddings index not initialized.")
        cleaned = clean_text(query)
        vec = self.vectorizer.transform([cleaned])
        if self.svd:
            return self.svd.transform(vec)
        return vec.toarray()

    def similarity_search(self, query: str, top_k: int = 5) -> list[tuple[dict, float]]:
        if self.corpus_embeddings is None:
            return []
        q_emb = self.embed_query(query)
        similarities = cosine_similarity(q_emb, self.corpus_embeddings)[0]
        
        top_indices = np.argsort(similarities)[::-1][:top_k]
        results = []
        for idx in top_indices:
            score = float(similarities[idx])
            results.append((self.corpus_metadata[idx], score))
        return results

    def save(self, path: Path):
        path.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump((self.vectorizer, self.svd, self.corpus_embeddings, self.corpus_metadata), path)

    def load(self, path: Path):
        if path.exists():
            self.vectorizer, self.svd, self.corpus_embeddings, self.corpus_metadata = joblib.load(path)
