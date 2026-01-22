import json
from pathlib import Path

BASE_PATH = Path(__file__).resolve().parent.parent / "data"


def read_json(file_name: str):
    with open(BASE_PATH / file_name, "r") as file:
        return json.load(file)


def get_dashboard_summary():
    return read_json("dashboard.json")


def get_policies():
    return read_json("policies.json")


def get_recommendations():
    return read_json("recommendations.json")


def get_claims_overview():
    return read_json("claims.json")
