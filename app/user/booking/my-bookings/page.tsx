"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  Chip,
  Divider,
  Button,
  Paper,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";


type BookingStatus = "Open" | "In Progress" | "Completed" | "Cancelled";

interface Booking {
  id: string;
  service: string;
  status: BookingStatus;
  date: string;
  location: string;
  total: number;
}

const STATUS_STYLE: Record<
  BookingStatus,
  { bg: string; color: string }
> = {
  Open: { bg: "rgba(33,150,243,0.12)", color: "#1e88e5" },
  "In Progress": { bg: "rgba(255,152,0,0.12)", color: "#ef6c00" },
  Completed: { bg: "rgba(76,175,80,0.12)", color: "#2e7d32" },
  Cancelled: { bg: "rgba(244,67,54,0.12)", color: "#d32f2f" },
};

const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: "45454",
    service: "Plumbing Service",
    status: "Open",
    date: "Wednesday, May 08, 2026 at 10:00 AM",
    location: "Quezon City, Metro Manila",
    total: 1200,
  },
  {
    id: "45455",
    service: "Electrical Repair",
    status: "In Progress",
    date: "Thursday, May 09, 2026 at 02:00 PM",
    location: "Diliman, Quezon City",
    total: 800,
  },
  {
    id: "45456",
    service: "Aircon Cleaning",
    status: "Completed",
    date: "Monday, May 05, 2026 at 09:00 AM",
    location: "Cubao, Quezon City",
    total: 1500,
  },
  {
    id: "45457",
    service: "House Cleaning",
    status: "Cancelled",
    date: "Sunday, May 04, 2026 at 01:00 PM",
    location: "Manila City",
    total: 600,
  },
];

const TABS: (BookingStatus | "All")[] = [
  "All",
  "Open",
  "In Progress",
  "Completed",
  "Cancelled",
];

export default function Page() {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const filtered = useMemo(() => {
    if (tab === "All") return SAMPLE_BOOKINGS;
    return SAMPLE_BOOKINGS.filter((b) => b.status === tab);
  }, [tab]);

  return (
    <Box
      sx={{
        p: 4, 
        mt: 1, 
        px: 3, 
        mx: 5,
        minHeight: "80vh",
        bgcolor: "background.default",
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon sx={{ fontSize: 14 }} />}
        sx={{
          mb: 2,
          "& .MuiBreadcrumbs-li": {
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <Link
          underline="hover"
          color="inherit"
          onClick={() => router.push("/user/dashboard")}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          <HomeIcon sx={{ fontSize: 16, mr: 0.4 }} />
          Home
        </Link>

        <Link
          underline="hover"
          color="inherit"
          onClick={() => router.push("/user/booking")}
          sx={{
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Booking
        </Link>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 13,
            color: "text.primary",
          }}
        >
          My Bookings
        </Typography>
      </Breadcrumbs>

      {/* HEADER */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <img
          src={"/icons/calendar.png"}
          style={{
            width: 28,
            height: 28,
            objectFit: "contain",
          }}
        />

        <Typography sx={{ fontSize: 28, fontWeight: 800 }}>
          My Bookings
        </Typography>
      </Stack>

      <Typography sx={{ color: "text.secondary", mb: 3, mt: 0.5 }}>
        {SAMPLE_BOOKINGS.length} Total Bookings
      </Typography>

      {/* MODERN FILTER PILLS */}
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
        {TABS.map((t) => {
          const active = tab === t;

          return (
            <Paper
              key={t}
              onClick={() => setTab(t)}
              elevation={0}
              sx={{
                px: 2,
                py: 0.8,
                borderRadius: 999,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 13,

                background: active
                  ? "#5048e5"
                  : "rgba(0,0,0,0.04)",

                color: active ? "#fff" : "text.primary",

                transition: "0.2s",

                "&:hover": {
                  background: active
                    ? "#433fcf"
                    : "rgba(80,72,229,0.1)",
                },
              }}
            >
              {t}
            </Paper>
          );
        })}
      </Stack>

      {/* CARDS */}
      <Stack spacing={2}>
        {filtered.map((b) => {
          const status = STATUS_STYLE[b.status];

          return (
            <Card
              key={b.id}
              sx={(theme) => {
                const isDark = theme.palette.mode === "dark";

                return {
                  p: 2.8,
                  borderRadius: 4,
                  position: "relative",
                  overflow: "hidden",

                  backdropFilter: "blur(14px)",

                  background: isDark
                     ? "0 10px 30px rgba(0,0,0,0.5)"
                      : "0 6px 18px rgba(0,0,0,0.06)",

                  border: isDark
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(0,0,0,0.05)",

                  boxShadow: isDark
                    ? "0 10px 30px rgba(0,0,0,0.5)"
                    : "0 10px 25px rgba(0,0,0,0.06)",

                  transition: "all 0.25s ease",

                  "&:hover": {
                    transform: "translateY(-4px)",

                    boxShadow: isDark
                      ? "0 18px 45px rgba(0,0,0,0.65)"
                      : "0 16px 35px rgba(80,72,229,0.15)",

                    borderColor: isDark
                      ? "rgba(111,104,232,0.35)"
                      : "rgba(80,72,229,0.2)",
                  },
                };
              }}
            >
              {/* HEADER */}
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                  {b.service}
                </Typography>

                <Chip
                  label={"• " + b.status}
                  size="small"
                  sx={{
                    fontWeight: 800,
                    background: status.bg,
                    color: status.color,
                  }}
                />
              </Stack>

              {/* SUB HEADER */}
              <Typography
                sx={{ fontSize: 12.5, color: "text.secondary", mt: 0.5 }}
              >
                Booking #{b.id}
              </Typography>

              {/* DETAILS */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                sx={{ mt: 1, justifyContent: "space-between" }}
              >
                <Typography sx={{ fontSize: 13 }}>
                  {b.date}
                </Typography>

                <Typography
                  sx={{ fontSize: 13, color: "text.secondary" }}
                >
                  {b.location}
                </Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* FOOTER */}
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    color: "#5048e5",
                    fontSize: 15,
                  }}
                >
                  PHP {b.total}
                </Typography>

                <Button
                  endIcon={<ArrowForwardIosIcon sx={{ fontSize: 14 }} />}
                  onClick={() => router.push(`././my-bookings/booking-details/${b.id}`)}
                  sx={{
                    textTransform: "none",
                    fontWeight: 800,
                    color: "#5048e5",
                    borderRadius: 999,
                    px: 1.5,

                    "&:hover": {
                      background: "rgba(80,72,229,0.08)",
                    },
                  }}
                >
                  View Details
                </Button>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}