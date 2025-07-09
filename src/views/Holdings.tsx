import React, { useState, useMemo } from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import { useHoldings } from "../hooks/useHoldings";
import { HoldingsSkeleton } from "../components/HoldingsSkeleton";
import { ErrorBanner } from "../components/ErrorBanner";
import { HoldingsTable } from "../features/holdings/HoldingsTable";
import { HoldingsFilters } from "../features/holdings/HoldingsFilters";

const Holdings: React.FC = () => {
  const { holdings, isLoading, error, refetch } = useHoldings();
  const [sectorFilter, setSectorFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Extract unique sectors from holdings
  const sectors = useMemo(() => {
    const uniqueSectors = new Set(holdings.map((h) => h.sector));
    return Array.from(uniqueSectors).sort();
  }, [holdings]);

  // Filter holdings based on current filters
  const filteredHoldings = useMemo(() => {
    return holdings.filter((holding) => {
      const matchSector =
        sectorFilter === "All" || holding.sector === sectorFilter;
      const matchSearch =
        searchTerm === "" ||
        holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        holding.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchSector && matchSearch;
    });
  }, [holdings, sectorFilter, searchTerm]);

  if (isLoading) {
    return <HoldingsSkeleton />;
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Holdings
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          View your current portfolio holdings and asset allocation.
        </Typography>

        <ErrorBanner
          message="Failed to load holdings. Please try again."
          onRetry={refetch}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Holdings
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        View your current portfolio holdings and asset allocation.
      </Typography>

      <HoldingsFilters
        sectorFilter={sectorFilter}
        onSectorChange={setSectorFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRefresh={refetch}
        isLoading={isLoading}
        sectors={sectors}
      />

      <Card>
        <CardContent>
          {filteredHoldings.length > 0 ? (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                Current Holdings ({filteredHoldings.length})
              </Typography>
              <HoldingsTable holdings={filteredHoldings} />
            </>
          ) : (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                No Results Found
              </Typography>
              <HoldingsTable holdings={filteredHoldings} />
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Holdings;
