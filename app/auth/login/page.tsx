"use client";

import { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError(true);
      setMessage("Please fill in all fields");
      return;
    }

    setError(false);
    setMessage("Welcome back!");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background:
          "linear-gradient(120deg, #0f172a 0%, #1e293b 40%, #f8fafc 100%)",
      }}
    >
      {/* LEFT BRAND PANEL */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          p: 6,
          position: "relative",
          background:
            "radial-gradient(circle at top left, rgba(37,99,235,0.45), transparent 55%)",
        }}
      >
        {/* glow effect */}
        <Box
          sx={{
            position: "absolute",
            width: 320,
            height: 320,
            background: "rgba(37,99,235,0.25)",
            filter: "blur(90px)",
            top: "15%",
            left: "20%",
            zIndex: 0,
          }}
        />

        <Stack spacing={2} sx={{ alignItems: "center", zIndex: 1 }}>
          <Image
            src="/images/login-logo.png"
            alt="AyosPH Logo"
            width={160}
            height={50}
          />

          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            AyosPH Services
          </Typography>

          <Typography
            variant="body1"
            sx={{
              opacity: 0.85,
              textAlign: "center",
              maxWidth: 320,
              fontSize: 14,
            }}
          >
            Book trusted home services instantly. Plumbing, cleaning,
            electrical, aircon repair and more.
          </Typography>
        </Stack>
      </Box>

      {/* RIGHT LOGIN PANEL */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: 4,
            backdropFilter: "blur(16px)",
            backgroundColor: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 25px 70px rgba(0,0,0,0.25)",
            transition: "all 0.25s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
            },
          }}
        >
          {/* HEADER */}
          <Stack spacing={0.5} sx={{ alignItems: "center", mb: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.5px",
              }}
            >
              Welcome back
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: 13,
              }}
            >
              Sign in to your AyosPH account
            </Typography>
          </Stack>

          {/* FORM */}
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 4px 14px rgba(37,99,235,0.15)",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 4px 14px rgba(37,99,235,0.15)",
                  },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => {
                router.push("/user/dashboard");
              }}
              //onClick={handleLogin}
              sx={{
                py: 1.4,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 800,
                fontSize: 15,
                background: "linear-gradient(135deg, #1E5EFF, #1d4ed8)",
                boxShadow: "0 12px 25px rgba(30, 94, 255, 0.35)",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 16px 30px rgba(30, 94, 255, 0.45)",
                },
              }}
            >
              Login
            </Button>

            <Stack spacing={1} sx={{ alignItems: "center" }}>
              <Link
                href="/auth/register"
                style={{
                  fontSize: 14,
                  textDecoration: "none",
                  color: "#1E5EFF",
                  fontWeight: 500,
                }}
              >
                Create account
              </Link>

              <Typography variant="caption" color="text.secondary">
                Secure booking platform
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Box>

      {/* SNACKBAR */}
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={2500}
        onClose={() => setMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={error ? "error" : "success"} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}