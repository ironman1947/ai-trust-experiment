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

  const handleDecision = (decision) => {

    const trial = trials[trialIndex];

    console.log({
      participant_id: participantID,
      trial_number: trial.id,
      condition: condition,
      decision: decision,
      ai_correct: trial.aiCorrect
    });

    if (trialIndex < trials.length - 1) {
      setTrialIndex(trialIndex + 1);
    } else {
      alert("Experiment complete!");
    }
  };

  return (
    <DecisionTask
      agentName={agentName}
      trial={trials[trialIndex]}
      onDecision={handleDecision}
    />
  );
}

export default TrialManager;