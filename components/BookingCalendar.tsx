"use client";

import { Box, Grid, Paper, Typography, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { bookingDensity } from "@/lib/mockData";
import { getDateStatus } from "@/lib/bookingUtils";

interface Props {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export default function BookingCalendar({
  selectedDate,
  onSelectDate,
}: Props) {
  const today = dayjs();
  const startOfMonth = today.startOf("month");
  const daysInMonth = today.daysInMonth();

  const getColor = (count: number) => {
    const status = getDateStatus(count);

    if (status === "red") return "#f44336";
    if (status === "orange") return "#ff9800";
    return "#4caf50";
  };

  const getStatusLabel = (count: number) => {
    if (count >= 4) return "Fully booked";
    if (count >= 2) return "Partially booked";
    return "Available";
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dateObj = startOfMonth.add(i, "day");
    const date = dateObj.format("YYYY-MM-DD");
    const count = bookingDensity[date] || 0;

    return {
      date,
      count,
      isPast: dateObj.isBefore(today, "day"),
    };
  });

  return (
    <Box>
      <Typography variant="h6">
        Select Date
      </Typography>

      <Grid container spacing={1}>
        {days.map((day) => {
          const isFullyBooked = day.count >= 4;
          const isDisabled = isFullyBooked || day.isPast;

          return (
            <Grid key={day.date}>
              <Tooltip
                title={`${getStatusLabel(day.count)} (${day.count} bookings)`}
                arrow
              >
                <Paper
                  onClick={() => {
                    if (!isDisabled) onSelectDate(day.date);
                  }}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    backgroundColor: getColor(day.count),
                    color: "#fff",
                    opacity: isDisabled ? 0.5 : 1,
                    border:
                      selectedDate === day.date
                        ? "3px solid black"
                        : "none",
                    transition: "0.2s",
                    "&:hover": {
                      transform: isDisabled ? "none" : "scale(1.05)",
                    },
                  }}
                >
                  {day.date.split("-")[2]}
                </Paper>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}