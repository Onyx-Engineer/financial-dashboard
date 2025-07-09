import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export const HoldingsSkeleton = () => {
  return (
    <Box>
      {/* Header skeleton */}
      <Skeleton variant="text" width="40%" height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="70%" height={24} sx={{ mb: 3 }} />

      {/* Filters skeleton */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Skeleton variant="rectangular" width={120} height={40} />
        <Skeleton variant="rectangular" width={200} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </Box>

      {/* Table skeleton */}
      <Card>
        <CardContent>
          <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "12%" }}>
                  <Skeleton variant="text" width="100%" height={20} />
                </TableCell>
                <TableCell sx={{ width: "28%" }}>
                  <Skeleton variant="text" width="100%" height={20} />
                </TableCell>
                <TableCell align="right" sx={{ width: "20%" }}>
                  <Skeleton variant="text" width="100%" height={20} />
                </TableCell>
                <TableCell align="right" sx={{ width: "15%" }}>
                  <Skeleton variant="text" width="100%" height={20} />
                </TableCell>
                <TableCell align="right" sx={{ width: "15%" }}>
                  <Skeleton variant="text" width="100%" height={20} />
                </TableCell>
                <TableCell align="right" sx={{ width: "10%" }}>
                  <Skeleton variant="text" width="100%" height={20} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3, 4, 5].map((row) => (
                <TableRow key={row}>
                  <TableCell sx={{ width: "12%" }}>
                    <Skeleton variant="text" width="100%" height={20} />
                  </TableCell>
                  <TableCell sx={{ width: "28%" }}>
                    <Skeleton variant="text" width="100%" height={20} />
                  </TableCell>
                  <TableCell align="right" sx={{ width: "20%" }}>
                    <Skeleton variant="text" width="100%" height={20} />
                  </TableCell>
                  <TableCell align="right" sx={{ width: "15%" }}>
                    <Skeleton variant="text" width="100%" height={20} />
                  </TableCell>
                  <TableCell align="right" sx={{ width: "15%" }}>
                    <Skeleton variant="text" width="100%" height={20} />
                  </TableCell>
                  <TableCell align="right" sx={{ width: "10%" }}>
                    <Skeleton variant="text" width="100%" height={20} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};
