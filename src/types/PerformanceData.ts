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
    date: "2023-08-01",
    portfolioValue: 1280000,
    benchmarkSP500: 4450.0,
    benchmarkRussell2000: 1920.0,
    benchmarkMSCIWorld: 2880.0,
    cashFlow: 10000,
    marketEvents: ["Earnings season begins"],
  },
  {
    date: "2023-09-15",
    portfolioValue: 1305000,
    benchmarkSP500: 4512.12,
    benchmarkRussell2000: 1945.67,
    benchmarkMSCIWorld: 2920.45,
    cashFlow: 20000,
    marketEvents: ["Inflation cools", "Energy prices spike"],
  },
  {
    date: "2023-10-20",
    portfolioValue: 1330000,
    benchmarkSP500: 4600.0,
    benchmarkRussell2000: 1980.0,
    benchmarkMSCIWorld: 2970.0,
    cashFlow: 12000,
    marketEvents: ["Government shutdown avoided"],
  },
  {
    date: "2023-12-01",
    portfolioValue: 1355000,
    benchmarkSP500: 4650.0,
    benchmarkRussell2000: 2000.0,
    benchmarkMSCIWorld: 3000.0,
    cashFlow: 8000,
    marketEvents: ["Holiday shopping surge"],
  },
  {
    date: "2023-12-31",
    portfolioValue: 1378000,
    benchmarkSP500: 4700.55,
    benchmarkRussell2000: 2022.1,
    benchmarkMSCIWorld: 3050.12,
    cashFlow: 35000,
    marketEvents: ["Year-end rally", "Strong earnings season"],
  },
  {
    date: "2024-02-10",
    portfolioValue: 1390000,
    benchmarkSP500: 4800.0,
    benchmarkRussell2000: 2070.0,
    benchmarkMSCIWorld: 3100.0,
    cashFlow: 5000,
    marketEvents: ["Mild winter boosts retail"],
  },
  {
    date: "2024-03-20",
    portfolioValue: 1402000,
    benchmarkSP500: 4950.33,
    benchmarkRussell2000: 2105.22,
    benchmarkMSCIWorld: 3180.88,
    cashFlow: 10000,
    marketEvents: ["Banking sector rebound", "Fed holds rates steady"],
  },
  {
    date: "2024-04-25",
    portfolioValue: 1410000,
    benchmarkSP500: 5000.0,
    benchmarkRussell2000: 2120.0,
    benchmarkMSCIWorld: 3200.0,
    cashFlow: 7000,
    marketEvents: ["Spring rally", "Inflation steady"],
  },
  {
    date: "2024-06-01",
    portfolioValue: 1415000,
    benchmarkSP500: 5100.0,
    benchmarkRussell2000: 2140.0,
    benchmarkMSCIWorld: 3220.0,
    cashFlow: 3000,
    marketEvents: ["Tech stocks lead gains"],
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
  {
    date: "2024-07-15",
    portfolioValue: 1445000,
    benchmarkSP500: 5200.1,
    benchmarkRussell2000: 2200.45,
    benchmarkMSCIWorld: 3300.12,
    cashFlow: 15000,
    marketEvents: ["Tech IPO surge", "Geopolitical tensions ease"],
  },
  {
    date: "2024-08-10",
    portfolioValue: 1460000,
    benchmarkSP500: 5250.0,
    benchmarkRussell2000: 2230.0,
    benchmarkMSCIWorld: 3350.0,
    cashFlow: 10000,
    marketEvents: ["Summer rally", "Interest rates unchanged"],
  },
  {
    date: "2024-09-01",
    portfolioValue: 1470000,
    benchmarkSP500: 5285.22,
    benchmarkRussell2000: 2255.3,
    benchmarkMSCIWorld: 3380.5,
    cashFlow: 20000,
    marketEvents: ["Consumer confidence rises", "Commodity prices stabilize"],
  },
];
