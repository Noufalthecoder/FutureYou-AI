const { generateInsight } = require("../services/aiService");

/**
 * POST /api/ai-insight
 * Accepts simulation results and returns AI-generated explanation + recommendation.
 */
function aiInsight(req, res) {
  try {
    const { salary, sip, years, current, improved, currentOutcome } = req.body;

    if (!salary || !sip || !years || current === undefined) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const insight = generateInsight({
      salary: Number(salary),
      sip: Number(sip),
      years: Number(years),
      current: Number(current),
      improved: Number(improved),
      currentOutcome,
    });

    return res.json(insight);
  } catch (err) {
    console.error("AI insight error:", err);
    return res.status(500).json({ error: "AI insight generation failed." });
  }
}

module.exports = { aiInsight };
