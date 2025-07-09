import { Typography, Box } from "@mui/material";
import { useDashboardData } from "../hooks/useDashboardData";
import { DashboardKpiCard } from "../features/kpis/DashboardKpiCard";
import { PerformersCard } from "../features/dashboard/PerformersCard";
import { InsightsCard } from "../features/dashboard/InsightsCard";
import { ErrorBanner } from "../components/ErrorBanner";

const Dashboard = () => {
  const {
    kpis,
    topPerformers,
    underPerformers,
    sectorAllocation,
    riskMetrics,
    isLoading,
    error,
  } = useDashboardData();

  if (error) {
    return (
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <ErrorBanner
          message="Failed to load dashboard data. Please try again."
          onRetry={() => window.location.reload()}
        />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Portfolio Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Your portfolio overview and key insights at a glance.
      </Typography>

      {/* Hero KPIs */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {kpis.map((kpi, index) => (
          <DashboardKpiCard key={index} kpi={kpi} isLoading={isLoading} />
        ))}
      </Box>

      {/* Performers and Insights */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Left Column - Performers */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <PerformersCard
            title="📈 Top Performers"
            performers={topPerformers}
            isPositive={true}
            isLoading={isLoading}
          />

          <PerformersCard
            title="📉 Underperformers"
            performers={underPerformers}
            isPositive={false}
            isLoading={isLoading}
          />
        </Box>

        {/* Right Column - Insights */}
        <InsightsCard
          sectorAllocation={sectorAllocation}
          riskMetrics={riskMetrics}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
