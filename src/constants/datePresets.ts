import {
  startOfDay,
  subDays,
  subMonths,
  startOfYear,
  subYears,
  endOfDay,
} from "date-fns";

// Interface for date range
export interface DateRange {
  startDate: Date;
  endDate: Date;
}

// Interface for date preset
export interface DatePreset {
  label: string;
  getValue: () => DateRange;
}

// Create preset objects with calculation functions
export const datePresets: DatePreset[] = [
  {
    label: "Last 7 Days",
    getValue: () => ({
      startDate: startOfDay(subDays(new Date(), 7)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: "Last 30 Days",
    getValue: () => ({
      startDate: startOfDay(subDays(new Date(), 30)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: "Last 3 Months",
    getValue: () => ({
      startDate: startOfDay(subMonths(new Date(), 3)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: "Last 6 Months",
    getValue: () => ({
      startDate: startOfDay(subMonths(new Date(), 6)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: "Year-to-Date",
    getValue: () => ({
      startDate: startOfYear(new Date()),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    label: "Last Year",
    getValue: () => ({
      startDate: startOfDay(subYears(new Date(), 1)),
      endDate: endOfDay(new Date()),
    }),
  },
];

// Helper function to get date preset by label
export const getDatePresetByLabel = (label: string): DatePreset | undefined => {
  return datePresets.find((preset) => preset.label === label);
};

// Helper function to apply a date preset
export const applyDatePreset = (label: string): DateRange | null => {
  const preset = getDatePresetByLabel(label);
  return preset ? preset.getValue() : null;
};

export default datePresets;
