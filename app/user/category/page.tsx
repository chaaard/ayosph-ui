"use client";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  Stack,
} from "@mui/material";

import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const categories = [
  { id: "plumbing", name: "Plumbing", icon: "/icons/faucet.png", isComingSoon: false },
  { id: "electrical", name: "Electrical", icon: "/icons/eco-house.png", isComingSoon: true },
  { id: "airconditioning", name: "Airconditioning", icon: "/icons/air-conditioner.png", isComingSoon: true },
  { id: "handyman", name: "Handyman", icon: "/icons/plumber.png", isComingSoon: false },
  { id: "roof-repairs", name: "Roof Repairs", icon: "/icons/roof.png", isComingSoon: true },
  { id: "painting", name: "Painting", icon: "/icons/renovation.png", isComingSoon: true },
  { id: "cctv", name: "CCTV", icon: "/icons/cctv-camera.png", isComingSoon: true },
  { id: "appliances-furniture", name: "Appliances & Furniture", icon: "/icons/electronics.png", isComingSoon: false },
];

export default function CategoriesPage() {
  const router = useRouter();

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
        sx={{ mb: 2 }}
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

        <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
          Categories
        </Typography>
      </Breadcrumbs>

      {/* HEADER */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <img src="/icons/customer-service.png" style={{ width: 28, height: 28 }} />

        <Typography sx={{ fontSize: 28, fontWeight: 800 }}>
          Categories
        </Typography>
      </Stack>

      <Typography sx={{ color: "text.secondary", mb: 2 }}>
        Choose a service category
      </Typography>

      {/* GRID */}
      <Grid container spacing={2}>
        {categories.map((cat) => {
          const isComingSoon = cat.isComingSoon;

          return (
            <Grid size={{ xs: 6, md: 3 }} key={cat.id}>
              <Card
                onClick={() => {
                  if (isComingSoon) return;

                  router.push(`/user/booking?category=${cat.id}`);
                }}
                sx={(theme) => ({
                  position: "relative",
                  borderRadius: 3,
                  textAlign: "center",
                  py: 3,
                  cursor: isComingSoon ? "not-allowed" : "pointer",
                  opacity: isComingSoon ? 0.6 : 1,
                  backgroundColor: theme.palette.background.paper,
                  border: "1px solid",
                  borderColor: theme.palette.divider,

                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 10px 30px rgba(0,0,0,0.5)"
                      : "0 6px 18px rgba(0,0,0,0.06)",

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
                <CardContent>
                  {/* ICON BOX (same as dashboard style) */}
                  <Box
                    sx={(theme) => ({
                      width: 65,
                      height: 65,
                      mx: "auto",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1.5,

                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(80,72,229,0.10)",
                    })}
                  >
                    <img src={cat.icon} alt={cat.name} style={{ width: 30, height: 30 }} />
                  </Box>

                  <Typography sx={{ fontWeight: 700, fontSize: 14, color: "text.primary" }}>
                    {cat.name}
                  </Typography>
                </CardContent>

                {/* COMING SOON BADGE */}
                {isComingSoon && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      px: 1,
                      py: 0.3,
                      fontSize: 10,
                      fontWeight: 800,
                      borderRadius: 2,
                      bgcolor: "text.primary",
                      color: "background.paper",
                    }}
                  >
                    Coming Soon
                  </Box>
                )}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}