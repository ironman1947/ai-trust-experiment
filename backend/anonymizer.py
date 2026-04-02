"""
anonymizer.py
Participant ID anonymization.

Hashes raw participant IDs using SHA-256 before storage.
Raw IDs are never stored in the database.
This ensures the dataset is anonymous and
compatible with IRB-approved research workflows.
"""

import hashlib


def hash_participant_id(participant_id: str) -> str:
    """
    Hashes a participant ID using SHA-256.

    Args:
        participant_id: raw participant ID from frontend

    Returns:
        8-character hex prefix of SHA-256 hash
        Example: "P_a2wvu4lg" → "3f8a9c2d"
    """
    hashed = hashlib.sha256(participant_id.encode()).hexdigest()
    return hashed[:8]
