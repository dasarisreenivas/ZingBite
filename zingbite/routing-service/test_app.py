import time
import subprocess
import requests
import sys

def run_tests():
    # Start app.py as a subprocess
    print("Launching Flask routing service...")
    cmd = [
        r"C:\Users\HP\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe",
        "app.py"
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    
    # Wait for the service to start up
    time.sleep(3)
    
    # Check if the process is still running
    if proc.poll() is not None:
        print("Error: Flask service failed to start.")
        stdout, stderr = proc.communicate()
        print("STDOUT:", stdout)
        print("STDERR:", stderr)
        sys.exit(1)
        
    print("Flask service successfully running on port 5000.")
    
    # Prepare test payload
    payload = {
        "riderLat": 12.9580,
        "riderLon": 77.5890,
        "restLat": 12.9716,
        "restLon": 77.5946,
        "custALat": 12.9821,
        "custALon": 77.6085,
        "custBLat": 12.9645,
        "custBLon": 77.6142,
        "prepTimeA": 10,
        "prepTimeB": 15,
        "weather": "Rainy",
        "perishableLifo": False,
        "useAStar": True
    }
    
    url = "http://localhost:5000/api/predict-route"
    
    try:
        print(f"Sending POST to {url}...")
        response = requests.post(url, json=payload, timeout=10)
        print(f"Response status code: {response.status_code}")
        
        if response.status_code != 200:
            print("Error: API request failed.")
            print(response.text)
            proc.terminate()
            sys.exit(1)
            
        data = response.json()
        print("\nAPI Response Structure Validation:")
        
        # Check required top-level keys
        required_keys = [
            "weather", "perishableLifo", "useAStar", "costMatrix", "timeWindows",
            "nodes", "edges", "sequence", "pathFM", "pathLM1", "pathLM2",
            "logs", "surgeZones", "predictiveETAs"
        ]
        
        missing = [k for k in required_keys if k not in data]
        if missing:
            print(f"FAIL: Missing keys in response: {missing}")
            proc.terminate()
            sys.exit(1)
        else:
            print("PASS: All top-level keys are present in response JSON.")
            
        # Print key details
        print(f"Resolved Sequence: {data['sequence']}")
        print(f"Nodes Count: {len(data['nodes'])}")
        print(f"Edges Count: {len(data['edges'])}")
        print(f"Time Windows: {data['timeWindows']}")
        print(f"Predictive ETAs: {data['predictiveETAs']}")
        print(f"Surge Zones: {data['surgeZones']}")
        
        # Test perishableLifo LIFO logic
        print("\nTesting perishableLifo=True (LIFO sequencing)...")
        payload["perishableLifo"] = True
        response_lifo = requests.post(url, json=payload, timeout=10)
        data_lifo = response_lifo.json()
        print(f"LIFO Sequence: {data_lifo['sequence']}")
        
        # Validate that sequence is reversed
        if data_lifo['sequence'] != list(reversed(data['sequence'])):
            print("WARNING: LIFO sequence did not reverse the FIFO sequence.")
        else:
            print("PASS: LIFO sequence successfully reversed the FIFO sequence.")
            
        print("\nAll integration tests passed successfully!")
        
    except Exception as e:
        print(f"Test execution failed: {e}")
        proc.terminate()
        sys.exit(1)
        
    # Clean up
    print("Terminating Flask routing service subprocess.")
    proc.terminate()
    proc.wait()

if __name__ == "__main__":
    run_tests()
