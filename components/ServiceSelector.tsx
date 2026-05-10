"use client";

import { Box, Chip, Typography } from "@mui/material";
import { services } from "@/lib/mockData";

interface Props {
  selected: string | null;
  onSelect: (service: string) => void;
}

export default function ServiceSelector({ selected, onSelect }: Props) {
  return (
    <Box>
      <Typography variant="h6">
        Select Service
      </Typography>

      <Box>
        {services.map((service) => (
          <Chip
            key={service}
            label={service}
            clickable
            color={selected === service ? "primary" : "default"}
            onClick={() => onSelect(service)}
          />
        ))}
      </Box>
    </Box>
  );
}