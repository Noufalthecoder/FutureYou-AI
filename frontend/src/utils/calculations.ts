/**
 * Client-side financial calculation utilities.
 */

export function calculateFutureValue(
  monthlyInvestment: number,
  years: number,
  rate = 0.12
): number {
  const months = years * 12;
  const r = rate / 12;
  if (r === 0) return monthlyInvestment * months;
  return monthlyInvestment * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
}

export function formatCurrency(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return `₹${value.toLocaleString("en-IN")}`;
}
