import { Alert, AlertTitle, Button } from "@mui/material";
import { Refresh } from "@mui/icons-material";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorBanner = ({ message, onRetry }: ErrorBannerProps) => {
  return (
    <Alert
      severity="error"
      action={
        onRetry && (
          <Button
            color="inherit"
            size="small"
            startIcon={<Refresh />}
            onClick={onRetry}
          >
            Retry
          </Button>
        )
      }
      sx={{ mb: 3 }}
    >
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};
