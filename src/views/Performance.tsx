import {
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import { usePerformance } from "../hooks/usePerformance";

const Performance = () => {
  const { performanceData, isLoading, error } = usePerformance();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Performance
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Track your portfolio performance over time.
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Performance Chart
          </Typography>

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error.message}
            </Alert>
          ) : performanceData.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              No performance data available.
            </Alert>
          ) : (
            <Box>
              {/* Display some basic performance data */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Portfolio Value
                </Typography>
                {performanceData.map((data, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 1,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2">{data.date}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      ${data.portfolioValue.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Chart placeholder */}
              <Box
                sx={{
                  height: 300,
                  bgcolor: "neutral.100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Chart will be implemented here with {performanceData.length}{" "}
                  data points
                </Typography>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Performance;
