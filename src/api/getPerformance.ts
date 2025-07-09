import { samplePerformance } from "../types/PerformanceData";
import type { PerformanceData } from "../types/PerformanceData";

// Simulates API call delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches performance data
 * @returns Promise resolving to performance data
 */
export const getPerformance = async (): Promise<PerformanceData[]> => {
  // Simulate network delay (400-900ms)
  await delay(Math.random() * 500 + 400);

  // Return all performance data
  return samplePerformance;
};
