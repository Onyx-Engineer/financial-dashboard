import { Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

export const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate,
  maxDate,
  disabled = false,
}: DateRangePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Date Range:
        </Typography>

        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={onStartDateChange}
          minDate={minDate}
          maxDate={endDate || maxDate}
          disabled={disabled}
          slotProps={{
            textField: {
              size: "small",
              sx: { minWidth: 150 },
              disabled: disabled,
            },
          }}
        />

        <Typography variant="body2" color="text.secondary">
          to
        </Typography>

        <DatePicker
          label="End Date"
          value={endDate}
          onChange={onEndDateChange}
          minDate={startDate || minDate}
          maxDate={maxDate}
          disabled={disabled}
          slotProps={{
            textField: {
              size: "small",
              sx: { minWidth: 150 },
              disabled: disabled,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};
