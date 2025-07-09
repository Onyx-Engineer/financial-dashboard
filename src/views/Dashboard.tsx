import { Typography, Box, Card, CardContent } from "@mui/material";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Overview
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Welcome to your financial dashboard. View your portfolio performance and
        holdings.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mt: 2,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Performance Summary
            </Typography>
            <Typography variant="body2">
              View detailed performance metrics and charts.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Holdings Overview
            </Typography>
            <Typography variant="body2">
              View your current portfolio holdings and asset allocation.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
