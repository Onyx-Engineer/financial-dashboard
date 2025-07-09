/**
 * Formats a number as currency
 * @param value - The number to format
 * @param currency - The currency code (default: 'USD')
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Formats a percentage value
 * @param value - The percentage value (e.g., 0.15 for 15%)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals = 2): string => {
  return `${value > 0 ? "+" : ""}${value.toFixed(decimals)}%`;
};
