import { useState } from "react";
import DecisionTask from "./DecisionTask";
import { trials } from "../data/trials";
import { generateParticipantID } from "../utils/participantID";

function TrialManager() {

  const [participantID] = useState(generateParticipantID());
  const [trialIndex, setTrialIndex] = useState(0);

  const [condition] = useState(
    Math.random() < 0.5 ? "neutral" : "humanlike"
  );

  const agentName =
    condition === "neutral" ? "AI System" : "Alex";

  const [decisionData, setDecisionData] = useState(null);
  const [confidence, setConfidence] = useState(3);

  const handleDecision = (decision, latency) => {

    const trial = trials[trialIndex];

    setDecisionData({
      participant_id: participantID,
      trial_number: trial.id,
      condition: condition,
      decision: decision,
      latency_ms: latency,
      ai_correct: trial.aiCorrect
    });
  };

  const submitTrial = () => {

    const event = {
      ...decisionData,
      confidence_score: confidence,
      timestamp: new Date().toISOString()
    };

    console.log("Experiment Event:", event);

    if (trialIndex < trials.length - 1) {
      setTrialIndex(trialIndex + 1);
      setDecisionData(null);
      setConfidence(3);
    } else {
      alert("Experiment complete!");
    }
  };

  const trial = trials[trialIndex];

  if (decisionData) {
    return (
      <div style={{ padding: "40px", fontFamily: "Arial" }}>
        <h3>How confident are you in your decision?</h3>

        <input
          type="range"
          min="1"
          max="5"
          value={confidence}
          onChange={(e) => setConfidence(e.target.value)}
        />

        <p>Confidence: {confidence}</p>

        <button onClick={submitTrial}>
          Submit
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>AI Decision Experiment</h1>

      <p>Participant ID: {participantID}</p>

      <p>
        Trial {trialIndex + 1} of {trials.length}
      </p>

      <DecisionTask
        agentName={agentName}
        trial={trial}
        onDecision={handleDecision}
      />

    </div>
  );
}

export default TrialManager;