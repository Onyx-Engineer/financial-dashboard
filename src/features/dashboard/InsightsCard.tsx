import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { BusinessCenter, Assessment } from "@mui/icons-material";
import type { SectorAllocation } from "../../hooks/useDashboardData";

interface InsightsCardProps {
  sectorAllocation: SectorAllocation[];
  riskMetrics: {
    portfolioBeta: number;
    portfolioVolatility: number;
  };
  isLoading?: boolean;
}

export const InsightsCard = ({
  sectorAllocation,
  riskMetrics,
  isLoading = false,
}: InsightsCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            🔍 Portfolio Insights
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Loading...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          🔍 Portfolio Insights
        </Typography>

        {/* Sector Allocation */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <BusinessCenter sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography variant="subtitle2" fontWeight={600}>
              Sector Allocation
            </Typography>
          </Box>

          <List dense sx={{ p: 0 }}>
            {sectorAllocation.slice(0, 4).map((sector) => (
              <ListItem key={sector.sector} sx={{ px: 0, py: 0.25 }}>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2">{sector.sector}</Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {sector.percentage.toFixed(1)}%
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Risk Metrics */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Assessment sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography variant="subtitle2" fontWeight={600}>
              Risk Metrics
            </Typography>
          </Box>

          <List dense sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 0.25 }}>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">Beta</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {riskMetrics.portfolioBeta.toFixed(2)}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>

            <ListItem sx={{ px: 0, py: 0.25 }}>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">Volatility</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {riskMetrics.portfolioVolatility.toFixed(1)}%
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};
