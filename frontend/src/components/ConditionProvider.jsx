/**
 * ConditionProvider.jsx
 * Assigns one of 16 experimental conditions to the participant
 * and provides it to all child components via React Context.
 *
 * Any component that needs condition data can use:
 * const { condition } = useCondition();
 */

import { createContext, useContext, useState } from "react";
import { assignCondition } from "../utils/conditions";

const ConditionContext = createContext(null);

export function ConditionProvider({ children }) {
  const [condition] = useState(() => assignCondition());

  return (
    <ConditionContext.Provider value={{ condition }}>
      {children}
    </ConditionContext.Provider>
  );
}

export function useCondition() {
  const context = useContext(ConditionContext);
  if (!context) {
    throw new Error("useCondition must be used inside ConditionProvider");
  }
  return context;
}