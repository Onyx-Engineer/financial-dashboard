import { sampleHoldings } from "../types/HoldingCompany";
import type { Holding } from "../types/HoldingCompany";

// Simulates API call delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches holdings data
 * @returns Promise resolving to holdings data
 */
export const getHoldings = async (): Promise<Holding[]> => {
  // Simulate network delay (400-900ms as specified)
  await delay(Math.random() * 500 + 400);

  // Return all holdings
  return sampleHoldings;
};
