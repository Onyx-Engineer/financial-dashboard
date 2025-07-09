import { Box, Typography, useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import type { PerformanceData } from "../../types/PerformanceData";

interface PerformanceChartProps {
  data: PerformanceData[];
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const theme = useTheme();

  // Transform data for charting - removed unused cashFlow
  const chartData = data.map((item) => ({
    date: format(parseISO(item.date), "MMM dd"),
    portfolioValue: item.portfolioValue,
    sp500: item.benchmarkSP500,
    russell2000: item.benchmarkRussell2000,
    msciWorld: item.benchmarkMSCIWorld,
  }));

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Portfolio Performance
      </Typography>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* Accessibility elements for screen readers */}
          <title>Portfolio Performance Chart</title>
          <desc>
            Line chart showing portfolio value compared to S&P 500, Russell
            2000, and MSCI World benchmarks over time. Portfolio value is shown
            in blue, S&P 500 in orange, Russell 2000 in green, and MSCI World in
            yellow.
          </desc>

          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />

          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            fontSize={12}
          />

          <YAxis
            stroke={theme.palette.text.secondary}
            fontSize={12}
            tickFormatter={formatCurrency}
          />

          <Tooltip
            formatter={(value: number) => [formatCurrency(value), "Value"]}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
            }}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="portfolioValue"
            stroke={theme.palette.primary.main}
            strokeWidth={3}
            name="Portfolio Value"
            dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
          />

          <Line
            type="monotone"
            dataKey="sp500"
            stroke={theme.palette.secondary.main}
            strokeWidth={2}
            name="S&P 500"
            dot={{ fill: theme.palette.secondary.main, strokeWidth: 1, r: 3 }}
          />

          <Line
            type="monotone"
            dataKey="russell2000"
            stroke={theme.palette.success.main}
            strokeWidth={2}
            name="Russell 2000"
            dot={{ fill: theme.palette.success.main, strokeWidth: 1, r: 3 }}
          />

          <Line
            type="monotone"
            dataKey="msciWorld"
            stroke={theme.palette.warning.main}
            strokeWidth={2}
            name="MSCI World"
            dot={{ fill: theme.palette.warning.main, strokeWidth: 1, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
