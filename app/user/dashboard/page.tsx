"use client";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import { useRouter } from "next/navigation";
import OfferCard from "@/components/OfferCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const categories = [
  { name: "Plumbing", icon: "/icons/faucet.png" },
  { name: "Electrical", icon: "/icons/eco-house.png" },
  { name: "Airconditioning", icon: "/icons/air-conditioner.png" },
  { name: "Handyman", icon: "/icons/plumber.png" },
  { name: "Roof Repairs", icon: "/icons/roof.png" },
  { name: "Painting", icon: "/icons/renovation.png" },
  { name: "CCTV", icon: "/icons/cctv-camera.png" },
  { name: "Appliances and Furniture", icon: "/icons/electronics.png" },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <Box
      sx={(theme) => ({
        bgcolor: "background.default",
        minHeight: "80vh",
        transition: "all 0.3s ease",
      })}
    >
      <OfferCard />

      <Box sx={{ mt: 5, px: 3, mx: 5 }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            sx={(theme) => ({
              fontWeight: 800,
              color: "text.primary",
              letterSpacing: 0.5,
            })}
          >
            CATEGORIES
          </Typography>

          <Box
            onClick={() => router.push("/user/category")}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: "#4f47e6",
              fontWeight: 700,

              "&:hover": {
                opacity: 0.8,
              },
            })}
          >
            <Typography sx={{ fontSize: 14, mr: 0.5 }}>
              View All
            </Typography>

            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
          </Box>
        </Box>

        {/* GRID */}
        <Grid container spacing={2}>
          {categories.map((cat, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Card
                onClick={() =>
                  router.push(
                    `/user/booking?category=${cat.name.toLowerCase()}`
                  )
                }
                sx={(theme) => ({
                  borderRadius: 3,
                  textAlign: "center",
                  py: 3,
                  cursor: "pointer",
                  transition: "all 0.25s ease",

                  backgroundColor: theme.palette.background.paper,
                  border: "1px solid",
                  borderColor: theme.palette.divider,

                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 10px 30px rgba(0,0,0,0.5)"
                      : "0 6px 18px rgba(0,0,0,0.06)",

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
                <CardContent>
                  <Box
                    sx={(theme) => ({
                      width: 60,
                      height: 60,
                      margin: "0 auto",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1.5,

                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(80,72,229,0.15)"
                          : "#e8e8fa",
                    })}
                  >
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      style={{
                        width: 28,
                        height: 28,
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: "text.primary",
                    }}
                  >
                    {cat.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}