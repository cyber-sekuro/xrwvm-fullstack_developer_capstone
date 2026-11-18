# Uncomment the imports below before you add the function code
import requests
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")

# GET requests to Express.js backend


def get_request(endpoint, **kwargs):
    request_url = backend_url + endpoint

    print("GET from {}".format(request_url))

    try:
        response = requests.get(
            request_url,
            params=kwargs,
            timeout=20
        )
        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as err:
        print("Network exception occurred:", err)

# Analyze review sentiments using IBM Cloud microservice


def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url + "analyze/" + text

    try:
        response = requests.get(request_url, timeout=60)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as err:
        print("Network exception occurred:", err)

# POST review to Express.js backend


def post_review(data_dict):
    request_url = backend_url + "/insert_review"

    try:
        response = requests.post(
            request_url,
            json=data_dict,
            timeout=20
        )
        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as err:
        print("Network exception occurred:", err)
        return None
