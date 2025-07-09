import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import type { TopPerformer } from "../../hooks/useDashboardData";

interface PerformersCardProps {
  title: string;
  performers: TopPerformer[];
  isPositive: boolean;
  isLoading?: boolean;
}

export const PerformersCard = ({
  title,
  performers,
  isPositive,
  isLoading = false,
}: PerformersCardProps) => {
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const iconColor = isPositive ? "success.main" : "error.main";

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Icon sx={{ color: iconColor }} />
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
          </Box>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Icon sx={{ color: iconColor }} />
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>

        <List dense sx={{ p: 0 }}>
          {performers.map((performer) => (
            <ListItem key={performer.symbol} sx={{ px: 0, py: 0.5 }}>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {performer.symbol}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: performer.isPositive
                          ? "success.main"
                          : "error.main",
                        fontWeight: 500,
                      }}
                    >
                      {performer.dayChangePercent >= 0 ? "+" : ""}
                      {performer.dayChangePercent.toFixed(2)}%
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {performer.name}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
