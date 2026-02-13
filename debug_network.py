import requests
try:
    print("Testing Vite (5173)...")
    r = requests.get('http://localhost:5173', timeout=2)
    print(f"✅ Vite Status: {r.status_code}")
except Exception as e:
    print(f"❌ Vite Failed: {e}")

try:
    print("Testing API (3000)...")
    r = requests.get('http://localhost:3000/api/health', timeout=2)
    print(f"✅ API Status: {r.status_code}")
except Exception as e:
    print(f"❌ API Failed: {e}")

print("\nRecent Logs:")
import os
os.system('tail -n 20 server_log.txt vite_log.txt')
