import json
import networkx as nx
from pathlib import Path

class ZingFoodKG:
    def __init__(self):
        self.graph = nx.Graph()
        # Default knowledge graph structure
        self._initialize_default_knowledge()

    def _initialize_default_knowledge(self):
        # Nodes and relations
        relationships = [
            # Biryani pairings
            ("biryani", "raita", "PAIRS_WITH"),
            ("biryani", "mirchi ka salan", "PAIRS_WITH"),
            ("biryani", "indian", "BELONGS_TO"),
            ("biryani", "rice", "CONTAINS"),
            ("biryani", "lunch", "SUITABLE_FOR"),
            ("biryani", "dinner", "SUITABLE_FOR"),
            
            # Burger pairings
            ("burger", "french fries", "PAIRS_WITH"),
            ("burger", "coke", "PAIRS_WITH"),
            ("burger", "soda", "PAIRS_WITH"),
            ("burger", "cheese", "CONTAINS"),
            ("burger", "fast food", "BELONGS_TO"),
            
            # Pizza pairings
            ("pizza", "garlic bread", "PAIRS_WITH"),
            ("pizza", "coke", "PAIRS_WITH"),
            ("pizza", "cheese", "CONTAINS"),
            ("pizza", "italian", "BELONGS_TO"),
            
            # Paneer pairings
            ("paneer tikka", "mint chutney", "PAIRS_WITH"),
            ("paneer tikka", "naan", "PAIRS_WITH"),
            ("paneer tikka", "indian", "BELONGS_TO"),
            ("paneer tikka", "veg", "DIETARY_TAG"),
            
            # Beverages
            ("masala chai", "biscuits", "PAIRS_WITH"),
            ("masala chai", "samosa", "PAIRS_WITH"),
            ("masala chai", "breakfast", "SUITABLE_FOR"),
            ("masala chai", "tea", "SIMILAR_TO")
        ]
        
        for u, v, rel in relationships:
            self.graph.add_edge(u, v, relation=rel)

    def add_relationship(self, entity1: str, entity2: str, relation: str):
        self.graph.add_edge(entity1.lower().strip(), entity2.lower().strip(), relation=relation)

    def query_pairings(self, food_item: str) -> list[str]:
        food_item = food_item.lower().strip()
        pairings = []
        if food_item in self.graph:
            for neighbor in self.graph.neighbors(food_item):
                edge_data = self.graph.get_edge_data(food_item, neighbor)
                if edge_data and edge_data.get("relation") == "PAIRS_WITH":
                    pairings.append(neighbor)
        return pairings

    def query_similar_items(self, food_item: str) -> list[str]:
        food_item = food_item.lower().strip()
        similar = []
        if food_item in self.graph:
            for neighbor in self.graph.neighbors(food_item):
                edge_data = self.graph.get_edge_data(food_item, neighbor)
                if edge_data and edge_data.get("relation") == "SIMILAR_TO":
                    similar.append(neighbor)
        return similar

    def get_related_info(self, entity: str) -> dict[str, list[str]]:
        entity = entity.lower().strip()
        info = {
            "pairings": [],
            "cuisines": [],
            "dietary": [],
            "ingredients": []
        }
        if entity in self.graph:
            for neighbor in self.graph.neighbors(entity):
                rel = self.graph.get_edge_data(entity, neighbor).get("relation")
                if rel == "PAIRS_WITH":
                    info["pairings"].append(neighbor)
                elif rel == "BELONGS_TO":
                    info["cuisines"].append(neighbor)
                elif rel == "DIETARY_TAG":
                    info["dietary"].append(neighbor)
                elif rel == "CONTAINS":
                    info["ingredients"].append(neighbor)
        return info

    def save(self, path: Path):
        path.parent.mkdir(parents=True, exist_ok=True)
        # Convert networkx graph data to dict for json serialization
        data = nx.node_link_data(self.graph)
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

    def load(self, path: Path):
        if path.exists():
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            self.graph = nx.node_link_graph(data)
