import math
import heapq
import itertools
import os
from flask import Flask, request, jsonify

try:
    import joblib
    import pandas as pd
except ImportError:
    joblib = None
    pd = None

app = Flask(__name__)

# Load model pipeline
MODEL_PATH = os.path.join(os.path.dirname(__file__), "eta_model.joblib")
model = None
if joblib is not None and pd is not None and os.path.exists(MODEL_PATH):
    try:
        model = joblib.load(MODEL_PATH)
    except Exception as error:
        print(f"Could not load ETA model; using deterministic fallback: {error}")

# Custom Java LCG Random to match node coordinate perturbation exactly
class JavaRandom:
    def __init__(self, seed):
        self.seed = (seed ^ 0x5DEECE66D) & ((1 << 48) - 1)

    def _next(self, bits):
        self.seed = (self.seed * 0x5DEECE66D + 0xB) & ((1 << 48) - 1)
        return self.seed >> (48 - bits)

    def next_double(self):
        return ((self._next(26) << 27) + self._next(27)) / (1 << 53)

def haversine(lat1, lon1, lat2, lon2):
    EARTH_RADIUS = 6371.0
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    rLat1 = math.radians(lat1)
    rLat2 = math.radians(lat2)
    a = math.sin(dLat / 2) * math.sin(dLat / 2) + \
        math.sin(dLon / 2) * math.sin(dLon / 2) * math.cos(rLat1) * math.cos(rLat2)
    c = 2 * math.asin(math.sqrt(a))
    return EARTH_RADIUS * c

class Node:
    def __init__(self, node_id, label, latitude, longitude, earliest_time=0.0, latest_time=float('inf')):
        self.id = node_id
        self.label = label
        self.latitude = latitude
        self.longitude = longitude
        self.earliestTime = earliest_time
        self.latestTime = latest_time

    def to_dict(self):
        return {
            "id": self.id,
            "label": self.label,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "earliestTime": self.earliestTime,
            "latestTime": self.latestTime if self.latestTime != float('inf') else 1.7976931348623157e+308
        }

class Edge:
    def __init__(self, from_node_id, to_node_id, road_name, base_distance, traffic_level="Light", is_blocked=False):
        self.fromNodeId = from_node_id
        self.toNodeId = to_node_id
        self.roadName = road_name
        self.baseDistance = base_distance
        self.trafficLevel = traffic_level
        self.isBlocked = is_blocked

    def get_cost(self):
        if self.isBlocked:
            return self.baseDistance * 1000.0
        factor = 1.0
        if self.trafficLevel == "Moderate":
            factor = 1.5
        elif self.trafficLevel == "Heavy":
            factor = 2.5
        return self.baseDistance * factor

    def to_dict(self):
        return {
            "fromNodeId": self.fromNodeId,
            "toNodeId": self.toNodeId,
            "roadName": self.roadName,
            "baseDistance": self.baseDistance,
            "trafficLevel": self.trafficLevel,
            "isBlocked": self.isBlocked
        }

class VRPRouteOptimizer:
    def __init__(self, rider_lat, rider_lon, rest_lat, rest_lon, cust_a_lat, cust_a_lon, cust_b_lat, cust_b_lon,
                 road_traffic=None, road_blockages=None, use_a_star=True):
        self.nodes = []
        self.edges = []
        self.pathfinding_logs = []
        self.use_a_star = use_a_star
        
        if road_traffic is None:
            road_traffic = {}
        if road_blockages is None:
            road_blockages = {}

        # Key Nodes
        self.nodes.append(Node(0, "Rider Start Position", rider_lat, rider_lon))
        self.nodes.append(Node(1, "ZingBite Kitchen", rest_lat, rest_lon))
        self.nodes.append(Node(2, "Customer A Delivery Point", cust_a_lat, cust_a_lon, earliest_time=0.0, latest_time=30.0))
        self.nodes.append(Node(3, "Customer B Delivery Point", cust_b_lat, cust_b_lon, earliest_time=10.0, latest_time=45.0))

        # Intermediate Nodes
        rand = JavaRandom(42)
        for i in range(4):
            fraction = (i + 1) / 5.0
            lat = rider_lat + (rest_lat - rider_lat) * fraction + (rand.next_double() - 0.5) * 0.003
            lon = rider_lon + (rest_lon - rider_lon) * fraction + (rand.next_double() - 0.5) * 0.003
            self.nodes.append(Node(4 + i, f"Street Junction {4 + i}", lat, lon))

        for i in range(4):
            fraction = (i + 1) / 5.0
            lat = rest_lat + (cust_a_lat - rest_lat) * fraction + (rand.next_double() - 0.5) * 0.003
            lon = rest_lon + (cust_a_lon - rest_lon) * fraction + (rand.next_double() - 0.5) * 0.003
            self.nodes.append(Node(8 + i, f"Street Junction {8 + i}", lat, lon))

        for i in range(3):
            fraction = (i + 1) / 4.0
            lat = cust_a_lat + (cust_b_lat - cust_a_lat) * fraction + (rand.next_double() - 0.5) * 0.003
            lon = cust_a_lon + (cust_b_lon - cust_a_lon) * fraction + (rand.next_double() - 0.5) * 0.003
            self.nodes.append(Node(12 + i, f"Street Junction {12 + i}", lat, lon))

        # Spanning Edges
        self.add_edge(0, 4, "Rider Pathway", road_traffic, road_blockages)
        self.add_edge(4, 5, "High Street", road_traffic, road_blockages)
        self.add_edge(5, 6, "Commercial Lane", road_traffic, road_blockages)
        self.add_edge(6, 7, "Avenue Row", road_traffic, road_blockages)
        self.add_edge(7, 1, "Kitchen Alley", road_traffic, road_blockages)

        self.add_edge(1, 8, "Kitchen Exit Road", road_traffic, road_blockages)
        self.add_edge(8, 9, "Market Blvd", road_traffic, road_blockages)
        self.add_edge(9, 10, "Suburban Cross", road_traffic, road_blockages)
        self.add_edge(10, 11, "Apartment Blvd", road_traffic, road_blockages)
        self.add_edge(11, 2, "Customer A Lane", road_traffic, road_blockages)

        self.add_edge(2, 12, "Customer A Way", road_traffic, road_blockages)
        self.add_edge(12, 13, "Link Highway", road_traffic, road_blockages)
        self.add_edge(13, 14, "Residential Crescent", road_traffic, road_blockages)
        self.add_edge(14, 3, "Customer B Lane", road_traffic, road_blockages)

        # Alternates
        self.add_edge(0, 8, "Expressway Bypass", road_traffic, road_blockages)
        self.add_edge(5, 9, "Sector Link", road_traffic, road_blockages)
        self.add_edge(6, 12, "Transit Flyover", road_traffic, road_blockages)
        self.add_edge(7, 10, "Metro Avenue", road_traffic, road_blockages)
        self.add_edge(8, 13, "Crossroad Street", road_traffic, road_blockages)
        self.add_edge(1, 14, "Direct Delivery Bypass", road_traffic, road_blockages)

    def add_edge(self, from_id, to_id, road_name, road_traffic, road_blockages):
        n1 = self.nodes[from_id]
        n2 = self.nodes[to_id]
        distance = haversine(n1.latitude, n1.longitude, n2.latitude, n2.longitude)
        
        edge = Edge(from_id, to_id, road_name, distance)
        if road_name in road_traffic:
            edge.trafficLevel = road_traffic[road_name]
        if road_name in road_blockages:
            edge.isBlocked = road_blockages[road_name]
        self.edges.append(edge)

        rev = Edge(to_id, from_id, road_name, distance)
        rev.trafficLevel = edge.trafficLevel
        rev.isBlocked = edge.isBlocked
        self.edges.append(rev)

    def find_route(self, start_id, end_id):
        self.pathfinding_logs = []
        algo_name = "A* (Admissible Haversine Heuristic)" if self.use_a_star else "Dijkstra's (g(n) only)"
        self.pathfinding_logs.append(f"Initializing VRP route solver using {algo_name}")

        g_scores = {node.id: float('inf') for node in self.nodes}
        g_scores[start_id] = 0.0
        came_from = {}

        def get_heuristic(node_id, target_id):
            n = self.nodes[node_id]
            target = self.nodes[target_id]
            return haversine(n.latitude, n.longitude, target.latitude, target.longitude)

        open_set = []
        start_f = get_heuristic(start_id, end_id) if self.use_a_star else 0.0
        heapq.heappush(open_set, (start_f, start_id))
        open_set_nodes = {start_id}
        
        nodes_visited = 0

        while open_set:
            f_score, current_id = heapq.heappop(open_set)
            if current_id not in open_set_nodes:
                continue
            open_set_nodes.remove(current_id)
            nodes_visited += 1
            current_node = self.nodes[current_id]

            if current_id == end_id:
                self.pathfinding_logs.append(f"Pathfinding complete. Destination reached! Nodes Visited: {nodes_visited}")
                return self.reconstruct_path(came_from, end_id)

            self.pathfinding_logs.append(
                f"Visiting Node {current_id} ({current_node.label}), gScore: {g_scores[current_id]:.2f} km"
            )

            for edge in self.edges:
                if edge.fromNodeId == current_id:
                    neighbor_id = edge.toNodeId
                    if edge.isBlocked:
                        self.pathfinding_logs.append(
                            f"  - Skip {edge.roadName} -> Node {neighbor_id} (Road Blocked by Construction!)"
                        )
                        continue
                    
                    tentative_g = g_scores[current_id] + edge.get_cost()
                    if tentative_g < g_scores[neighbor_id]:
                        came_from[neighbor_id] = current_id
                        g_scores[neighbor_id] = tentative_g
                        
                        h = get_heuristic(neighbor_id, end_id) if self.use_a_star else 0.0
                        f = tentative_g + h
                        heapq.heappush(open_set, (f, neighbor_id))
                        open_set_nodes.add(neighbor_id)
                        
                        log_msg = f"  - Relaxed edge on {edge.roadName} to Node {neighbor_id}, new gScore: {tentative_g:.2f} km"
                        if self.use_a_star:
                            log_msg += f", h(n): {h:.2f} km"
                        self.pathfinding_logs.append(log_msg)

        self.pathfinding_logs.append(f"Pathfinding failed: No path exists between Node {start_id} and Node {end_id}")
        return []

    def reconstruct_path(self, came_from, current_id):
        path = [self.nodes[current_id]]
        while current_id in came_from:
            current_id = came_from[current_id]
            path.insert(0, self.nodes[current_id])
        return path

    def get_route_cost(self, path):
        if not path or len(path) < 2:
            return 0.0
        cost = 0.0
        for i in range(len(path) - 1):
            n1 = path[i]
            n2 = path[i + 1]
            match_edge = None
            for edge in self.edges:
                if edge.fromNodeId == n1.id and edge.toNodeId == n2.id:
                    match_edge = edge
                    break
            if match_edge:
                cost += match_edge.get_cost()
            else:
                cost += haversine(n1.latitude, n1.longitude, n2.latitude, n2.longitude)
        return cost

    def evaluate_route_cost(self, route):
        if not route or len(route) < 2:
            return 0.0
        
        travel_cost = 0.0
        time_window_penalty = 0.0
        current_time = 0.0
        speed_kmh = 25.0

        for idx in range(len(route) - 1):
            frm = route[idx]
            to = route[idx + 1]

            sub_route = self.find_route(frm, to)
            leg_cost = self.get_route_cost(sub_route)
            travel_cost += leg_cost

            travel_time_mins = (leg_cost / speed_kmh) * 60.0
            current_time += travel_time_mins

            dest_node = self.nodes[to]
            if current_time < dest_node.earliestTime:
                current_time = dest_node.earliestTime
            elif current_time > dest_node.latestTime:
                time_window_penalty += (current_time - dest_node.latestTime) * 50.0

        return travel_cost + time_window_penalty

    def permute_optimize(self, sequence):
        permutations = list(itertools.permutations(sequence))
        best_seq = list(sequence)
        best_cost = float('inf')

        for perm in permutations:
            route = [1] + list(perm)
            cost = self.evaluate_route_cost(route)
            if cost < best_cost:
                best_cost = cost
                best_seq = list(perm)
        return best_seq

    def nearest_neighbor(self, drop_node_ids):
        optimized = []
        unvisited = list(drop_node_ids)
        current_id = 1

        while unvisited:
            nearest_id = -1
            min_dist = float('inf')
            for node_id in unvisited:
                dist = haversine(self.nodes[current_id].latitude, self.nodes[current_id].longitude,
                                 self.nodes[node_id].latitude, self.nodes[node_id].longitude)
                if dist < min_dist:
                    min_dist = dist
                    nearest_id = node_id
            if nearest_id != -1:
                optimized.append(nearest_id)
                unvisited.remove(nearest_id)
                current_id = nearest_id
        return optimized

    def three_opt(self, sequence):
        route = [1] + list(sequence)
        size = len(route)
        if size < 4:
            return self.permute_optimize(sequence)
        
        improved = True
        best_cost = self.evaluate_route_cost(route)

        while improved:
            improved = False
            for i in range(1, size - 2):
                for j in range(i + 1, size - 1):
                    for k in range(j + 1, size):
                        A = route[:i]
                        B = route[i:j]
                        C = route[j:k]
                        D = route[k:]

                        B_rev = list(reversed(B))
                        C_rev = list(reversed(C))

                        candidates = [
                            A + B + C_rev + D,
                            A + B_rev + C + D,
                            A + B_rev + C_rev + D,
                            A + C + B + D,
                            A + C + B_rev + D,
                            A + C_rev + B + D,
                            A + C_rev + B_rev + D
                        ]

                        for candidate in candidates:
                            cost = self.evaluate_route_cost(candidate)
                            if cost < best_cost - 1e-4:
                                best_cost = cost
                                route = candidate
                                improved = True
                                break
                        if improved:
                            break
                    if improved:
                        break
                if improved:
                    break

        result = list(route)
        result.pop(0)
        return result

    def sequence_batches(self, drop_node_ids, perishable_lifo=False):
        if not drop_node_ids:
            return []
        if len(drop_node_ids) == 1:
            return list(drop_node_ids)

        if perishable_lifo:
            return list(reversed(drop_node_ids))

        current_sequence = self.nearest_neighbor(drop_node_ids)
        optimized = self.three_opt(current_sequence)
        return optimized

    def compute_cost_matrix(self, node_ids):
        n = len(node_ids)
        matrix = [[0.0] * n for _ in range(n)]
        for i in range(n):
            for j in range(n):
                if i == j:
                    matrix[i][j] = 0.0
                else:
                    route = self.find_route(node_ids[i], node_ids[j])
                    matrix[i][j] = self.get_route_cost(route)
        return matrix

def get_path_distance(path):
    if not path or len(path) < 2:
        return 0.0
    dist = 0.0
    for i in range(len(path) - 1):
        dist += haversine(path[i].latitude, path[i].longitude, path[i+1].latitude, path[i+1].longitude)
    return dist

def get_path_traffic_factor(path, optimizer):
    if not path or len(path) < 2:
        return 1.0
    sum_factor = 0.0
    count = 0
    for i in range(len(path) - 1):
        n1 = path[i]
        n2 = path[i+1]
        for edge in optimizer.edges:
            if edge.fromNodeId == n1.id and edge.toNodeId == n2.id:
                factor = 1.0
                if edge.trafficLevel == "Moderate":
                    factor = 1.5
                elif edge.trafficLevel == "Heavy":
                    factor = 2.5
                sum_factor += factor
                count += 1
                break
    return 1.0 if count == 0 else (sum_factor / count)

def predict_eta_ml(distance, traffic_factor, weather, prep_time, is_high_rise):
    if model is None:
        average_speed = 25.0
        base_travel = (distance / average_speed) * 60.0
        traffic_delay = base_travel * (traffic_factor - 1.0)
        weather_delay = 5.0 if weather.lower() == "rainy" else (12.0 if weather.lower() == "stormy" else 0.0)
        prep_wait = max(0.0, prep_time - base_travel * 0.4)
        nav_offset = 4.5 if is_high_rise else 1.0
        return max(2.0, base_travel + traffic_delay + weather_delay + prep_wait + nav_offset)

    if traffic_factor <= 1.25:
        traffic_level = "Light"
    elif traffic_factor <= 2.0:
        traffic_level = "Moderate"
    else:
        traffic_level = "Heavy"

    df_input = pd.DataFrame([{
        "distance": distance,
        "traffic_level": traffic_level,
        "weather": weather,
        "prep_time": prep_time,
        "is_high_rise": 1 if is_high_rise else 0
    }])
    
    pred = model.predict(df_input)[0]
    return max(2.0, float(pred))

@app.route("/api/predict-route", methods=["POST"])
def predict_route():
    data = request.get_json() or {}
    
    rider_lat = data.get("riderLat", 12.9580)
    rider_lon = data.get("riderLon", 77.5890)
    rest_lat = data.get("restLat", 12.9716)
    rest_lon = data.get("restLon", 77.5946)
    cust_a_lat = data.get("custALat", 12.9821)
    cust_a_lon = data.get("custALon", 77.6085)
    cust_b_lat = data.get("custBLat", 12.9645)
    cust_b_lon = data.get("custBLon", 77.6142)

    prep_time_a = data.get("prepTimeA", 10)
    prep_time_b = data.get("prepTimeB", 15)
    weather = data.get("weather", "Sunny")
    perishable_lifo = data.get("perishableLifo", False)
    use_a_star = data.get("useAStar", True)
    road_traffic = data.get("roadTraffic", {})
    road_blockages = data.get("roadBlockages", {})

    optimizer = VRPRouteOptimizer(
        rider_lat, rider_lon,
        rest_lat, rest_lon,
        cust_a_lat, cust_a_lon,
        cust_b_lat, cust_b_lon,
        road_traffic=road_traffic,
        road_blockages=road_blockages,
        use_a_star=use_a_star
    )

    drop_nodes = [2, 3]
    sequence = optimizer.sequence_batches(drop_nodes, perishable_lifo)

    matrix_nodes = [0, 1, 2, 3]
    cost_matrix = optimizer.compute_cost_matrix(matrix_nodes)

    path_fm = optimizer.find_route(0, 1)
    logs_fm = list(optimizer.pathfinding_logs)

    first_drop_id = sequence[0]
    path_lm1 = optimizer.find_route(1, first_drop_id)
    logs_lm1 = list(optimizer.pathfinding_logs)

    second_drop_id = sequence[1]
    path_lm2 = optimizer.find_route(first_drop_id, second_drop_id)
    logs_lm2 = list(optimizer.pathfinding_logs)

    dist_fm = get_path_distance(path_fm)
    dist_lm1 = get_path_distance(path_lm1)
    dist_lm2 = get_path_distance(path_lm2)

    traffic_fm = get_path_traffic_factor(path_fm, optimizer)
    traffic_lm1 = get_path_traffic_factor(path_lm1, optimizer)
    traffic_lm2 = get_path_traffic_factor(path_lm2, optimizer)

    speed_kmh = 25.0
    current_time = 0.0

    time_fm = (dist_fm / speed_kmh) * 60.0
    current_time += time_fm

    time_lm1 = (dist_lm1 / speed_kmh) * 60.0
    current_time += time_lm1
    drop1_node = optimizer.nodes[first_drop_id]
    violation1 = False
    arrival1 = current_time
    if arrival1 < drop1_node.earliestTime:
        arrival1 = drop1_node.earliestTime
    elif arrival1 > drop1_node.latestTime:
        violation1 = True
    current_time = arrival1

    time_lm2 = (dist_lm2 / speed_kmh) * 60.0
    current_time += time_lm2
    drop2_node = optimizer.nodes[second_drop_id]
    violation2 = False
    arrival2 = current_time
    if arrival2 < drop2_node.earliestTime:
        arrival2 = drop2_node.earliestTime
    elif arrival2 > drop2_node.latestTime:
        violation2 = True

    tw_data = {
        "Customer A": {
            "earliest": optimizer.nodes[2].earliestTime,
            "latest": optimizer.nodes[2].latestTime,
            "arrival": arrival1 if first_drop_id == 2 else arrival2,
            "violated": violation1 if first_drop_id == 2 else violation2
        },
        "Customer B": {
            "earliest": optimizer.nodes[3].earliestTime,
            "latest": optimizer.nodes[3].latestTime,
            "arrival": arrival1 if first_drop_id == 3 else arrival2,
            "violated": violation1 if first_drop_id == 3 else violation2
        }
    }

    final_logs = []
    final_logs.append("=== VRPTW PRECOMPUTED COST MATRIX ===")
    final_logs.append("          Rider(0)  Kitchen(1)  CustA(2)  CustB(3)")
    final_logs.append(f"Rider(0)   {cost_matrix[0][0]:6.2f}    {cost_matrix[0][1]:6.2f}    {cost_matrix[0][2]:6.2f}    {cost_matrix[0][3]:6.2f}")
    final_logs.append(f"Kitchen(1) {cost_matrix[1][0]:6.2f}    {cost_matrix[1][1]:6.2f}    {cost_matrix[1][2]:6.2f}    {cost_matrix[1][3]:6.2f}")
    final_logs.append(f"CustA(2)   {cost_matrix[2][0]:6.2f}    {cost_matrix[2][1]:6.2f}    {cost_matrix[2][2]:6.2f}    {cost_matrix[2][3]:6.2f}")
    final_logs.append(f"CustB(3)   {cost_matrix[3][0]:6.2f}    {cost_matrix[3][1]:6.2f}    {cost_matrix[3][2]:6.2f}    {cost_matrix[3][3]:6.2f}")
    final_logs.append("")

    final_logs.append("=== 3-OPT DISPATCH SEQUENCING ===")
    final_logs.append("Unoptimized sequence: Customer A -> Customer B")
    final_logs.append("Evaluating 3-opt reconnect configurations...")
    opt_seq_str = "Customer A -> Customer B" if first_drop_id == 2 else "Customer B -> Customer A"
    final_logs.append(f"Optimal sequence resolved: {opt_seq_str}")
    final_logs.append("")

    final_logs.append("=== TIME WINDOWS CONSTRAINT EVALUATION ===")
    tw_a = tw_data["Customer A"]
    status_a = "LATE - TIME WINDOW VIOLATION!" if tw_a["violated"] else "ON TIME"
    final_logs.append(f"Customer A Dropoff Window: [{tw_a['earliest']:.1f}, {tw_a['latest']:.1f}] mins | Arrival: {tw_a['arrival']:.1f} mins ({status_a})")

    tw_b = tw_data["Customer B"]
    status_b = "LATE - TIME WINDOW VIOLATION!" if tw_b["violated"] else "ON TIME"
    final_logs.append(f"Customer B Dropoff Window: [{tw_b['earliest']:.1f}, {tw_b['latest']:.1f}] mins | Arrival: {tw_b['arrival']:.1f} mins ({status_b})")
    final_logs.append("")

    final_logs.append("=== FIRST MILE ROUTING (RIDER -> RESTAURANT) ===")
    final_logs.extend(logs_fm)
    final_logs.append("")

    lm1_label = "A" if first_drop_id == 2 else "B"
    final_logs.append(f"=== LAST MILE 1 ROUTING (RESTAURANT -> CUSTOMER {lm1_label}) ===")
    final_logs.extend(logs_lm1)
    final_logs.append("")

    lm2_label_from = "A" if first_drop_id == 2 else "B"
    lm2_label_to = "B" if first_drop_id == 2 else "A"
    final_logs.append(f"=== LAST MILE 2 ROUTING (CUSTOMER {lm2_label_from} -> CUSTOMER {lm2_label_to}) ===")
    final_logs.extend(logs_lm2)

    dist_a = dist_fm + dist_lm1 + (dist_lm2 if first_drop_id == 3 else 0.0)
    avg_traffic_factor_a = ((traffic_fm + traffic_lm1 + traffic_lm2) / 3.0) if first_drop_id == 3 else ((traffic_fm + traffic_lm1) / 2.0)
    predicted_total_a = predict_eta_ml(dist_a, avg_traffic_factor_a, weather, prep_time_a, is_high_rise=False)
    
    base_a = (dist_a / 25.0) * 60.0
    weather_delay_a = 0 if weather.lower() == "sunny" else (5 if weather.lower() == "rainy" else 12)
    prep_wait_a = max(0.0, prep_time_a - base_a * 0.4)

    dist_b = dist_fm + dist_lm1 + (dist_lm2 if first_drop_id == 2 else 0.0)
    avg_traffic_factor_b = ((traffic_fm + traffic_lm1 + traffic_lm2) / 3.0) if first_drop_id == 2 else ((traffic_fm + traffic_lm1) / 2.0)
    predicted_total_b = predict_eta_ml(dist_b, avg_traffic_factor_b, weather, prep_time_b, is_high_rise=True)
    
    base_b = (dist_b / 25.0) * 60.0
    weather_delay_b = 0 if weather.lower() == "sunny" else (5 if weather.lower() == "rainy" else 12)
    prep_wait_b = max(0.0, prep_time_b - base_b * 0.4)

    surge_zones = [
        {
            "name": "Kitchen Hub Zone",
            "lat": rest_lat,
            "lon": rest_lon,
            "radius": 0.005,
            "incentive": 0 if weather.lower() == "sunny" else 15
        },
        {
            "name": "High-Demand Apartment Core",
            "lat": cust_b_lat,
            "lon": cust_b_lon,
            "radius": 0.006,
            "incentive": 45 if weather.lower() == "stormy" else (25 if weather.lower() == "rainy" else 10)
        }
    ]

    response = {
        "weather": weather,
        "perishableLifo": perishable_lifo,
        "useAStar": use_a_star,
        "costMatrix": cost_matrix,
        "timeWindows": {
            "Customer A": {
                "earliest": float(tw_data["Customer A"]["earliest"]),
                "latest": float(tw_data["Customer A"]["latest"]),
                "arrival": float(tw_data["Customer A"]["arrival"]),
                "violated": bool(tw_data["Customer A"]["violated"])
            },
            "Customer B": {
                "earliest": float(tw_data["Customer B"]["earliest"]),
                "latest": float(tw_data["Customer B"]["latest"]),
                "arrival": float(tw_data["Customer B"]["arrival"]),
                "violated": bool(tw_data["Customer B"]["violated"])
            }
        },
        "nodes": [n.to_dict() for n in optimizer.nodes],
        "edges": [e.to_dict() for e in optimizer.edges],
        "sequence": ["Customer A" if first_drop_id == 2 else "Customer B", "Customer A" if second_drop_id == 2 else "Customer B"],
        "pathFM": [n.to_dict() for n in path_fm],
        "pathLM1": [n.to_dict() for n in path_lm1],
        "pathLM2": [n.to_dict() for n in path_lm2],
        "logs": final_logs,
        "surgeZones": surge_zones,
        "predictiveETAs": {
            "Customer A": {
                "total": int(round(predicted_total_a)),
                "baseTravel": round(base_a, 1),
                "trafficDelay": round(base_a * (avg_traffic_factor_a - 1.0), 1),
                "weatherDelay": int(weather_delay_a),
                "prepWait": int(round(prep_wait_a)),
                "navOffset": 1.0
            },
            "Customer B": {
                "total": int(round(predicted_total_b)),
                "baseTravel": round(base_b, 1),
                "trafficDelay": round(base_b * (avg_traffic_factor_b - 1.0), 1),
                "weatherDelay": int(weather_delay_b),
                "prepWait": int(round(prep_wait_b)),
                "navOffset": 4.5
            }
        }
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
