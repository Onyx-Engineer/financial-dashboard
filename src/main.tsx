import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";

// Import custom theme
import theme from "./config/theme";

// Import layout
import AppShell from "./layout/AppShell";

// Import views
import Dashboard from "./views/Dashboard";
import Performance from "./views/Performance";
import Holdings from "./views/Holdings";

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "performance",
        element: <Performance />,
      },
      {
        path: "holdings",
        element: <Holdings />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
