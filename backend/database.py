"""
database.py
SQLite database connection and operations.

Tables:
    sessions  — one record per participant session
    events    — one record per trial event
"""

import sqlite3
from typing import List, Dict
import os
from pathlib import Path

# Load database path from environment or use default
DB_PATH = os.getenv("DATABASE_PATH", "experiment.db")

# Create data directory if it doesn't exist
Path(DB_PATH).parent.mkdir(parents=True, exist_ok=True)


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """
    Creates database tables if they don't exist.
    Called once when the server starts.
    """
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hashed_id TEXT NOT NULL,
            condition_id INTEGER,
            assistant_name TEXT,
            tone TEXT,
            confidence_framing TEXT,
            visual_identity TEXT,
            started_at TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            participant_id TEXT NOT NULL,
            trial_number INTEGER,
            condition_id INTEGER,
            assistant_name TEXT,
            tone TEXT,
            confidence_framing TEXT,
            visual_identity TEXT,
            decision TEXT,
            latency_ms INTEGER,
            confidence_score INTEGER,
            ai_correct INTEGER,
            action_sequence TEXT,
            timestamp TEXT,
            logged_at TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()


def save_session(session: Dict):
    """Store a participant session record."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO sessions (
            hashed_id, condition_id, assistant_name,
            tone, confidence_framing, visual_identity, started_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        session["hashed_id"],
        session["condition_id"],
        session["assistant_name"],
        session["tone"],
        session["confidence_framing"],
        session["visual_identity"],
        session["started_at"]
    ))

    conn.commit()
    conn.close()


def save_event(event: Dict):
    """Store a single trial event record."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO events (
            participant_id, trial_number, condition_id,
            assistant_name, tone, confidence_framing,
            visual_identity, decision, latency_ms,
            confidence_score, ai_correct, action_sequence,
            timestamp, logged_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        event["participant_id"],
        event["trial_number"],
        event["condition_id"],
        event["assistant_name"],
        event["tone"],
        event["confidence_framing"],
        event["visual_identity"],
        event["decision"],
        event["latency_ms"],
        event["confidence_score"],
        int(event["ai_correct"]),
        event["action_sequence"],
        event["timestamp"],
        event["logged_at"]
    ))

    conn.commit()
    conn.close()


def get_all_events() -> List[Dict]:
    """Retrieve all events for dataset export."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM events
        ORDER BY participant_id, trial_number
    """)

    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]
