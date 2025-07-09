import {
  Card,
  CardContent,
  Box,
  Chip,
  Typography,
  Tooltip,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { PerformanceChart } from "./PerformanceChart";
import type { PerformanceData } from "../../types/PerformanceData";

interface PerformanceChartBlockProps {
  data: PerformanceData[];
}

export const PerformanceChartBlock = ({ data }: PerformanceChartBlockProps) => {
  // Collect all market events with their dates from the data
  const marketEventsWithDates = data
    .flatMap((item) =>
      item.marketEvents.map((event) => ({
        date: item.date,
        event: event,
      }))
    )
    .filter(
      (item, index, array) =>
        array.findIndex((x) => x.event === item.event) === index
    ); // Remove duplicates based on event name

  return (
    <Card>
      <CardContent>
        <PerformanceChart data={data} />

        {marketEventsWithDates.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Market Events:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {marketEventsWithDates.map((item, index) => (
                <Tooltip
                  key={index}
                  title={`${format(parseISO(item.date), "MMM dd, yyyy")} - ${
                    item.event
                  }`}
                  arrow
                >
                  <Chip
                    label={`${format(parseISO(item.date), "MMM dd")} - ${
                      item.event
                    }`}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
