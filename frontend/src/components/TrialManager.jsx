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
  const [events, setEvents] = useState([]);

  const [showManipulationCheck, setShowManipulationCheck] = useState(false);
  const [manipulationAnswer, setManipulationAnswer] = useState("");

  const [experimentComplete, setExperimentComplete] = useState(false);

  const trial = trials[trialIndex];

  const handleDecision = (decision, latency) => {

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

    setEvents((prev) => [...prev, event]);

    console.log("Experiment Event:", event);

    if (trialIndex < trials.length - 1) {
      setTrialIndex(trialIndex + 1);
      setDecisionData(null);
      setConfidence(3);
    } else {
      setShowManipulationCheck(true);
    }
  };

  const downloadData = (data) => {

    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "experiment_data.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  if (experimentComplete) {
    return (
      <div style={{ padding: "40px", fontFamily: "Arial" }}>
        <h1>Experiment Complete</h1>
        <p>Thank you for participating in this study.</p>
        <p>Your responses have been recorded successfully.</p>
      </div>
    );
  }

  if (showManipulationCheck) {

    return (
      <div style={{ padding: "40px", fontFamily: "Arial" }}>
        <h2>Manipulation Check</h2>

        <p>
          What was the name of the AI assistant you interacted with?
        </p>

        <select
          value={manipulationAnswer}
          onChange={(e) =>
            setManipulationAnswer(e.target.value)
          }
        >
          <option value="">Select</option>
          <option value="AI System">AI System</option>
          <option value="Alex">Alex</option>
          <option value="Not sure">Not sure</option>
        </select>

        <br /><br />

        <button
          onClick={() => {

            const finalData = [
              ...events,
              {
                participant_id: participantID,
                manipulation_check: manipulationAnswer
              }
            ];

            downloadData(finalData);

            setExperimentComplete(true);
          }}
        >
          Submit
        </button>
      </div>
    );
  }

  if (decisionData) {

    return (
      <div style={{ padding: "40px", fontFamily: "Arial" }}>
        <h3>How confident are you in your decision?</h3>

        <input
          type="range"
          min="1"
          max="5"
          value={confidence}
          onChange={(e) =>
            setConfidence(Number(e.target.value))
          }
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