/**
 * AssistantDisplay.jsx
 * Renders the AI assistant identity based on the assigned condition.
 *
 * Visual Identity cue:
 *   avatar → renders a simple humanlike face SVG
 *   icon   → renders a neutral geometric machine icon SVG
 *
 * The assistant name is displayed below the icon/avatar.
 * Both name and visual identity are driven by the condition prop.
 */

function HumanAvatar() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" fill="#E8F4FD" stroke="#378ADD" strokeWidth="1.5" />
      <circle cx="32" cy="24" r="10" fill="#378ADD" opacity="0.8" />
      <path
        d="M12 54 Q12 40 32 40 Q52 40 52 54"
        fill="#378ADD"
        opacity="0.6"
      />
    </svg>
  );
}

function MachineIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="8" width="48" height="48" rx="6" fill="#F1EFE8" stroke="#888780" strokeWidth="1.5" />
      <rect x="18" y="20" width="8" height="8" rx="2" fill="#888780" />
      <rect x="38" y="20" width="8" height="8" rx="2" fill="#888780" />
      <rect x="20" y="38" width="24" height="4" rx="2" fill="#888780" />
    </svg>
  );
}

function AssistantDisplay({ condition }) {
  if (!condition) return null;

  const { name, visual } = condition;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      padding: "16px",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      width: "120px",
      backgroundColor: "#fafafa"
    }}>
      {visual === "avatar" ? <HumanAvatar /> : <MachineIcon />}
      <span style={{
        fontSize: "14px",
        fontWeight: "600",
        color: "#333",
        textAlign: "center"
      }}>
        {name}
      </span>
      <span style={{
        fontSize: "11px",
        color: "#888",
        textAlign: "center"
      }}>
        {visual === "avatar" ? "AI Assistant" : "Automated System"}
      </span>
    </div>
  );
}

export default AssistantDisplay;