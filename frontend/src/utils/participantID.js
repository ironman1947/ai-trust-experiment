export function generateParticipantID() {
  return "P_" + Math.random().toString(36).substring(2, 10);
}