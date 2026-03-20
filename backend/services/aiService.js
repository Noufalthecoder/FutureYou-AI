/**
 * Generates AI-driven financial insights based on simulation results.
 * Uses rule-based logic (no external API required).
 */
function generateInsight({ salary, sip, years, current, improved, currentOutcome }) {
  const sipRatio = ((sip / salary) * 100).toFixed(1);
  const growth = (((improved - current) / current) * 100).toFixed(1);

  let explanation = "";
  let recommendation = "";

  // Explanation based on outcome
  if (currentOutcome === "Risk") {
    explanation = `With your current SIP of ₹${sip.toLocaleString()}, you're investing ${sipRatio}% of your salary. Over ${years} years, your projected corpus of ₹${current.toLocaleString()} puts you in a financially vulnerable position. Rising inflation and unexpected expenses could significantly impact your quality of life.`;
    recommendation = `Increase your monthly SIP to at least ₹${Math.round(sip * 1.5).toLocaleString()}. Cut discretionary expenses by 15-20%. Consider index funds for better long-term returns. Start an emergency fund covering 6 months of expenses.`;
  } else if (currentOutcome === "Moderate") {
    explanation = `You're on a reasonable path — investing ${sipRatio}% of your salary monthly. Your projected ₹${current.toLocaleString()} corpus provides moderate financial security. However, there's significant room to optimize your wealth trajectory.`;
    recommendation = `Boosting your SIP by 30% could grow your corpus to ₹${improved.toLocaleString()} — a ${growth}% improvement. Diversify across equity mutual funds and PPF. Review and increase SIP annually by 10% (step-up SIP).`;
  } else {
    explanation = `Excellent financial discipline. Investing ${sipRatio}% of your salary, your projected corpus of ₹${current.toLocaleString()} places you in a secure financial position. You're well-positioned for retirement, major life goals, and wealth creation.`;
    recommendation = `Maintain your investment discipline. Consider diversifying into international funds and REITs. Explore tax-saving instruments like ELSS. Your improved scenario of ₹${improved.toLocaleString()} is achievable with a modest SIP increase.`;
  }

  return { explanation, recommendation, sipRatio, growth };
}

module.exports = { generateInsight };
