# pip install requests
import requests

# Send a GET request to a website
res = requests.get(
    "https://www.example.com/", # The URL of the API you want to access
    params={"key1": "value1", "key2": "value2"}, # The parameters you want to pass to the API (like "?key=value" at the end of the URL)
    data={"key1": "value1", "key2": "value2"}, # The data you want to send to the API
    headers={"header1": "value1", "header2": "value2"}, # The headers you want to send to the API
    cookies={"cookie1": "value1", "cookie2": "value2"}, # The cookies you want to send to the API
    auth=("username", "password"), # The authentication credentials you want to send to the API (some websites require this)
    timeout=5, # The maximum site response time (in seconds) 
    allow_redirects=True, # Whether or not to follow redirects
)

# Send a POST request to a website
res = requests.post(...)

# Send a PUT request to a website
res = requests.put(...)

# Send a DELETE request to a website
res = requests.delete(...)


if res.status_code == 200:
    output = res.json()
    print(output)