import { useState, useMemo, useEffect } from "react";
import { Typography, Box, Button, Alert } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { parseISO } from "date-fns";
import { usePerformance } from "../hooks/usePerformance";
import { KpiGroup } from "../features/kpis/KpiGroup";
import { DateRangePicker } from "../features/filters/DateRangePicker";
import { PerformanceChartBlock } from "../features/performance/PerformanceChartBlock";
import { PerformanceSkeleton } from "../components/PerformanceSkeleton";
import { ErrorBanner } from "../components/ErrorBanner";

const Performance = () => {
  const { performanceData, isLoading, error, refetch } = usePerformance();

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    if (performanceData.length > 0 && !dateRange[0] && !dateRange[1]) {
      const firstDate = performanceData[0]?.date;
      const lastDate = performanceData[performanceData.length - 1]?.date;
      if (firstDate && lastDate) {
        setDateRange([parseISO(firstDate), parseISO(lastDate)]);
      }
    }
  }, [performanceData, dateRange]);

  // Filter data based on date range
  const filteredData = useMemo(() => {
    if (!dateRange[0] || !dateRange[1]) return performanceData;

    return performanceData.filter((item) => {
      const itemDate = parseISO(item.date);
      return itemDate >= dateRange[0]! && itemDate <= dateRange[1]!;
    });
  }, [performanceData, dateRange]);

  // Calculate KPIs from filtered data
  const kpis = useMemo(() => {
    if (filteredData.length === 0) return [];

    const firstItem = filteredData[0];
    const lastItem = filteredData[filteredData.length - 1];

    if (!firstItem || !lastItem) return [];

    const initialValue = firstItem.portfolioValue;
    const latestValue = lastItem.portfolioValue;
    const absoluteChange = latestValue - initialValue;
    const percentageChange = (absoluteChange / initialValue) * 100;

    const totalCashFlow = filteredData.reduce(
      (sum, item) => sum + item.cashFlow,
      0
    );

    // Calculate benchmark returns
    const sp500Initial = firstItem.benchmarkSP500;
    const sp500Latest = lastItem.benchmarkSP500;
    const sp500Change = ((sp500Latest - sp500Initial) / sp500Initial) * 100;

    return [
      {
        label: "Portfolio Value",
        value: latestValue,
        change: {
          value: absoluteChange,
          percentage: percentageChange,
        },
        formatValue: (value: number) => `$${value.toLocaleString()}`,
      },
      {
        label: "Total Return",
        value: percentageChange,
        change: {
          value: absoluteChange,
          percentage: percentageChange,
        },
        formatValue: (value: number) => `${value.toFixed(1)}%`,
      },
      {
        label: "Cash Flow",
        value: totalCashFlow,
        formatValue: (value: number) => `$${value.toLocaleString()}`,
      },
      {
        label: "S&P 500 Return",
        value: sp500Change,
        formatValue: (value: number) => `${value.toFixed(1)}%`,
      },
    ];
  }, [filteredData]);

  // Loading state
  if (isLoading) {
    return <PerformanceSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Performance
        </Typography>
        <ErrorBanner
          message="Failed to load performance data."
          onRetry={refetch}
        />
      </Box>
    );
  }

  // Empty state
  if (performanceData.length === 0) {
    return (
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Performance
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          No performance data available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Performance
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your portfolio performance over time.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={refetch}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </Box>

      {/* KPI Cards */}
      <Box sx={{ mb: 4 }}>
        <KpiGroup items={kpis} isLoading={isLoading} />
      </Box>

      {/* Date Range Filter */}
      <DateRangePicker
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onStartDateChange={(date) => setDateRange([date, dateRange[1]])}
        onEndDateChange={(date) => setDateRange([dateRange[0], date])}
        minDate={
          performanceData.length > 0
            ? parseISO(performanceData[0]?.date || "")
            : undefined
        }
        maxDate={
          performanceData.length > 0
            ? parseISO(performanceData[performanceData.length - 1]?.date || "")
            : undefined
        }
        disabled={isLoading}
      />

      {/* Empty filtered data message */}
      {dateRange[0] && dateRange[1] && filteredData.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No data available in the selected date range. Try expanding your
          start/end dates.
        </Alert>
      )}

      {/* Performance Chart */}
      <PerformanceChartBlock data={filteredData} />
    </Box>
  );
};

export default Performance;
