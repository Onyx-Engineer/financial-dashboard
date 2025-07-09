import { useState, useEffect } from "react";
import { getPerformance } from "../api";
import { notify } from "../services/notification";
import type { PerformanceData } from "../types/PerformanceData";

interface UsePerformanceResult {
  performanceData: PerformanceData[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage performance data
 * @returns Performance data, loading state, error state, and refetch function
 */
export const usePerformance = (): UsePerformanceResult => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPerformance = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getPerformance();
      setPerformanceData(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch performance data";
      setError(err instanceof Error ? err : new Error(errorMessage));

      // Add error notification
      notify.error(`Failed to load performance data: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformance();
  }, []);

  return {
    performanceData,
    isLoading,
    error,
    refetch: fetchPerformance,
  };
};
