# AI Trust Experiment — Backend API

FastAPI backend for behavioral event logging and dataset storage.

## Setup

**Step 1 — Navigate to backend folder:**
```bash
cd backend
```

**Step 2 — Install dependencies:**
```bash
pip install -r requirements.txt
```

**Step 3 — Run the server:**
```bash
uvicorn main:app --reload
```

Server runs at:
```
http://localhost:8000
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Check server status |
| POST | /session/start | Initialize participant session |
| POST | /log-event | Log a single trial event |
| POST | /log-manipulation-check | Log manipulation check response |
| GET | /export | Export full dataset as JSON |

---

## Interactive API Docs

FastAPI provides automatic documentation at:
```
http://localhost:8000/docs
```

You can test all endpoints directly from the browser.

---

## Data Storage

All data is stored in a local SQLite database:
```
backend/experiment.db
```

Two tables:
- `sessions` — one record per participant
- `events` — one record per trial event

---

## Privacy and Anonymization

Raw participant IDs are never stored.
All IDs are hashed using SHA-256 before reaching the database.
No IP addresses or personally identifiable information are collected.
