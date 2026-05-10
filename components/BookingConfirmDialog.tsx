"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  service: string | null;
  date: string | null;
  time: string | null;
}

export default function BookingConfirmDialog({
  open,
  onClose,
  onConfirm,
  service,
  date,
  time,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Booking</DialogTitle>

      <DialogContent>
        <Typography>Service: {service}</Typography>
        <Typography>Date: {date}</Typography>
        <Typography>Time: {time}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}