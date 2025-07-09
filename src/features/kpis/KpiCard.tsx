import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import { TrendingUp, TrendingDown, Remove } from "@mui/icons-material";

interface KpiCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    percentage: number;
  };
  formatValue?: (value: number) => string;
  isLoading?: boolean;
}

export const KpiCard = ({
  label,
  value,
  change,
  formatValue = (val) => val.toLocaleString(),
  isLoading = false,
}: KpiCardProps) => {
  const isPositive = change && change.percentage > 0;
  const isNegative = change && change.percentage < 0;
  const isNeutral = change && change.percentage === 0;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {label}
        </Typography>

        <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
          {isLoading ? (
            <Skeleton width="60%" height={40} />
          ) : typeof value === "number" ? (
            formatValue(value)
          ) : (
            value
          )}
        </Typography>

        {change && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {isPositive ? (
              <TrendingUp color="success" fontSize="small" />
            ) : isNegative ? (
              <TrendingDown color="error" fontSize="small" />
            ) : isNeutral ? (
              <Remove color="action" fontSize="small" />
            ) : null}

            <Typography
              variant="body2"
              color={
                isPositive
                  ? "success.main"
                  : isNegative
                  ? "error.main"
                  : isNeutral
                  ? "text.secondary"
                  : "text.secondary"
              }
              fontWeight="medium"
            >
              {isLoading ? (
                <Skeleton width={80} />
              ) : (
                <>
                  {isPositive ? "+" : ""}
                  {change.value.toLocaleString()} ({isPositive ? "+" : ""}
                  {change.percentage.toFixed(1)}%)
                </>
              )}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
