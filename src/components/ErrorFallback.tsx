import { Box, Typography, Button, Paper } from "@mui/material";
import { Refresh, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface ErrorFallbackProps {
  error: Error | null;
  resetError: () => void;
}

export const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          Something Went Wrong
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {error?.message || "An unexpected error occurred in the application"}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Refresh />}
            onClick={resetError}
          >
            Try Again
          </Button>

          <Button
            variant="outlined"
            startIcon={<Home />}
            component={Link}
            to="/"
          >
            Go Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
