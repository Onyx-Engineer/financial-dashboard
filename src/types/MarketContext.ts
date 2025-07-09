// New file for market reference data
export interface MarketContext {
  missingData: DataQuality;
  corporateActions: CorporateActionEvents;
  marketShocks: MarketShock[];
}

export interface DataQuality {
  weekends: boolean;
  holidays: string[];
  dataGaps: string[];
}

export interface StockSplit {
  symbol: string;
  date: string;
  ratio: string; // e.g., "4:1", "2:1"
}

export interface Dividend {
  symbol: string;
  exDate: string; // ex-dividend date
  amount: number; // dividend amount per share
}

export interface Spinoff {
  symbol: string;
  date: string;
  newSymbol: string; // symbol of the spun-off company
}

export interface CorporateActionEvents {
  stockSplits: StockSplit[];
  dividends: Dividend[];
  spinoffs: Spinoff[];
}

export interface MarketShock {
  date: string;
  type: "banking_crisis" | "pandemic" | "geopolitical";
  impact: number;
}

// Sample market context data matching appendix JSON
export const sampleMarketContext: MarketContext = {
  missingData: {
    weekends: true,
    holidays: ["2024-01-01", "2024-01-15", "2024-02-19", "2024-04-15"],
    dataGaps: ["2024-03-14", "2024-05-27"],
  },
  corporateActions: {
    stockSplits: [
      {
        symbol: "AAPL",
        date: "2024-02-15",
        ratio: "4:1",
      },
      {
        symbol: "TSLA",
        date: "2024-08-25",
        ratio: "3:1",
      },
    ],
    dividends: [
      {
        symbol: "JNJ",
        exDate: "2024-03-14",
        amount: 1.19,
      },
      {
        symbol: "PG",
        exDate: "2024-04-15",
        amount: 0.94,
      },
    ],
    spinoffs: [
      {
        symbol: "JNJ",
        date: "2023-11-03",
        newSymbol: "KVUE",
      },
    ],
  },
  marketShocks: [
    {
      date: "2023-03-10",
      type: "banking_crisis",
      impact: -0.15,
    },
    {
      date: "2024-01-15",
      type: "geopolitical",
      impact: -0.08,
    },
  ],
};
