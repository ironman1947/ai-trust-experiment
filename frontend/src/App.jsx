import { useState } from "react";
import DecisionTask from "./components/DecisionTask";

function App() {

  // Experimental condition
  const [condition] = useState(
    Math.random() < 0.5 ? "neutral" : "humanlike"
  );

  const agentName =
    condition === "neutral" ? "AI System" : "Alex";

  const handleDecision = (decision) => {
    console.log("Condition:", condition);
    console.log("User decision:", decision);
  };

  return (
    <div>
      <DecisionTask
        agentName={agentName}
        onDecision={handleDecision}
      />
    </div>
  );
}

export default App;