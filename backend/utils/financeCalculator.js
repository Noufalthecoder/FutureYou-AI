/**
 * Calculates future value of a SIP (Systematic Investment Plan)
 * using compound interest formula.
 * @param {number} monthlyInvestment - Monthly SIP amount
 * @param {number} years - Investment duration in years
 * @param {number} rate - Annual return rate (default 12%)
 * @returns {number} Future value
 */
function calculateFutureValue(monthlyInvestment, years, rate = 0.12) {
  const months = years * 12;
  const r = rate / 12;
  if (r === 0) return monthlyInvestment * months;
  return monthlyInvestment * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
}

/**
 * Maps a future value to a life outcome category.
 * @param {number} value - Future portfolio value
 * @returns {string} Outcome label
 */
function mapLifeOutcome(value) {
  if (value < 500000) return "Risk";
  if (value < 1500000) return "Moderate";
  return "Secure";
}

/**
 * Generates year-by-year projection data for charting.
 * @param {number} monthlyInvestment
 * @param {number} years
 * @param {number} rate
 * @returns {Array<{year: number, value: number}>}
 */
function generateProjection(monthlyInvestment, years, rate = 0.12) {
  const data = [];
  for (let y = 1; y <= years; y++) {
    data.push({ year: y, value: Math.round(calculateFutureValue(monthlyInvestment, y, rate)) });
  }
  return data;
}

module.exports = { calculateFutureValue, mapLifeOutcome, generateProjection };
