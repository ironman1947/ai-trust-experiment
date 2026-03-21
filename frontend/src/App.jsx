/**
 * App.jsx
 * Root component. Wraps the experiment in ConditionProvider
 * so all child components can access the assigned condition.
 */

import { ConditionProvider } from "./components/ConditionProvider";
import TrialManager from "./components/TrialManager";

function App() {
  return (
    <ConditionProvider>
      <TrialManager />
    </ConditionProvider>
  );
}

export default App;