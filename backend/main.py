"""
main.py
AI Trust Experiment — FastAPI Backend

Endpoints:
    POST /session/start  — initialize a new participant session
    POST /log-event      — receive and store a trial event
    GET  /export         — export full dataset as JSON
    GET  /health         — check if server is running
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import json
import os
from dotenv import load_dotenv

from database import init_db, save_event, save_session, get_all_events
from anonymizer import hash_participant_id

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title="AI Trust Experiment API",
    description="Backend logging server for the human-AI trust behavioral experiment.",
    version="1.0.0"
)

# Load CORS settings from environment
allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000"
).split(",")

# Clean up whitespace in origins
allowed_origins = [origin.strip() for origin in allowed_origins]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

class SessionStartRequest(BaseModel):
    participant_id: str
    condition_id: int
    assistant_name: str
    tone: str
    confidence_framing: str
    visual_identity: str


class ActionItem(BaseModel):
    action: str
    timestamp: float


class TrialEventRequest(BaseModel):
    participant_id: str
    trial_number: int
    condition_id: int
    assistant_name: str
    tone: str
    confidence_framing: str
    visual_identity: str
    decision: str
    latency_ms: int
    confidence_score: int
    ai_correct: bool
    action_sequence: Optional[List[ActionItem]] = []
    timestamp: str


class ManipulationCheckRequest(BaseModel):
    participant_id: str
    condition_id: int
    manipulation_check: str
    visual_check: Optional[str] = ""
    timestamp: str


@app.get("/health")
def health_check():
    """Check if the server is running."""
    return {
        "status": "ok",
        "message": "AI Trust Experiment API is running",
        "timestamp": datetime.now().isoformat()
    }


@app.post("/session/start")
def start_session(request: SessionStartRequest):
    """
    Initialize a new participant session.
    Hashes the participant ID before storing.
    """
    hashed_id = hash_participant_id(request.participant_id)

    save_session({
        "hashed_id": hashed_id,
        "condition_id": request.condition_id,
        "assistant_name": request.assistant_name,
        "tone": request.tone,
        "confidence_framing": request.confidence_framing,
        "visual_identity": request.visual_identity,
        "started_at": datetime.now().isoformat()
    })

    return {
        "status": "session started",
        "hashed_id": hashed_id,
        "condition_id": request.condition_id
    }


@app.post("/log-event")
def log_event(request: TrialEventRequest):
    """
    Receive and store a single trial event from the frontend.
    Hashes participant ID before storage.
    No raw participant IDs are stored.
    """
    hashed_id = hash_participant_id(request.participant_id)

    action_sequence_data = [
        {"action": a.action, "timestamp": a.timestamp}
        for a in request.action_sequence
    ]

    event = {
        "participant_id": hashed_id,
        "trial_number": request.trial_number,
        "condition_id": request.condition_id,
        "assistant_name": request.assistant_name,
        "tone": request.tone,
        "confidence_framing": request.confidence_framing,
        "visual_identity": request.visual_identity,
        "decision": request.decision,
        "latency_ms": request.latency_ms,
        "confidence_score": request.confidence_score,
        "ai_correct": request.ai_correct,
        "action_sequence": json.dumps(action_sequence_data),
        "timestamp": request.timestamp,
        "logged_at": datetime.now().isoformat()
    }

    save_event(event)

    return {
        "status": "event logged",
        "trial_number": request.trial_number,
        "participant_id": hashed_id
    }


@app.post("/log-manipulation-check")
def log_manipulation_check(request: ManipulationCheckRequest):
    """
    Store the manipulation check response at end of session.
    """
    hashed_id = hash_participant_id(request.participant_id)

    event = {
        "participant_id": hashed_id,
        "trial_number": 0,
        "condition_id": request.condition_id,
        "assistant_name": "manipulation_check",
        "tone": "",
        "confidence_framing": "",
        "visual_identity": "",
        "decision": request.manipulation_check,
        "latency_ms": 0,
        "confidence_score": 0,
        "ai_correct": False,
        "action_sequence": json.dumps({"visual_check": request.visual_check}),
        "timestamp": request.timestamp,
        "logged_at": datetime.now().isoformat()
    }

    save_event(event)

    return {
        "status": "manipulation check logged",
        "participant_id": hashed_id
    }


@app.get("/export")
def export_dataset():
    """
    Export all logged events as a structured JSON dataset.
    Used by researchers to download the full experiment dataset.
    """
    events = get_all_events()
    return {
        "total_events": len(events),
        "exported_at": datetime.now().isoformat(),
        "data": events
    }
