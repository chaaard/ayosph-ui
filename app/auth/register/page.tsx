"use client";

import { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError(true);
      setMessage("Please fill in all fields");
      return;
    }

    setError(false);
    setMessage("Account created successfully!");
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

        <Stack 
          spacing={2} 
          sx={{
            alignItems: "center"
          }}
        >
          <Image
            src="/images/login-logo.png"
            alt="AyosPH Logo"
            width={160}
            height={50}
          />

          <Typography 
            variant="h4" 
            sx={{
              fontWeight: 800
            }}
          >
            Join AyosPH
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
            Create your account and start booking trusted home services instantly.
          </Typography>
        </Stack>
      </Box>

      {/* RIGHT FORM */}
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
            },
          }}
        >
          {/* HEADER */}
          <Stack spacing={0.5} sx={{ alignItems: "center", mb: 3 }}>
            <Typography 
              variant="h5" 
              sx={{
                fontWeight: 800
              }}
            >
              Create Account
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Start your AyosPH journey
            </Typography>
          </Stack>

          {/* FORM */}
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#fff",
                },
              }}
            />

            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#fff",
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
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleRegister}
              sx={{
                py: 1.4,
                borderRadius: 2,
                fontWeight: 800,
                textTransform: "none",
                background: "linear-gradient(135deg, #1E5EFF, #1d4ed8)",
                boxShadow: "0 12px 25px rgba(30, 94, 255, 0.35)",
                "&:hover": {
                  transform: "translateY(-1px)",
                },
              }}
            >
              Create Account
            </Button>

            <Stack
              sx={{
                alignItems: "center"
              }}
            >
              <Link
                href="/auth/login"
                style={{
                  fontSize: 14,
                  textDecoration: "none",
                  color: "#1E5EFF",
                  fontWeight: 500,
                }}
              >
                Back to login
              </Link>
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