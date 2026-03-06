function DecisionTask({ agentName, onDecision }) {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>{agentName} Recommendation</h2>

      <p>Choose the better product based on ratings.</p>

      <div>
        <h4>Product A</h4>
        <p>Rating: 4.6 / 5</p>
      </div>

      <div>
        <h4>Product B</h4>
        <p>Rating: 4.2 / 5</p>
      </div>

      <h3>AI recommends: Product B</h3>

      <button onClick={() => onDecision("accept")}>
        Accept Recommendation
      </button>

      <button onClick={() => onDecision("override")}>
        Choose Product A Instead
      </button>
    </div>
  );
}

export default DecisionTask;