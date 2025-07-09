import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { formatCurrency, formatPercentage } from "../../helpers/formatCurrency";
import type { Holding } from "../../types/HoldingCompany";
import EmptyState from "../../components/EmptyState";

// Only allow sorting by visible columns
type SortKey =
  | "symbol"
  | "name"
  | "currentValue"
  | "dayChangePercent"
  | "totalReturnPercent"
  | "weight";
type SortDirection = "asc" | "desc";

interface HoldingsTableProps {
  holdings: Holding[];
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings }) => {
  const [sortKey, setSortKey] = useState<SortKey>("symbol");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (key: SortKey) => {
    const isAsc = sortKey === key && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortKey(key);
  };

  const sortedHoldings = React.useMemo(() => {
    return [...holdings].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [holdings, sortKey, sortDirection]);

  const getSortableHeader = (key: SortKey, label: string) => (
    <TableSortLabel
      active={sortKey === key}
      direction={sortKey === key ? sortDirection : "asc"}
      onClick={() => handleSort(key)}
      aria-label={`Sort by ${label}`}
    >
      {label}
    </TableSortLabel>
  );

  if (holdings.length === 0) {
    return (
      <EmptyState
        title="No holdings found"
        description="No holdings match your current filters. Try adjusting your search criteria."
        type="holdings"
        variant="compact"
      />
    );
  }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table aria-label="Holdings table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "background.default" }}>
            <TableCell
              sx={{ width: "12%" }}
              aria-sort={
                sortKey === "symbol"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : undefined
              }
            >
              {getSortableHeader("symbol", "Symbol")}
            </TableCell>
            <TableCell sx={{ width: "28%" }}>Name</TableCell>
            <TableCell
              align="right"
              sx={{ width: "20%" }}
              aria-sort={
                sortKey === "currentValue"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : undefined
              }
            >
              {getSortableHeader("currentValue", "Current Value")}
            </TableCell>
            <TableCell
              align="right"
              sx={{ width: "15%" }}
              aria-sort={
                sortKey === "dayChangePercent"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : undefined
              }
            >
              {getSortableHeader("dayChangePercent", "Day Change %")}
            </TableCell>
            <TableCell
              align="right"
              sx={{ width: "15%" }}
              aria-sort={
                sortKey === "totalReturnPercent"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : undefined
              }
            >
              {getSortableHeader("totalReturnPercent", "Total Return %")}
            </TableCell>
            <TableCell
              align="right"
              sx={{ width: "10%" }}
              aria-sort={
                sortKey === "weight"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : undefined
              }
            >
              {getSortableHeader("weight", "Weight %")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedHoldings.map((holding) => (
            <TableRow
              key={holding.symbol}
              tabIndex={0}
              sx={{
                "&:nth-of-type(even)": {
                  backgroundColor: "action.hover",
                },
                "&:hover": {
                  backgroundColor: "action.selected",
                },
                "&:focus": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "-2px",
                },
                cursor: "pointer",
              }}
            >
              <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                {holding.symbol}
              </TableCell>
              <TableCell>{holding.name}</TableCell>
              <TableCell align="right" sx={{ fontFamily: "monospace" }}>
                {formatCurrency(holding.currentValue)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color:
                    holding.dayChangePercent >= 0
                      ? "success.main"
                      : "error.main",
                  fontWeight: 500,
                  fontFamily: "monospace",
                }}
              >
                {formatPercentage(holding.dayChangePercent)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color:
                    holding.totalReturnPercent >= 0
                      ? "success.main"
                      : "error.main",
                  fontWeight: 500,
                  fontFamily: "monospace",
                }}
              >
                {formatPercentage(holding.totalReturnPercent)}
              </TableCell>
              <TableCell align="right" sx={{ fontFamily: "monospace" }}>
                {holding.weight.toFixed(1)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
