export interface PerformanceData {
  date: string;
  portfolioValue: number;
  benchmarkSP500: number;
  benchmarkRussell2000: number;
  benchmarkMSCIWorld: number;
  cashFlow: number;
  marketEvents: string[];
}

// Sample performance data matching appendix JSON
export const samplePerformance: PerformanceData[] = [
  {
    date: "2023-06-22",
    portfolioValue: 1250000,
    benchmarkSP500: 4381.47,
    benchmarkRussell2000: 1892.34,
    benchmarkMSCIWorld: 2856.78,
    cashFlow: 50000,
    marketEvents: ["Fed rate hike", "Tech sector rally"],
  },
  {
    date: "2024-06-21",
    portfolioValue: 1420000,
    benchmarkSP500: 5123.41,
    benchmarkRussell2000: 2156.89,
    benchmarkMSCIWorld: 3245.67,
    cashFlow: -25000,
    marketEvents: ["AI boom continues", "Market volatility"],
  },
];
