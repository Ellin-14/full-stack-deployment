# 🚀 FastAPI Backend — Insurance CRC Assistant

This is the backend service for the **Insurance Comparison, Recommendation & Claim Assistant** project.
It provides APIs for authentication, policy comparison, recommendations, claims workflow, and fraud detection.

This backend communicates with the React frontend located in `client/`.

---

## 📁 Folder Structure

server/
│
├── .venv/                     # Python virtual environment
│
├── src/
│   ├── main.py                # FastAPI app entry
│   ├── api.py                 # Root API router
│   ├── exceptions.py          # Global exception handlers
│   ├── logging.py             # Logger configuration
├── rate_limiter.py            # Optional: request throttling
│
│   ├── auth/                  # Authentication module
│   │   ├── controller.py
│   │   ├── models.py
│   │   └── service.py
│
│   ├── users/                 # Users module
│   │   ├── controller.py
│   │   ├── models.py
│   │   └── service.py
│
│   ├── todos/                 # Sample module (placeholder)
│   │   ├── controller.py
│   │   ├── models.py
│   │   └── service.py
│
│   ├── entities/              # Database entity schemas
│   │   ├── user.py
│   │   ├── todo.py
│   │   └── __init__.py
│
│   ├── database/              # DB engine / ORM setup
│   │   └── core.py
│
├── tests/                     # Unit & E2E tests
│   ├── e2e/
│   ├── unit/
│   └── conftest.py
│
├── requirements.txt           # Production dependencies
├── requirements-dev.txt       # Dev/testing dependencies
├── Dockerfile                 # Optional container support
├── docker-compose.yml         # Optional DB + API orchestration
└── README.md                  # This file

---

## ▶️ How to Run the Server (Windows PowerShell)

### 1️⃣ Navigate to the server folder
```
cd server
```

### 2️⃣ Create & activate virtual environment
```
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3️⃣ Install dependencies
```
pip install -r requirements.txt
```

### 4️⃣ Start FastAPI server
```
uvicorn src.main:app --reload --port 8000
```

Server will run at:

- API Root → http://127.0.0.1:8000
- Swagger UI → http://127.0.0.1:8000/docs
- Health Check → http://127.0.0.1:8000/health
- Test Endpoint → http://127.0.0.1:8000/api/test

---

## 🧪 Running Tests
```
pytest
```

Test structure:
tests/
 ├── e2e/
 ├── unit/
 └── conftest.py

---

## 🔗 API Endpoints (Basic Examples)

| Endpoint     | Method | Description |
|--------------|--------|-------------|
| `/health`    | GET    | Check if server is alive |
| `/api/test`  | GET    | Test endpoint for frontend integration |

---

## 🛠 Tech Stack
- FastAPI  
- Uvicorn  
- Pydantic v2  
- PostgreSQL (future integration)  
- pytest + httpx (testing)  
- CORS support  
- JWT Authentication (upcoming)

---

## ✔️ Status
Backend setup is complete.  
Client can successfully fetch API responses.  
Ready for next module development.

---

# ✨ End of README.md
