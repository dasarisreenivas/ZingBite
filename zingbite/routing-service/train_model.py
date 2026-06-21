import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, r2_score
import joblib

def generate_synthetic_data(num_samples=1500, random_state=42):
    np.random.seed(random_state)
    
    distances = np.random.uniform(0.5, 12.0, num_samples)
    traffic_levels = np.random.choice(["Light", "Moderate", "Heavy"], size=num_samples, p=[0.4, 0.4, 0.2])
    weathers = np.random.choice(["Sunny", "Rainy", "Stormy"], size=num_samples, p=[0.6, 0.3, 0.1])
    prep_times = np.random.randint(5, 31, size=num_samples)
    is_high_rise_flags = np.random.choice([0, 1], size=num_samples, p=[0.5, 0.5])
    
    data = []
    for i in range(num_samples):
        dist = distances[i]
        traffic = traffic_levels[i]
        weather = weathers[i]
        prep = prep_times[i]
        is_hr = is_high_rise_flags[i]
        
        base_travel = (dist / 25.0) * 60.0
        
        traffic_factor = 1.0
        if traffic == "Moderate":
            traffic_factor = 1.5
        elif traffic == "Heavy":
            traffic_factor = 2.5
            
        traffic_delay = base_travel * (traffic_factor - 1.0)
        
        weather_delay = 0.0
        if weather == "Rainy":
            weather_delay = 5.0
        elif weather == "Stormy":
            weather_delay = 12.0
            
        prep_wait = max(0.0, prep - base_travel * 0.4)
        
        nav_offset = 4.5 if is_hr else 1.0
        
        noise = np.random.normal(0, 1.0)
        eta = base_travel + traffic_delay + weather_delay + prep_wait + nav_offset + noise
        eta = max(2.0, eta)
        
        data.append({
            "distance": dist,
            "traffic_level": traffic,
            "weather": weather,
            "prep_time": prep,
            "is_high_rise": is_hr,
            "eta": eta
        })
        
    df = pd.DataFrame(data)
    return df

def main():
    print("Generating 1500 synthetic routing samples...")
    df = generate_synthetic_data(num_samples=1500)
    
    df.to_csv("routing_samples.csv", index=False)
    print("Dataset saved to routing_samples.csv")
    
    X = df.drop(columns=["eta"])
    y = df["eta"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    categorical_features = ["traffic_level", "weather"]
    numeric_features = ["distance", "prep_time", "is_high_rise"]
    
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numeric_features),
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features)
        ]
    )
    
    model_pipeline = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("regressor", RandomForestRegressor(n_estimators=100, random_state=42))
        ]
    )
    
    print("Training RandomForestRegressor model...")
    model_pipeline.fit(X_train, y_train)
    
    y_pred = model_pipeline.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Model Evaluation:")
    print(f"Mean Squared Error: {mse:.4f}")
    print(f"R2 Score: {r2:.4f}")
    
    joblib.dump(model_pipeline, "eta_model.joblib")
    print("Saved trained model to eta_model.joblib")

if __name__ == "__main__":
    main()
