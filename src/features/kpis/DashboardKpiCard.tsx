import { Card, CardContent, Typography, Box } from "@mui/material";
import type { DashboardKPI } from "../../hooks/useDashboardData";

interface DashboardKpiCardProps {
  kpi: DashboardKPI;
  isLoading?: boolean;
}

export const DashboardKpiCard = ({
  kpi,
  isLoading = false,
}: DashboardKpiCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {kpi.label || "Loading..."}
            </Typography>
            <Typography variant="h6" color="text.disabled">
              —
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {kpi.label}
          </Typography>

          <Typography variant="h6" fontWeight={700}>
            {kpi.value}
          </Typography>

          {kpi.change && (
            <Typography
              variant="body2"
              sx={{
                color: kpi.change.isPositive ? "success.main" : "error.main",
                fontWeight: 500,
              }}
            >
              {kpi.change.value}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
