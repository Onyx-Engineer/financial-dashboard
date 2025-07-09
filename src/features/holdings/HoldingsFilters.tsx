import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Search, Refresh, Clear } from "@mui/icons-material";

interface HoldingsFiltersProps {
  sectorFilter: string;
  onSectorChange: (sector: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  sectors: string[];
}

export const HoldingsFilters: React.FC<HoldingsFiltersProps> = ({
  sectorFilter,
  onSectorChange,
  searchTerm,
  onSearchChange,
  onRefresh,
  isLoading,
  sectors,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
        mb: 3,
      }}
    >
      <FormControl sx={{ minWidth: 150 }} disabled={isLoading}>
        <InputLabel id="sector-filter-label">Sector</InputLabel>
        <Select
          labelId="sector-filter-label"
          value={sectorFilter}
          label="Sector"
          onChange={(e) => onSectorChange(e.target.value)}
          size="small"
          aria-controls="sector-menu"
          aria-expanded={false}
        >
          <MenuItem value="All">All Sectors</MenuItem>
          {sectors.map((sector) => (
            <MenuItem key={sector} value={sector}>
              {sector}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        aria-label="Search holdings"
        placeholder="Search by symbol or name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        disabled={isLoading}
        sx={{ minWidth: 250 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Tooltip title="Refresh holdings">
        <IconButton
          onClick={onRefresh}
          disabled={isLoading}
          aria-label="Refresh holdings"
        >
          <Refresh />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
