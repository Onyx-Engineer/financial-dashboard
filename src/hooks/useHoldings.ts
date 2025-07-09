import { useState, useEffect } from "react";
import { getHoldings } from "../api";
import type { Holding } from "../types/HoldingCompany";

interface UseHoldingsResult {
  holdings: Holding[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage holdings data
 * @returns Holdings data, loading state, error state, and refetch function
 */
export const useHoldings = (): UseHoldingsResult => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHoldings = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getHoldings();
      setHoldings(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch holdings")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  return {
    holdings,
    isLoading,
    error,
    refetch: fetchHoldings,
  };
};
