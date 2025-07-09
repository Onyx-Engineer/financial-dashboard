import {
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useHoldings } from "../hooks/useHoldings";

const Holdings = () => {
  const { holdings, isLoading, error } = useHoldings();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Holdings
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        View your current portfolio holdings and asset allocation.
      </Typography>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Current Holdings
          </Typography>

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error.message}
            </Alert>
          ) : holdings.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              No holdings found.
            </Alert>
          ) : (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table aria-label="holdings table">
                <TableHead>
                  <TableRow>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Current Value</TableCell>
                    <TableCell align="right">Shares</TableCell>
                    <TableCell align="right">Current Price</TableCell>
                    <TableCell align="right">Total Return (%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holdings.map((holding) => (
                    <TableRow key={holding.symbol}>
                      <TableCell component="th" scope="row">
                        {holding.symbol}
                      </TableCell>
                      <TableCell>{holding.name}</TableCell>
                      <TableCell align="right">
                        ${holding.currentValue.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        {holding.shares.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        ${holding.currentPrice.toFixed(2)}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            holding.totalReturnPercent >= 0
                              ? "success.main"
                              : "error.main",
                          fontWeight: 500,
                        }}
                      >
                        {holding.totalReturnPercent > 0 ? "+" : ""}
                        {holding.totalReturnPercent.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Holdings;
