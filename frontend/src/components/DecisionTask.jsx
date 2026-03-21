import { useState, useEffect } from "react";
import AssistantDisplay from "./AssistantDisplay";
import { getRecommendationMessage } from "../utils/conditions";

function DecisionTask({ condition, trial, onDecision }) {
  const [startTime, setStartTime] = useState(performance.now());
  const [actionSequence, setActionSequence] = useState([]);

  useEffect(() => {
    setStartTime(performance.now());
    setActionSequence([]);
  }, [trial]);

  const logAction = (action) => {
    setActionSequence((prev) => [
      ...prev,
      { action, timestamp: performance.now() }
    ]);
  };

  const handleClick = (decision) => {
    const latency = Math.round(performance.now() - startTime);
    onDecision(decision, latency, actionSequence);
  };

  if (!condition || !trial) return null;

  const { tone, confidence } = condition;
  const recommendationMessage = getRecommendationMessage(
    tone,
    confidence,
    trial.aiRecommendation
  );

  return (
    <div style={{
      padding: "32px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px"
    }}>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "24px"
      }}>
        <AssistantDisplay condition={condition} />
        <div style={{
          backgroundColor: "#f0f4ff",
          padding: "16px",
          borderRadius: "10px",
          flex: 1,
          fontSize: "15px",
          color: "#333",
          lineHeight: "1.5"
        }}>
          {recommendationMessage}
        </div>
      </div>

      <div style={{
        display: "flex",
        gap: "16px",
        marginBottom: "24px"
      }}>
        <div
          style={{
            flex: 1,
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#fff"
          }}
          onMouseEnter={() => logAction("hover_product_a")}
        >
          <h4 style={{ margin: "0 0 8px 0" }}>Product A</h4>
          <p style={{ margin: 0, color: "#555" }}>Rating: 4.6 / 5</p>
        </div>

        <div
          style={{
            flex: 1,
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#fff"
          }}
          onMouseEnter={() => logAction("hover_product_b")}
        >
          <h4 style={{ margin: "0 0 8px 0" }}>Product B</h4>
          <p style={{ margin: 0, color: "#555" }}>Rating: 4.2 / 5</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={() => handleClick("accept")}
          onMouseEnter={() => logAction("hover_accept")}
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#378ADD",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            cursor: "pointer"
          }}
        >
          Accept Recommendation
        </button>

        <button
          onClick={() => handleClick("override")}
          onMouseEnter={() => logAction("hover_override")}
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#fff",
            color: "#333",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "15px",
            cursor: "pointer"
          }}
        >
          Override AI
        </button>
      </div>
    </div>
  );
}

export default DecisionTask;