"use client";

import {
  Box,
  Typography,
  Card,
  Divider,
  Stack,
  Button,
  Chip,
  Avatar,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import ChatIcon from "@mui/icons-material/Chat";
import CancelIcon from "@mui/icons-material/Cancel";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';

type Status = "Open" | "In Progress" | "Completed" | "Cancelled";

const status: Status = "Open";

const STATUS_STYLE: Record<Status, { bg: string; color: string }> = {
  Open: { bg: "rgba(33,150,243,0.12)", color: "#1e88e5" },
  "In Progress": { bg: "rgba(255,152,0,0.12)", color: "#ef6c00" },
  Completed: { bg: "rgba(76,175,80,0.12)", color: "#2e7d32" },
  Cancelled: { bg: "rgba(244,67,54,0.12)", color: "#d32f2f" },
};

const subServices = [
  { id: 1, name: "Declogging Sink", price: 350 },
  { id: 2, name: "Pipe Repair", price: 500 },
];

const date = "Wednesday, May 08, 2026";
const time = "10:00 AM";
const address = "Quezon City, Metro Manila, Philippines";
const paymentMethod = "GCash";
const total = 850;
const quantity = 1;
const photos = ["/sample1.jpg", "/sample2.jpg"];

export default function Page() {
  const router = useRouter();
  const isActive = status === "Open" || status === "In Progress";
  const statusStyle = STATUS_STYLE[status];

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
      {/* BREADCRUMBS */}
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

        <Link
          underline="hover"
          color="inherit"
          onClick={() => router.push("/user/booking/my-bookings")}
          sx={{
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          My Bookings
        </Link>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 13,
            color: "text.primary",
          }}
        >
          Booking Details
        </Typography>
      </Breadcrumbs>
      
      {/* HEADER */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <img
          src={"/icons/search.png"}
          style={{
            width: 28,
            height: 28,
            objectFit: "contain",
          }}
        />

        <Typography sx={{ fontSize: 28, fontWeight: 800 }}>
          Booking Details
        </Typography>
      </Stack>

      <Typography sx={{ color: "text.secondary", mb: 3, mt: 0.5 }}>
        Review service information and status
      </Typography>

      {/* MAIN CARD */}
      <Card
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* CARD HEADER */}
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
        >
          <Box>
            <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
              Booking #{45454}
            </Typography>

            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
              Created for your service request
            </Typography>
          </Box>

          <Chip
            label={"• " + status}
            size="small"
            sx={{
              fontWeight: 800,
              bgcolor: statusStyle.bg,
              color: statusStyle.color,
              px: 1,
            }}
          />
        </Stack>

        <Divider sx={{ mb: 2.5 }} />

        {/* SERVICES */}
        <Section
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HomeRepairServiceOutlinedIcon
                sx={{
                  fontSize: 22,
                  color: "#5048e5",
                }}
              />

              <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                Services
              </Typography>
            </Box>
          }
        >
          {subServices.map((s) => (
            <Row key={s.id} left={s.name} right={`PHP ${s.price}`} />
          ))}
        </Section>

        <Divider sx={{ my: 2.5 }} />

        {/* SCHEDULE */}
        <Section
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarMonthOutlinedIcon
                sx={{
                  fontSize: 22,
                  color: "#5048e5",
                }}
              />

              <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                Schedule
              </Typography>
            </Box>
          }
        >
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: "rgba(80,72,229,0.06)",
            }}
          >
            <Typography sx={{ fontWeight: 800 }}>{date}</Typography>
            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
              at {time}
            </Typography>
          </Box>
        </Section>

        <Divider sx={{ my: 2.5 }} />

        {/* LOCATION */}
        <Section
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnOutlinedIcon
                sx={{
                  fontSize: 22,
                  color: "#5048e5",
                }}
              />

              <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                Location
              </Typography>
            </Box>
          }
        >
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
            {address}
          </Typography>
        </Section>

        <Divider sx={{ my: 2.5 }} />

        {/* PAYMENT */}
        <Section
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PaymentOutlinedIcon
                sx={{
                  fontSize: 22,
                  color: "#5048e5",
                }}
              />

              <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                Payment Method
              </Typography>
            </Box>
          }
        >
        <Chip
          label={paymentMethod}
          sx={{
            fontWeight: 800,
            bgcolor: "rgba(80,72,229,0.08)",
          }}
        />
      </Section>

        <Divider sx={{ my: 2.5 }} />

        {/* PHOTOS */}
        <Section
           title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhotoSizeSelectActualOutlinedIcon
                sx={{
                  fontSize: 22,
                  color: "#5048e5",
                }}
              />

              <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                Photos
              </Typography>
            </Box>
          }
        >
          <Stack direction="row" spacing={2}>
            {photos.map((p, i) => (
              <Avatar
                key={i}
                variant="rounded"
                src={p}
                sx={{ width: 90, height: 90 }}
              />
            ))}
          </Stack>
        </Section>

        <Divider sx={{ my: 2.5 }} />

        {/* TOTAL */}
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 900 }}>Total</Typography>
          <Typography sx={{ fontWeight: 900, color: "#5048e5" }}>
            PHP {total * quantity}
          </Typography>
        </Stack>
      </Card>

      {/* ACTIONS */}
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", mt: 4 }}
      >
        {/* LEFT */}
        <Button
          startIcon={<ChatIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 800,
            color: "#5048e5",
          }}
        >
          Message
        </Button>

        {/* RIGHT */}
        {isActive ? (
          <Button
            startIcon={<CancelIcon />}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 999,
              fontWeight: 800,
              textTransform: "none",
              color: "#fff",
              background: "linear-gradient(135deg, #d32f2f, #ef5350)",
            }}
          >
            Cancel Booking
          </Button>
        ) : status === "Completed" ? (
          <Button
            startIcon={<CheckIcon />}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 999,
              fontWeight: 800,
              textTransform: "none",
              background: "linear-gradient(135deg, #2e7d32, #4caf50)",
              color: "#fff",
            }}
          >
            Completed
          </Button>
        ) : (
          <Button
            disabled
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 999,
              fontWeight: 800,
            }}
          >
            Cancelled
          </Button>
        )}
      </Stack>
    </Box>
  );
}

/* ---------- Helpers ---------- */

function Section({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Box sx={{ mb: 1 }}>
        {title}
      </Box>

      {children}
    </Box>
  );
}

function Row({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        py: 0.6,
      }}
    >
      <Typography sx={{ fontSize: 14 }}>{left}</Typography>
      <Typography sx={{ fontWeight: 800 }}>{right}</Typography>
    </Stack>
  );
}