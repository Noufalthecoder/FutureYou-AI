const { calculateFutureValue, mapLifeOutcome, generateProjection } = require("../utils/financeCalculator");

/**
 * Runs dual-scenario simulation: current SIP vs improved SIP (+30%).
 */
function runSimulation({ salary, expenses, sip, age, years, gender }) {
  const improvedSip = Math.round(sip * 1.3);

  const currentValue = Math.round(calculateFutureValue(sip, years));
  const improvedValue = Math.round(calculateFutureValue(improvedSip, years));

  const currentOutcome = mapLifeOutcome(currentValue);
  const improvedOutcome = mapLifeOutcome(improvedValue);

  // Year-by-year chart data
  const currentProjection = generateProjection(sip, years);
  const improvedProjection = generateProjection(improvedSip, years);

  // Asset thresholds
  const assets = {
    current: {
      house: currentValue >= 1000000,
      car: currentValue >= 500000,
    },
    improved: {
      house: improvedValue >= 1000000,
      car: improvedValue >= 500000,
    },
  };

  // Regret indicators
  const regret = {
    houseDelayed: currentValue < 1000000,
    educationRisk: currentValue < 700000,
    retirementQuality: currentOutcome,
  };

  return {
    current: currentValue,
    improved: improvedValue,
    improvedSip,
    currentOutcome,
    improvedOutcome,
    currentProjection,
    improvedProjection,
    assets,
    regret,
    inputs: { salary, expenses, sip, age, years, gender },
  };
}

module.exports = { runSimulation };
