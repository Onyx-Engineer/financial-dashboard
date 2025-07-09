import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Snackbar,
  Alert,
  type AlertProps,
  Slide,
  type SlideProps,
  Box,
  Typography,
} from "@mui/material";
import { useNotification } from "../services/notification";

// Slide transition component
const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

// Portal container for global positioning
const getPortalContainer = (): HTMLElement => {
  const containerId = "toast-host-portal";
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.pointerEvents = "none";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }

  return container;
};

interface ToastHostProps {
  /**
   * Position of the toast notifications
   */
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };

  /**
   * Whether to show queue count when multiple notifications exist
   */
  showQueueCount?: boolean;

  /**
   * Maximum width of toast notifications
   */
  maxWidth?: number | string;
}

export const ToastHost: React.FC<ToastHostProps> = ({
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  showQueueCount = true,
  maxWidth = 400,
}) => {
  const { currentNotification, queueLength, dismiss } = useNotification();

  const alertSeverity = useMemo((): AlertProps["severity"] => {
    if (!currentNotification) return "info";

    switch (currentNotification.type) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
      default:
        return "info";
    }
  }, [currentNotification]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // Don't auto-close on clickaway to prevent accidental dismissal
    if (reason === "clickaway") {
      return;
    }
    dismiss();
  };

  const portalContainer = getPortalContainer();

  const toastContent = (
    <Snackbar
      open={!!currentNotification}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      TransitionComponent={SlideTransition}
      sx={{
        pointerEvents: "auto",
        "& .MuiSnackbar-root": {
          position: "static",
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={alertSeverity}
        variant="filled"
        sx={{
          width: "100%",
          maxWidth,
          fontSize: "0.875rem",
          "& .MuiAlert-message": {
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          },
        }}
      >
        <Typography component="span" variant="body2">
          {currentNotification?.message}
        </Typography>

        {showQueueCount && queueLength > 1 && (
          <Typography
            component="span"
            variant="caption"
            sx={{
              opacity: 0.8,
              fontSize: "0.75rem",
            }}
          >
            {queueLength - 1} more notification
            {queueLength - 1 === 1 ? "" : "s"} queued
          </Typography>
        )}
      </Alert>
    </Snackbar>
  );

  return createPortal(
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        justifyContent:
          anchorOrigin.vertical === "top" ? "flex-start" : "flex-end",
        alignItems:
          anchorOrigin.horizontal === "left"
            ? "flex-start"
            : anchorOrigin.horizontal === "right"
            ? "flex-end"
            : "center",
        padding: 2,
      }}
    >
      {toastContent}
    </Box>,
    portalContainer
  );
};

export default ToastHost;
