/**
 * KB-34 + KB-35: Efficiency Algorithm Implementation + Zero-Value Guards
 *
 * Formula: Efficiency = (Complexity / Time) * LeadTimeWeight
 * LeadTimeWeight: Dynamic multiplier based on PR Turnaround Time.
 *
 * Zero-Value Guard Rules (KB-35):
 *  - Time_Spent == 0        → return 0 (cannot divide by zero)
 *  - Complexity null/undefined → default to 1 (safe fallback)
 *  - All guard triggers log a console.warn for debugging
 */

const LEAD_TIME_WEIGHT_FAST = 1.2; // < 24h  → bonus for fast PR merge
const LEAD_TIME_WEIGHT_SLOW = 0.8; // > 48h  → penalty for slow PR merge
const BASE_WEIGHT = 1.0;           // 24–48h → neutral

/**
 * Calculate the efficiency score for a single task.
 *
 * @param {number} complexity     - Task complexity score (e.g. story points)
 * @param {number} timeSpentHours - Actual hours spent on the task (must be > 0)
 * @param {number} leadTimeHours  - Hours from task start to PR merge
 * @returns {number} Efficiency score (higher = more efficient), or 0 on invalid input
 */
function calculateEfficiency(complexity, timeSpentHours, leadTimeHours) {
    // Guard: no division by zero (KB-35: Time_Spent == 0 → return 0)
    if (timeSpentHours == null || timeSpentHours <= 0) {
        console.warn("[KABAS WARN] Time Spent is zero or missing — returning safe default: 0");
        return 0;
    }

    // Guard: null/undefined complexity → default to 1 (KB-35 spec)
    if (complexity == null || complexity === undefined) {
        console.warn("[KABAS WARN] Complexity is null/undefined — defaulting to 1");
        complexity = 1;
    }

    // Guard: negative complexity → return 0
    if (complexity < 0) {
        console.warn("[KABAS WARN] Complexity is negative — returning safe default: 0");
        return 0;
    }

    // 1. Determine weight based on Lead Time
    let weight = BASE_WEIGHT;
    if (leadTimeHours < 24) weight = LEAD_TIME_WEIGHT_FAST;
    if (leadTimeHours > 48) weight = LEAD_TIME_WEIGHT_SLOW;

    // 2. Core Formula
    const rawScore   = complexity / timeSpentHours;
    const finalScore = rawScore * weight;

    return Number(finalScore.toFixed(4));
}

module.exports = { calculateEfficiency, LEAD_TIME_WEIGHT_FAST, LEAD_TIME_WEIGHT_SLOW, BASE_WEIGHT };
