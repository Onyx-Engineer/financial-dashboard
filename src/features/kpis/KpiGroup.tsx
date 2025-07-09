import { Box } from "@mui/material";
import { KpiCard } from "./KpiCard";

interface KpiItem {
  label: string;
  value: number;
  change?: {
    value: number;
    percentage: number;
  };
  formatValue?: (value: number) => string;
}

interface KpiGroupProps {
  items: KpiItem[];
  isLoading?: boolean;
}

export const KpiGroup = ({ items, isLoading = false }: KpiGroupProps) => {
  return (
    <Box
      role="list"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 3,
      }}
    >
      {items.map((item, index) => (
        <Box key={index} role="listitem">
          <KpiCard
            label={item.label}
            value={item.value}
            change={item.change}
            formatValue={item.formatValue}
            isLoading={isLoading}
          />
        </Box>
      ))}
    </Box>
  );
};
