const { runSimulation } = require("../services/simulationService");

/**
 * POST /api/simulate
 * Accepts user financial inputs and returns dual-scenario simulation results.
 */
function simulate(req, res) {
  try {
    const { salary, expenses, sip, age, years, gender } = req.body;

    // Basic validation
    if (!salary || !sip || !years) {
      return res.status(400).json({ error: "salary, sip, and years are required." });
    }

    const result = runSimulation({
      salary: Number(salary),
      expenses: Number(expenses) || 0,
      sip: Number(sip),
      age: Number(age) || 25,
      years: Number(years),
      gender: gender || "male",
    });

    return res.json(result);
  } catch (err) {
    console.error("Simulation error:", err);
    return res.status(500).json({ error: "Simulation failed." });
  }
}

module.exports = { simulate };
