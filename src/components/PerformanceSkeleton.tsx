import { Box, Card, CardContent, Skeleton } from "@mui/material";

export const PerformanceSkeleton = () => {
  return (
    <Box>
      {/* Header skeleton */}
      <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="80%" height={24} sx={{ mb: 3 }} />

      {/* KPI cards skeleton */}
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
        {[1, 2, 3, 4].map((index) => (
          <Card key={index}>
            <CardContent>
              <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="40%" height={16} />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Date range picker skeleton */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Skeleton variant="text" width={80} height={24} />
        <Skeleton variant="rectangular" width={150} height={40} />
        <Skeleton variant="text" width={20} height={24} />
        <Skeleton variant="rectangular" width={150} height={40} />
      </Box>

      {/* Chart skeleton */}
      <Card>
        <CardContent>
          <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={400} />
        </CardContent>
      </Card>
    </Box>
  );
};
