import React from "react";
import { Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import {
  Inbox as InboxIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  TableChart as TableChartIcon,
} from "@mui/icons-material";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "compact";
  type?: "data" | "search" | "performance" | "holdings";
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  variant = "default",
  type = "data",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Default icons based on type
  const getDefaultIcon = () => {
    switch (type) {
      case "search":
        return <SearchIcon sx={{ fontSize: 48, color: "text.secondary" }} />;
      case "performance":
        return (
          <TrendingUpIcon sx={{ fontSize: 48, color: "text.secondary" }} />
        );
      case "holdings":
        return (
          <TableChartIcon sx={{ fontSize: 48, color: "text.secondary" }} />
        );
      default:
        return <InboxIcon sx={{ fontSize: 48, color: "text.secondary" }} />;
    }
  };

  const defaultIcon = getDefaultIcon();
  const displayIcon = icon || defaultIcon;

  if (variant === "compact") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          px: 2,
          textAlign: "center",
          minHeight: 200,
        }}
      >
        {displayIcon}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            mt: 2,
            mb: description ? 1 : 0,
            color: "text.primary",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: action ? 2 : 0, maxWidth: 300 }}
          >
            {description}
          </Typography>
        )}
        {action && <Box sx={{ mt: 1 }}>{action}</Box>}
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 3,
        textAlign: "center",
        minHeight: 300,
        border: "1px dashed",
        borderColor: "divider",
        backgroundColor: "background.default",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 400,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "action.hover",
            mb: 3,
          }}
        >
          {displayIcon}
        </Box>

        <Typography
          variant="h5"
          component="h3"
          sx={{
            mb: 2,
            color: "text.primary",
            fontWeight: 600,
            fontSize: isMobile ? "1.25rem" : "1.5rem",
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: action ? 3 : 0,
              lineHeight: 1.6,
              fontSize: isMobile ? "0.875rem" : "1rem",
            }}
          >
            {description}
          </Typography>
        )}

        {action && <Box sx={{ mt: 1 }}>{action}</Box>}
      </Box>
    </Paper>
  );
};

export default EmptyState;
