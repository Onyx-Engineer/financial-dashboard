import type { Holding } from "@/types/HoldingCompany";

export const holdingsFixture: Holding[] = [
  {
    symbol: "AAPL",
    name: "Apple",
    sector: "Tech",
    subSector: "Consumer Electronics",
    shares: 10,
    currentValue: 2000,
    currentPrice: 200,
    dayChange: 40,
    dayChangePercent: 2,
    totalReturn: 400,
    totalReturnPercent: 25,
    avgCostBasis: 160,
    weight: 15.5,
    beta: 1.1,
    marketCap: 3000000000000,
    lastUpdated: "2024-01-01T00:00:00Z",
    riskMetrics: {
      volatility: 0.18,
      sharpeRatio: 1.2,
      maxDrawdown: -0.15,
    },
  },
  {
    symbol: "JPM",
    name: "JPMorgan",
    sector: "Financial",
    subSector: "Banking",
    shares: 20,
    currentValue: 3000,
    currentPrice: 150,
    dayChange: -60,
    dayChangePercent: -2,
    totalReturn: -200,
    totalReturnPercent: -6.25,
    avgCostBasis: 160,
    weight: 23.3,
    beta: 0.9,
    marketCap: 450000000000,
    lastUpdated: "2024-01-01T00:00:00Z",
    riskMetrics: {
      volatility: 0.12,
      sharpeRatio: 0.8,
      maxDrawdown: -0.1,
    },
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    sector: "Auto",
    subSector: "Electric Vehicles",
    shares: 5,
    currentValue: 3500,
    currentPrice: 700,
    dayChange: 175,
    dayChangePercent: 5,
    totalReturn: 1500,
    totalReturnPercent: 75,
    avgCostBasis: 400,
    weight: 27.1,
    beta: 1.6,
    marketCap: 800000000000,
    lastUpdated: "2024-01-01T00:00:00Z",
    riskMetrics: {
      volatility: 0.3,
      sharpeRatio: 1.1,
      maxDrawdown: -0.25,
    },
  },
];
