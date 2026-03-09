import { useState, useEffect } from "react";

function DecisionTask({ agentName, trial, onDecision }) {

  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
  }, [trial]);

  const handleClick = (decision) => {
    const latency = Date.now() - startTime;
    onDecision(decision, latency);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>{agentName} Recommendation</h2>

      <p>Trial {trial.id} of 5</p>

      <div>
        <h4>Product A</h4>
        <p>Rating: 4.6 / 5</p>
      </div>

      <div>
        <h4>Product B</h4>
        <p>Rating: 4.2 / 5</p>
      </div>

      <h3>AI recommends: Product {trial.aiRecommendation}</h3>

      <button onClick={() => handleClick("accept")}>
        Accept Recommendation
      </button>

      <button onClick={() => handleClick("override")}>
        Override AI
      </button>
    </div>
  );
}

export default DecisionTask;