"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Stack,
  TextField,
  Radio,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CheckIcon from '@mui/icons-material/Check';
import { ISubService } from "@/interfaces/ISubService";
import LocationMap, { LatLng } from "@/components/LocationMap";
import axios from "axios";
import DatePicker from "react-datepicker";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const SUB_SERVICES: Record<string, ISubService[]> = {
  plumbing: [
    { id: 1, name: "Declogging", price: 350, desc: "Fix clogged sinks, toilets, drainage" },
    { id: 2, name: "Leak Repair", price: 500, desc: "Pipe leakage inspection and repair" },
    { id: 3, name: "Pipe Installation", price: 1200, desc: "Install new water pipes" },
    { id: 4, name: "Water Heater Fix", price: 800, desc: "Repair water heater issues" },
    { id: 5, name: "Bathroom Setup", price: 2500, desc: "Full bathroom plumbing setup", comingSoon: true },
  ],
  electrical: [
    { id: 1, name: "Wiring Fix", price: 400, desc: "Electrical troubleshooting" },
    { id: 2, name: "Outlet Repair", price: 250, desc: "Fix sockets and switches" },
    { id: 3, name: "Lighting Install", price: 600, desc: "Install lights", comingSoon: true },
  ],
};

const timeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

 const mockAvailability: Record<
    string,
    Record<string, "available" | "partial" | "full">
  > = {
    "2026-05-08": {
      "08:00 AM": "available",
      "09:00 AM": "partial",
      "10:00 AM": "available",
      "11:00 AM": "full",
      "01:00 PM": "available",
      "02:00 PM": "partial",
      "03:00 PM": "available",
      "04:00 PM": "full",
    },

    "2026-05-09": {
      "08:00 AM": "full",
      "09:00 AM": "full",
      "10:00 AM": "partial",
      "11:00 AM": "available",
      "01:00 PM": "available",
      "02:00 PM": "available",
      "03:00 PM": "partial",
      "04:00 PM": "available",
    },

    "2026-05-10": {
      "08:00 AM": "available",
      "09:00 AM": "available",
      "10:00 AM": "available",
      "11:00 AM": "partial",
      "01:00 PM": "partial",
      "02:00 PM": "full",
      "03:00 PM": "full",
      "04:00 PM": "available",
    },
  };

  const paymentOptions = [
  {
    id: "ewallet",
    title: "E-Wallet",
    desc: "GCash, Maya, etc.",
    icon: "/icons/e-wallet.png",
  },
  {
    id: "cash",
    title: "Cash",
    desc: "Pay upon completion",
    icon: "/icons/philippine-peso.png",
  },
  {
    id: "qrph",
    title: "QRPH",
    desc: "Scan QR to pay",
    icon: "/icons/qr-code.png",
  },
];

const steps = ["Category", "Services", "Details", "Location", "Payment", "Confirm"];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "plumbing";

  const [step, setStep] = useState<number>(1);
  const [subServices, setSubServices] = useState<ISubService[]>([]);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [coords, setCoords] = useState<LatLng | null>(null);
  const [address, setAddress] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [customTime, setCustomTime] = useState("");
  const [availability, setAvailability] = useState(mockAvailability);
  const [paymentMethod, setPaymentMethod] = useState("");

  const services = SUB_SERVICES[category] || [];

  const next = () => setStep((s) => s + 1);
  
  const back = () => setStep((s) => Math.max(1, s - 1));

  const toggleService = (service: ISubService) => {
    const exists = subServices.find((s) => s.id === service.id);

    if (exists) {
      setSubServices((prev) => prev.filter((s) => s.id !== service.id));
    } else {
      setSubServices((prev) => [...prev, service]);
    }
  };

  const removeService = (id: number) => {
    setSubServices((prev) => prev.filter((s) => s.id !== id));
  };

  const total = subServices.reduce((sum, s) => sum + s.price, 0);

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const MAX_PHOTOS = 5;

  const getAddress = async (lat: number, lng: number): Promise<string> => {
    const res = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat,
          lon: lng,
        },
      }
    );

    return res.data?.display_name || "";
  };

  const handleUseCurrentLocation = () => {
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const newCoords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };

      setCoords(newCoords);

      const addr = await getAddress(newCoords.lat, newCoords.lng);
      setAddress(addr);

      setLoadingLocation(false);
    });
  };

  const getDayStatus = (d: Date): "available" | "partial" | "full" => {
    const key = new Date(
      d.getTime() - d.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    const dayData = availability?.[key];

    if (!dayData) return "available";

    const values = Object.values(dayData);

    const totalSlots = timeSlots.length;
    const fullCount = values.filter(v => v === "full").length;
    const partialCount = values.filter(v => v === "partial").length;

    if (fullCount === totalSlots) return "full";

    if (partialCount > 0 || fullCount > 0) return "partial";

    return "available";
  };


  const isFutureDate = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const check = new Date(d);
    check.setHours(0, 0, 0, 0);

    return check >= today;
  };

  const getTimeStatus = (t: string) => {
    if (!date) return "available";

    return availability?.[date]?.[t] ?? "available";
  };

  const formatScheduleDate = (dateString: string) => {
    if (!dateString) return "";

    const d = new Date(dateString);

    const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(d);
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(d);
    const day = d.getDate();
    const year = d.getFullYear();

    return `${dayName}, ${month} ${day}, ${year}`;
  };


  return (
    <Box sx={{ minHeight: "80vh", bgcolor: "background.default", p: 4, mt: 1, px: 3, mx: 5 }}>
      
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

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 13,
            color: "text.primary",
          }}
        >
          Booking
        </Typography>
      </Breadcrumbs>
      
      {/* HEADER */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <img
          src={"/icons/booking.png"}
          style={{
            width: 28,
            height: 28,
            objectFit: "contain",
          }}
        />

        <Typography sx={{ fontSize: 28, fontWeight: 800 }}>
          Book a Service
        </Typography>
      </Stack>

      <Typography sx={{ color: "text.secondary", mb: 2 }}>
        Category: <b>{category.toUpperCase()}</b>
      </Typography>

      {/* STEPPER */}
      <Stepper
        activeStep={step}
        sx={{
          mb: 4,
          "& .MuiStepIcon-root.Mui-active": { color: "#5048e5" },
          "& .MuiStepIcon-root.Mui-completed": { color: "#5048e5" },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ "& .MuiStepLabel-label": { fontWeight: 600, fontSize: 13 } }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* STEP 1 */}
      {step === 1 && (
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 22 }}>
            Sub-Categories
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 2 }}>
            Choose one or more services
          </Typography>

          {/* ✅ SELECTED CHIPS */}
          {subServices.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>
                Selected Services
              </Typography>

              <Stack direction="row" spacing={1} 
                sx={{ flexWrap: "wrap" }}>
                {subServices.map((s) => (
                  <Chip
                    key={s.id}
                    label={`${s.name} (PHP ${s.price})`}
                    onDelete={() => removeService(s.id)}
                    sx={{
                      bgcolor: "#5048e5",
                      color: "#fff",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* TOTAL */}
          <Typography sx={{ fontWeight: 700, mb: 2 }}>
            Total: <span style={{ color: "#5f59e7" }}>PHP {total}</span>
          </Typography>

          {/* EMPTY */}
          {services.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography>No services available</Typography>
              <Typography sx={{ fontSize: 13 }}>
                Coming soon
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {services.map((sub) => {
                const selected = subServices.some((s) => s.id === sub.id);
                const isComingSoon = sub.comingSoon;

                return (
                  <Grid size={{ xs: 6, md: 3 }} key={sub.id}>
                    <Card
                      onClick={() => !isComingSoon && toggleService(sub)}
                      sx={{
                        position: "relative",
                        p: 2,
                        borderRadius: 3,
                        cursor: isComingSoon ? "not-allowed" : "pointer",

                        border: (theme) =>
                          selected
                            ? `2px solid #5048e5`
                            : `1px solid ${theme.palette.divider}`,

                        backgroundColor: (theme) =>
                          selected
                            ? theme.palette.mode === "light"
                              ? "rgba(80,72,229,0.08)"
                              : "rgba(80,72,229,0.2)"
                            : theme.palette.background.paper,

                        opacity: isComingSoon ? 0.5 : 1,

                        transition: "all 0.25s ease",

                        "&:hover": {
                          transform: isComingSoon ? "none" : "translateY(-3px)",

                          boxShadow: (theme) => theme.palette.mode === "dark"
                            ? "0 18px 45px rgba(0,0,0,0.65)"
                            : "0 16px 35px rgba(80,72,229,0.15)",

                          borderColor: (theme) => theme.palette.mode === "dark"
                            ? "rgba(111,104,232,0.35)"
                            : "rgba(80,72,229,0.2)",

                        },
                      }}
                    >
                      {/* SELECTED BADGE */}
                      {selected && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            px: 1,
                            py: 0.3,
                            fontSize: 10,
                            borderRadius: 2,
                            bgcolor: "#5048e5",
                            color: "#fff",
                          }}
                        >
                          ✓ Selected
                        </Box>
                      )}

                      {/* COMING SOON */}
                      {isComingSoon && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            px: 1,
                            py: 0.3,
                            fontSize: 10,
                            borderRadius: 2,
                            bgcolor: "#000",
                            color: "#fff",
                          }}
                        >
                          Coming Soon
                        </Box>
                      )}

                      <Typography sx={{ fontWeight: 700 }}>
                        {sub.name}
                      </Typography>

                      <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.5 }}>
                        {sub.desc}
                      </Typography>

                      <Typography sx={{ mt: 1.5, fontWeight: 800, color: "#5f59e7" }}>
                        PHP {sub.price}
                      </Typography>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}

          {/* BUTTONS */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              onClick={() => router.push("/user/dashboard")}
              startIcon={<ArrowBackIosIcon />}
              sx={{ color: "#4f47e6", }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              onClick={next}
              disabled={subServices.length === 0}
              endIcon={<ArrowForwardIosIcon />}
              sx={{
                px: 4,
                py: 1.3,
                borderRadius: 999,
                fontWeight: 800,
                textTransform: "none",
                background: "linear-gradient(135deg, #5048e5, #6c63ff)",
                boxShadow: "0 10px 25px rgba(80,72,229,0.25)",
                "&.Mui-disabled": {
                  background: "#c5c6f5",
                  color: "#fff",
                },
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <Box>
          {/* HEADER */}
          <Typography sx={{ fontSize: 22, fontWeight: 800 }}>
            Job Details
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 3 }}>
            Describe what you need done
          </Typography>

          {/* DESCRIPTION */}
          <Typography sx={{ fontWeight: 600, mb: 1 }}>
            Description
          </Typography>

          <TextField
            fullWidth
            multiline
            minRows={4}
            placeholder="e.g. Fix leaking pipe under kitchen sink, needs urgent repair..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* UPLOAD PHOTOS */}
          <Typography sx={{ fontWeight: 600, mb: 1 }}>
            Upload Photos
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            {/* UPLOAD BOX */}
            <Box
              component="label"
              sx={{
                width: 130,
                height: 130,
                border: "2px dashed #bbb",
                borderRadius: 2,
                display: photos.length >= MAX_PHOTOS ? "none" : "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexDirection: "column",
                color: "#888",
                "&:hover": {
                  borderColor: "#5048e5",
                  color: "#5048e5",
                },
              }}
            >
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);

                  setPhotos((prev) => {
                    const remainingSlots = MAX_PHOTOS - prev.length;

                    if (remainingSlots <= 0) return prev;

                    const allowedFiles = files.slice(0, remainingSlots);

                    return [...prev, ...allowedFiles];
                  });
                }}
              />
              📷
              <Typography sx={{ fontSize: 12 }}>Upload</Typography>
            </Box>

            {/* PREVIEWS */}
            {photos.map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: 130,
                  height: 130,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid #ddd",
                }}
              >
                {/* IMAGE */}
                <img
                  src={URL.createObjectURL(file)}
                  alt="upload"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* REMOVE BUTTON */}
                <Box
                  onClick={() => removePhoto(index)}
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: "#4f47e6", 
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    cursor: "pointer",
                    fontWeight: 700,

                    "&:hover": { 
                      backgroundColor: "#433fcf" 
                    },
                  }}
                >
                  ×
                </Box>
              </Box>
            ))}
          </Box>

          {/* QUANTITY */}
          <Typography sx={{ fontWeight: 600, mb: 1 }}>
            Quantity
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 4,
            }}
          >
            <Button
              variant="outlined"
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
              sx={{ 
                minWidth: 40, 
                color: "#4f47e6", 
                borderColor: "#4f47e6",

                "&:hover": {
                  borderColor: "#2019ea",
                  backgroundColor: "transparent",
                },
              }}
            >
              -
            </Button>

            <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
              {quantity}
            </Typography>

            <Button
              variant="outlined"
              onClick={() => setQuantity((q) => q + 1)}
              sx={{ 
                minWidth: 40, 
                color: "#4f47e6", 
                borderColor: "#4f47e6",

                "&:hover": {
                  borderColor: "#2019ea",
                  backgroundColor: "transparent",
                },
              }}
            >
              +
            </Button>
          </Box>

          {/* BUTTONS */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={back}
              startIcon={<ArrowBackIosIcon />}
              sx={{ color: "#4f47e6", }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              onClick={next}
              endIcon={<ArrowForwardIosIcon />}
              sx={{
                px: 4,
                py: 1.3,
                borderRadius: 999,
                fontWeight: 800,
                textTransform: "none",
                background: "linear-gradient(135deg, #5048e5, #6c63ff)",
                boxShadow: "0 10px 25px rgba(80,72,229,0.25)",
                "&.Mui-disabled": {
                  background: "#c5c6f5",
                  color: "#fff",
                },
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <Box>
          {/* HEADER */}
          <Typography sx={{ fontWeight: 800, fontSize: 24, mb: 0.5 }}>
            Location & Schedule
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 3 }}>
            Choose where and when you need the service
          </Typography>

          {/* LOCATION CARD */}
          <Box
            sx={{
              mb: 3,
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 2 }}>
              Location
            </Typography>

            <TextField
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <LocationOnIcon sx={{ mr: 1, color: "#5048e5" }} />
                  ),
                },
              }}
            />

            <Button
              startIcon={<MyLocationIcon />}
              onClick={handleUseCurrentLocation}
              disabled={loadingLocation}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 999,
                background: "rgba(80,72,229,0.08)",
                color: "#5048e5",
                "&:hover": {
                  background: "rgba(80,72,229,0.15)",
                },
              }}
            >
              {loadingLocation ? "Detecting..." : "Use current location"}
            </Button>
          </Box>

          {/* MAP CARD */}
          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              mb: 3,
            }}
          >
            <LocationMap
              value={coords}
              onChange={async (pos) => {
                setCoords(pos);
                const addr = await getAddress(pos.lat, pos.lng);
                setAddress(addr);
              }}
            />
          </Box>

          {/* DATE + TIME */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
              mb: 3,
            }}
          >
            {/* DATE CARD */}
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  mb: 0.5,
                }}
              >
                Select Date
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                  mb: 1.5,
                }}
              >
                Choose booking date
              </Typography>

              <Box
              sx={{
                width: "100%",
                textAlign: "center",

                  "& .react-datepicker": {
                      border: "none",
                      fontFamily: "inherit",
                      fontSize: 13,
                    },

                    "& .react-datepicker__header": {
                      background: "transparent",
                      borderBottom: "none",
                      paddingTop: 0,
                    },

                    "& .react-datepicker__current-month": {
                      fontSize: 14,
                      fontWeight: 700,
                    },

                    "& .react-datepicker__day-name": {
                      width: 30,
                      lineHeight: "30px",
                      fontSize: 11,
                    },

                    "& .react-datepicker__day": {
                      width: 30,
                      lineHeight: "30px",
                      margin: 1,
                      borderRadius: 8,
                      fontSize: 12,
                    },

                    "& .react-datepicker__day--selected": {
                      background: "#5048e5 !important",
                      color: "#fff",
                      fontWeight: 700,
                    },

                    "& .react-datepicker__day:hover": {
                      background: "rgba(80,72,229,0.08)",
                    },

                    "& .day-available": {
                      color: "#2e7d32",
                      fontWeight: 700,
                    },

                    "& .day-partial": {
                      color: "#ef6c00",
                      fontWeight: 700,
                    },

                    "& .day-full": {
                      color: "#c62828",
                      fontWeight: 700,
                      textDecoration: "line-through",
                    },
                "& .react-datepicker__month-container": {
                  float: "none",
                },
              }}
            >
                <DatePicker
                  selected={date ? new Date(date + "T00:00:00+08:00") : null}
                  onChange={(d: Date | null) => {
                    if (!d) return;

                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, "0");
                    const day = String(d.getDate()).padStart(2, "0");

                    setDate(`${year}-${month}-${day}`);
                    setTime("");
                  }}
                  inline
                  minDate={new Date()}
                  filterDate={isFutureDate}
                  dayClassName={(d) => `day-${getDayStatus(d)}`}
                />
              </Box>

              {/* LEGEND */}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: 1.5,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  label="Available"
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: 11,
                    bgcolor: "rgba(46,125,50,0.1)",
                    color: "#2e7d32",
                    fontWeight: 600,
                  }}
                />

                <Chip
                  label="Partial"
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: 11,
                    bgcolor: "rgba(239,108,0,0.1)",
                    color: "#ef6c00",
                    fontWeight: 600,
                  }}
                />

                <Chip
                  label="Full"
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: 11,
                    bgcolor: "rgba(198,40,40,0.1)",
                    color: "#c62828",
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Card>

            {/* TIME CARD */}
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  mb: 0.5,
                }}
              >
                Select Time
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                  mb: 2,
                }}
              >
                Choose preferred time
              </Typography>

              {/* TIME SLOTS */}
             <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 1,
                }}
              >
                {timeSlots.map((t) => {
                  const status = getTimeStatus(t);

                  const selected = time === t;
                  const disabled = status === "full";

                  return (
                    <Box
                      key={t}
                      onClick={() => {
                        if (disabled) return;

                        setTime(t);
                        setCustomTime("");
                      }}
                      sx={{
                        py: 1,
                        borderRadius: 2,
                        textAlign: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: disabled ? "not-allowed" : "pointer",

                        border: selected
                          ? "1px solid #5048e5"
                          : status === "available"
                          ? "1px solid rgba(46,125,50,0.4)"
                          : status === "partial"
                          ? "1px solid rgba(239,108,0,0.4)"
                          : "1px solid rgba(198,40,40,0.4)",

                        background: selected
                          ? "#5048e5"
                          : status === "available"
                          ? "rgba(46,125,50,0.08)"
                          : status === "partial"
                          ? "rgba(239,108,0,0.08)"
                          : "rgba(198,40,40,0.08)",

                        color: selected
                          ? "#fff"
                          : status === "available"
                          ? "#2e7d32"
                          : status === "partial"
                          ? "#ef6c00"
                          : "#c62828",

                        opacity: disabled ? 0.5 : 1,

                        transition: "0.2s",

                        "&:hover": {
                          background: disabled
                            ? undefined
                            : selected
                            ? "#433fcf"
                            : "rgba(80,72,229,0.06)",
                        },
                      }}
                    >
                      {t}
                    </Box>
                  );
                })}
              </Box>

              {/* CUSTOM TIME */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Or choose custom time
                </Typography>

                <TextField
                  type="time"
                  size="small"
                  fullWidth
                  value={customTime}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) return;

                    const [h, m] = value.split(":");
                    const hour = parseInt(h, 10);

                    const formatted =
                      `${String(hour % 12 || 12).padStart(2, "0")}:${m} ` +
                      `${hour >= 12 ? "PM" : "AM"}`;

                    // optional: prevent overwrite full slots
                    const isBlocked = Object.entries(availability?.[date] || {}).some(
                      ([slot, status]) => slot === formatted && status === "full"
                    );

                    if (isBlocked) return;

                    setCustomTime(value);
                    setTime(formatted);
                  }}
                />
              </Box>

              {/* LEGEND */}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: 2,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  label="Available"
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: 11,
                    bgcolor: "rgba(46,125,50,0.1)",
                    color: "#2e7d32",
                    fontWeight: 600,
                  }}
                />

                <Chip
                  label="Partial"
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: 11,
                    bgcolor: "rgba(239,108,0,0.1)",
                    color: "#ef6c00",
                    fontWeight: 600,
                  }}
                />

                <Chip
                  label="Full"
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: 11,
                    bgcolor: "rgba(198,40,40,0.1)",
                    color: "#c62828",
                    fontWeight: 600,
                  }}
                />
              </Stack>

              {/* SELECTED */}
              {(date || time) && (
                <Box
                  sx={{
                    mt: 2,
                    p: 1.5,
                    borderRadius: 2,
                    background: "rgba(80,72,229,0.05)",
                    border: "1px solid rgba(80,72,229,0.12)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: "text.secondary",
                      mb: 0.5,
                    }}
                  >
                    Selected Schedule
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#5048e5",
                    }}
                  >
                    {date || "No date"}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#5048e5",
                    }}
                  >
                    {time || "No time"}
                  </Typography>
                </Box>
              )}
            </Card>
          </Box>

          {/* ACTIONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Button
              onClick={back}
              startIcon={<ArrowBackIosIcon />}
              sx={{
                color: "#433fcf",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              onClick={next}
              disabled={!address || !date || !time}
              endIcon={<ArrowForwardIosIcon />}
              sx={{
                px: 4,
                py: 1.3,
                borderRadius: 999,
                fontWeight: 800,
                textTransform: "none",
                background: "linear-gradient(135deg, #5048e5, #6c63ff)",
                boxShadow: "0 10px 25px rgba(80,72,229,0.25)",
                "&.Mui-disabled": {
                  background: "#c5c6f5",
                  color: "#fff",
                },
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <Box>
          {/* HEADER */}
          <Typography sx={{ fontWeight: 800, fontSize: 24 }}>
            Payment Method
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 3 }}>
            Choose how you'd like to pay
          </Typography>

          {/* CARDS */}
          <Stack spacing={2}>
            {paymentOptions.map((option) => {
              const selected = paymentMethod === option.id;

              return (
                <Card
                  key={option.id}
                  onClick={() => setPaymentMethod(option.id)}
                  sx={(theme) => ({
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    borderRadius: 3,

                    position: "relative",
                    overflow: "hidden",

                    border: selected
                      ? "1px solid transparent"
                      : `1px solid ${theme.palette.divider}`,

                    background: selected
                      ? `linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper})
                        padding-box,
                        linear-gradient(135deg, #5048e5, #8b7dff) border-box`
                      : theme.palette.background.paper,

                    boxShadow: selected
                      ? theme.palette.mode === "dark"
                        ? "0 0 0 1px rgba(80,72,229,0.4), 0 10px 25px rgba(0,0,0,0.4)"
                        : "0 10px 25px rgba(80,72,229,0.15)"
                      : theme.palette.mode === "dark"
                        ? "0 2px 10px rgba(0,0,0,0.6)"
                        : "0 2px 10px rgba(0,0,0,0.04)",

                    transition: "all 0.25s ease",

                    "&:hover": {
                      transform: "translateY(-4px)",

                      boxShadow: theme.palette.mode === "dark"
                        ? "0 18px 45px rgba(0,0,0,0.65)"
                        : "0 16px 35px rgba(80,72,229,0.15)",

                      borderColor: theme.palette.mode === "dark"
                        ? "rgba(111,104,232,0.35)"
                        : "rgba(80,72,229,0.2)",
                    },
                  })}
                >
                  {/* LEFT SIDE */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {/* ICON WRAPPER */}
                    <Box
                      sx={(theme) => ({
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        background: selected
                          ? "rgba(80,72,229,0.15)"
                          : theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.04)",
                      })}
                    >
                      <Box
                        component="img"
                        src={option.icon}
                        alt={option.title}
                        sx={{ width: 28, height: 28 }}
                      />
                    </Box>

                    {/* TEXT */}
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: 15 }}>
                        {option.title}
                      </Typography>

                      <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                        {option.desc}
                      </Typography>
                    </Box>
                  </Box>

                  {/* RIGHT RADIO */}
                  <Radio
                    checked={selected}
                    value={option.id}
                    sx={{
                      color: "#5048e5",
                      "&.Mui-checked": {
                        color: "#5048e5",
                      },
                    }}
                  />
                </Card>
              );
            })}
          </Stack>

          {/* ACTIONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
            }}
          >
            <Button
              onClick={back}
              startIcon={<ArrowBackIosIcon />}
              sx={{ color: "#433fcf", textTransform: "none" }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              onClick={next}
              endIcon={<ArrowForwardIosIcon />}
              sx={{
                  px: 4,
                  py: 1.3,
                  borderRadius: 999,
                  fontWeight: 800,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #5048e5, #6c63ff)",
                  boxShadow: "0 10px 25px rgba(80,72,229,0.25)",
                  "&.Mui-disabled": {
                    background: "#c5c6f5",
                    color: "#fff",
                  },
                }}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <Box>
          {/* HEADER */}
          <Typography sx={{ fontWeight: 900, fontSize: 26 }}>
            Review & Confirm
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 3 }}>
            Double check your booking details before confirming
          </Typography>

          {/* MAIN CARD */}
          <Card
            sx={(theme) => ({
              p: 3,
              borderRadius: 4,
              bgcolor: theme.palette.background.paper,
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 12px 40px rgba(0,0,0,0.6)"
                  : "0 12px 40px rgba(0,0,0,0.08)",
            })}
          >
            {/* SERVICES */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
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

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {subServices.map((s) => (
                  <Box
                    key={s.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 0.5,
                    }}
                  >
                    <Typography sx={{ fontSize: 14 }}>{s.name}</Typography>
                    <Typography sx={{ fontWeight: 800 }}>
                      PHP {s.price}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2.5 }} />

            {/* SCHEDULE */}
            <Box>
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

              <Box
                sx={{
                  mt: 1,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(80,72,229,0.06)",
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                  {formatScheduleDate(date)}
                </Typography>

                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                  at {time}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2.5 }} />

            {/* LOCATION */}
            <Box>
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

              <Typography
                sx={{
                  mt: 1,
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "text.secondary",
                }}
              >
                {address}
              </Typography>
            </Box>

            <Divider sx={{ my: 2.5 }} />

            {/* PAYMENT */}
            <Box>
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

              <Box
                sx={{
                  mt: 1,
                  display: "inline-flex",
                  px: 2,
                  py: 0.8,
                  borderRadius: 999,
                  bgcolor: "rgba(80,72,229,0.08)",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {paymentOptions.find((p) => p.id === paymentMethod)?.title}
              </Box>
            </Box>

            <Divider sx={{ my: 2.5 }} />

            {/* TOTAL */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                Total
              </Typography>

              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: 18,
                  color: "#5048e5",
                }}
              >
                PHP {total * quantity}
              </Typography>
            </Box>

            {/* NOTES */}
            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="Add notes for the technician (optional)"
              sx={{
                mt: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
          </Card>

          {/* ACTIONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
            }}
          >
            <Button
              onClick={back}
              startIcon={<ArrowBackIosIcon />}
              sx={{ color: "#433fcf", textTransform: "none" }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              endIcon={<CheckIcon />}
              onClick={() => router.push(`/user/booking/my-bookings`)}
              sx={{
                px: 4,
                py: 1.3,
                borderRadius: 999,
                fontWeight: 800,
                textTransform: "none",
                background: "linear-gradient(135deg, #5048e5, #6c63ff)",
                boxShadow: "0 10px 25px rgba(80,72,229,0.25)",
                "&.Mui-disabled": {
                  background: "#c5c6f5",
                  color: "#fff",
                },
              }}
            >
              Confirm Booking
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}