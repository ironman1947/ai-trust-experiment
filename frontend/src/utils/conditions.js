/**
 * conditions.js
 * Defines all 4 interface cues and generates 16 experimental conditions
 * using a 2x2x2x2 full factorial design.
 *
 * Cue 1 - Assistant Name:    "Alex" vs "AI System"
 * Cue 2 - Tone:              "conversational" vs "technical"
 * Cue 3 - Confidence Frame:  "certain" vs "neutral"
 * Cue 4 - Visual Identity:   "avatar" vs "icon"
 */

export const CUE_LEVELS = {
  name: ["Alex", "AI System"],
  tone: ["conversational", "technical"],
  confidence: ["certain", "neutral"],
  visual: ["avatar", "icon"],
};

/**
 * Generates all 16 conditions from the 2x2x2x2 factorial design.
 * Each condition is a unique combination of the 4 cues.
 */
export function generateAllConditions() {
  const conditions = [];
  let id = 1;

  for (const name of CUE_LEVELS.name) {
    for (const tone of CUE_LEVELS.tone) {
      for (const confidence of CUE_LEVELS.confidence) {
        for (const visual of CUE_LEVELS.visual) {
          conditions.push({
            condition_id: id,
            name,
            tone,
            confidence,
            visual,
          });
          id++;
        }
      }
    }
  }

  return conditions;
}

/**
 * Randomly assigns one of the 16 conditions to a participant.
 * Uses simple random assignment for equal distribution.
 */
export function assignCondition() {
  const all = generateAllConditions();
  const index = Math.floor(Math.random() * all.length);
  return all[index];
}

/**
 * Returns the AI recommendation message based on tone and confidence cues.
 *
 * tone:       conversational → friendly language
 *             technical      → formal language
 *
 * confidence: certain        → high certainty framing
 *             neutral        → neutral framing
 */
export function getRecommendationMessage(tone, confidence, recommendation) {
  if (tone === "conversational" && confidence === "certain") {
    return `I am highly confident that Product ${recommendation} is the better choice for you.`;
  }
  if (tone === "conversational" && confidence === "neutral") {
    return `Based on what I have seen, Product ${recommendation} might be worth considering.`;
  }
  if (tone === "technical" && confidence === "certain") {
    return `Analysis complete. Product ${recommendation} yields optimal performance metrics. Confidence: HIGH.`;
  }
  if (tone === "technical" && confidence === "neutral") {
    return `Processing complete. Product ${recommendation} shows marginally higher ratings. Confidence: MODERATE.`;
  }
  return `Recommendation: Product ${recommendation}`;
}