import { useMemo } from "react";
import { useHoldings } from "./useHoldings";
import { usePerformance } from "./usePerformance";
import { formatCurrency } from "../helpers/formatCurrency";

export interface DashboardKPI {
  label: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
}

export interface TopPerformer {
  symbol: string;
  name: string;
  dayChangePercent: number;
  isPositive: boolean;
}

export interface SectorAllocation {
  sector: string;
  percentage: number;
  value: number;
}

export interface DashboardData {
  kpis: DashboardKPI[];
  topPerformers: TopPerformer[];
  underPerformers: TopPerformer[];
  sectorAllocation: SectorAllocation[];
  riskMetrics: {
    portfolioBeta: number;
    portfolioVolatility: number;
  };
  isLoading: boolean;
  error: Error | null;
}

export const useDashboardData = (): DashboardData => {
  const {
    holdings,
    isLoading: holdingsLoading,
    error: holdingsError,
  } = useHoldings();
  const {
    performanceData,
    isLoading: performanceLoading,
    error: performanceError,
  } = usePerformance();

  const dashboardData = useMemo(() => {
    if (holdingsLoading || performanceLoading) {
      return {
        kpis: [],
        topPerformers: [],
        underPerformers: [],
        sectorAllocation: [],
        riskMetrics: { portfolioBeta: 0, portfolioVolatility: 0 },
        isLoading: true,
        error: null,
      };
    }

    if (holdingsError || performanceError) {
      return {
        kpis: [],
        topPerformers: [],
        underPerformers: [],
        sectorAllocation: [],
        riskMetrics: { portfolioBeta: 0, portfolioVolatility: 0 },
        isLoading: false,
        error: holdingsError || performanceError,
      };
    }

    // Calculate portfolio totals
    const portfolioValue = holdings.reduce(
      (sum, holding) => sum + holding.currentValue,
      0
    );
    const totalDayChange = holdings.reduce(
      (sum, holding) => sum + holding.dayChange,
      0
    );
    const totalDayChangePercent =
      portfolioValue > 0
        ? (totalDayChange / (portfolioValue - totalDayChange)) * 100
        : 0;
    const totalReturn = holdings.reduce(
      (sum, holding) => sum + holding.totalReturn,
      0
    );
    const totalCostBasis = holdings.reduce(
      (sum, holding) => sum + holding.avgCostBasis * holding.shares,
      0
    );
    const totalReturnPercent =
      totalCostBasis > 0 ? (totalReturn / totalCostBasis) * 100 : 0;

    // Calculate S&P 500 comparison (using latest performance data)
    const latestPerformance = performanceData[performanceData.length - 1];
    const earliestPerformance = performanceData[0];
    let sp500Return = 0;
    if (latestPerformance && earliestPerformance) {
      sp500Return =
        ((latestPerformance.benchmarkSP500 -
          earliestPerformance.benchmarkSP500) /
          earliestPerformance.benchmarkSP500) *
        100;
    }
    const vsSpReturn = totalReturnPercent - sp500Return;

    // Build KPIs
    const kpis: DashboardKPI[] = [
      {
        label: "Portfolio Value",
        value: formatCurrency(portfolioValue),
      },
      {
        label: "Today's P&L",
        value: formatCurrency(Math.abs(totalDayChange)),
        change: {
          value: `${
            totalDayChangePercent >= 0 ? "+" : ""
          }${totalDayChangePercent.toFixed(2)}%`,
          isPositive: totalDayChange >= 0,
        },
      },
      {
        label: "Total Return",
        value: `${
          totalReturnPercent >= 0 ? "+" : ""
        }${totalReturnPercent.toFixed(1)}%`,
        change: {
          value: formatCurrency(Math.abs(totalReturn)),
          isPositive: totalReturn >= 0,
        },
      },
      {
        label: "vs S&P 500",
        value: `${vsSpReturn >= 0 ? "+" : ""}${vsSpReturn.toFixed(1)}%`,
        change: {
          value: vsSpReturn >= 0 ? "Outperforming" : "Underperforming",
          isPositive: vsSpReturn >= 0,
        },
      },
    ];

    // Get top and underperformers
    const sortedHoldings = [...holdings].sort(
      (a, b) => b.dayChangePercent - a.dayChangePercent
    );
    const topPerformers: TopPerformer[] = sortedHoldings
      .slice(0, 3)
      .map((holding) => ({
        symbol: holding.symbol,
        name: holding.name,
        dayChangePercent: holding.dayChangePercent,
        isPositive: holding.dayChangePercent >= 0,
      }));

    const underPerformers: TopPerformer[] = sortedHoldings
      .slice(-3)
      .reverse()
      .map((holding) => ({
        symbol: holding.symbol,
        name: holding.name,
        dayChangePercent: holding.dayChangePercent,
        isPositive: holding.dayChangePercent >= 0,
      }));

    // Calculate sector allocation
    const sectorTotals = holdings.reduce((acc, holding) => {
      acc[holding.sector] = (acc[holding.sector] || 0) + holding.currentValue;
      return acc;
    }, {} as Record<string, number>);

    const sectorAllocation: SectorAllocation[] = Object.entries(sectorTotals)
      .map(([sector, value]) => ({
        sector,
        value,
        percentage: (value / portfolioValue) * 100,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    // Calculate risk metrics (weighted averages)
    const portfolioBeta = holdings.reduce((sum, holding) => {
      const weight = holding.currentValue / portfolioValue;
      return sum + holding.beta * weight;
    }, 0);

    const portfolioVolatility = holdings.reduce((sum, holding) => {
      const weight = holding.currentValue / portfolioValue;
      return sum + holding.riskMetrics.volatility * weight;
    }, 0);

    return {
      kpis,
      topPerformers,
      underPerformers,
      sectorAllocation,
      riskMetrics: {
        portfolioBeta,
        portfolioVolatility: portfolioVolatility * 100, // Convert to percentage
      },
      isLoading: false,
      error: null,
    };
  }, [
    holdings,
    performanceData,
    holdingsLoading,
    performanceLoading,
    holdingsError,
    performanceError,
  ]);

  return dashboardData;
};
