import joblib
import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.decomposition import TruncatedSVD

class ZingRecommender:
    def __init__(self, n_factors: int = 15):
        self.n_factors = n_factors
        self.user_features = None
        self.item_features = None
        self.user_map = {}
        self.item_map = {}
        self.inv_user_map = {}
        self.inv_item_map = {}
        self.mean_rating = 0.0

    def fit(self, interactions_df: pd.DataFrame):
        # interactions_df should have user_id, menu_id, rating/weight
        if interactions_df.empty:
            return
            
        self.mean_rating = interactions_df['weight'].mean()
        
        # Create mapping
        users = interactions_df['user_id'].unique()
        items = interactions_df['menu_id'].unique()
        
        self.user_map = {uid: idx for idx, uid in enumerate(users)}
        self.item_map = {iid: idx for idx, iid in enumerate(items)}
        self.inv_user_map = {idx: uid for uid, idx in self.user_map.items()}
        self.inv_item_map = {idx: iid for iid, idx in self.item_map.items()}
        
        n_users = len(users)
        n_items = len(items)
        
        # Create user-item interaction matrix
        R = np.zeros((n_users, n_items))
        for _, row in interactions_df.iterrows():
            u_idx = self.user_map[row['user_id']]
            i_idx = self.item_map[row['menu_id']]
            R[u_idx, i_idx] = row['weight']
            
        # Normalize
        user_means = np.zeros(n_users)
        for u in range(n_users):
            nonzero = R[u, :].nonzero()[0]
            if len(nonzero) > 0:
                user_means[u] = R[u, nonzero].mean()
                R[u, nonzero] -= user_means[u]

        # Singular Value Decomposition
        k = min(self.n_factors, min(n_users, n_items) - 1)
        if k >= 1:
            svd = TruncatedSVD(n_components=k, random_state=42)
            self.user_features = svd.fit_transform(R)
            self.item_features = svd.components_.T
        else:
            self.user_features = R
            self.item_features = np.eye(n_items)
            
        self.user_means = user_means

    def predict_rating(self, user_id: int, item_id: int) -> float:
        if user_id not in self.user_map or item_id not in self.item_map:
            return self.mean_rating
            
        u_idx = self.user_map[user_id]
        i_idx = self.item_map[item_id]
        
        pred = self.user_means[u_idx] + np.dot(self.user_features[u_idx], self.item_features[i_idx])
        return max(0.0, float(pred))

    def recommend_items(self, user_id: int, menu_items: list[dict], cart_item_ids: list[int] = None, limit: int = 5) -> list[dict]:
        # Sort items based on predicted interest
        scored_items = []
        cart_set = set(cart_item_ids or [])
        
        for item in menu_items:
            item_id = item.get("menuId") or item.get("menu_id") or item.get("id")
            if item_id in cart_set:
                continue
            
            # Predict collaborative score
            rating_score = self.predict_rating(user_id, item_id)
            
            # Add dynamic boost if popular or matches user context
            item_copy = dict(item)
            item_copy["recommend_score"] = rating_score
            scored_items.append(item_copy)
            
        scored_items.sort(key=lambda x: x.get("recommend_score", 0), reverse=True)
        return scored_items[:limit]

    def save(self, path: Path):
        path.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump(self, path)

    @classmethod
    def load(cls, path: Path) -> 'ZingRecommender':
        if path.exists():
            return joblib.load(path)
        return cls()
