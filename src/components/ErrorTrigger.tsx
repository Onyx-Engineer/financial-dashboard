import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

interface ErrorTriggerProps {
  message?: string;
}

export const ErrorTrigger = ({ message = "Test Error" }: ErrorTriggerProps) => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    // This will trigger the error boundary
    throw new Error(message);
  }

  return (
    <Box
      sx={{
        my: 2,
        p: 2,
        border: "1px dashed",
        borderColor: "warning.main",
        borderRadius: 1,
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Error Boundary Test Component
      </Typography>
      <Button
        variant="contained"
        color="warning"
        startIcon={<ErrorOutline />}
        onClick={() => setShouldError(true)}
      >
        Trigger Error
      </Button>
    </Box>
  );
};
