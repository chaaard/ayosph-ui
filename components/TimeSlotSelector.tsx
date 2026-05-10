"use client";

import { Box, Chip, Typography } from "@mui/material";

const timeSlots = [
  "08:00 AM",
  "10:00 AM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
];

interface Props {
  selected: string | null;
  onSelect: (slot: string) => void;
}

export default function TimeSlotSelector({ selected, onSelect }: Props) {
  return (
    <Box>
      <Typography variant="h6">
        Select Time Slot
      </Typography>

      <Box>
        {timeSlots.map((slot) => (
          <Chip
            key={slot}
            label={slot}
            clickable
            color={selected === slot ? "primary" : "default"}
            onClick={() => onSelect(slot)}
          />
        ))}
      </Box>
    </Box>
  );
}