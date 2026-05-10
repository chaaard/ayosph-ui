"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Divider,
  Avatar,
  IconButton,
  InputAdornment,
  Card,
  Button,
  Breadcrumbs,
  Link,
  useTheme,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Contact = {
  id: string;
  name: string;
  lastMessage: string;
};

type Message = {
  id: string;
  fromMe: boolean;
  text: string;
};

const CONTACTS: Contact[] = [
  { id: "1", name: "John Doe", lastMessage: "Thanks for your service!" },
  { id: "2", name: "Maria Santos", lastMessage: "When is the schedule?" },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "m1", fromMe: false, text: "Hi, I need help with plumbing" },
    { id: "m2", fromMe: true, text: "Sure, we can assist you." },
    { id: "m3", fromMe: false, text: "Thanks for your service!" },
  ],
  "2": [
    { id: "m1", fromMe: false, text: "Hi, I need help with electrical" },
    { id: "m2", fromMe: true, text: "Sure, we can assist you." },
    { id: "m3", fromMe: false, text: "When is the schedule?" },
  ],
};

export default function Page() {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const messages = selected ? INITIAL_MESSAGES[selected] || [] : [];

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
      <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize: 14 }} />} sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => router.push("/user/dashboard")}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: 13 }}
        >
          <HomeIcon sx={{ fontSize: 16, mr: 0.4 }} />
          Home
        </Link>

        <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
          Messages
        </Typography>
      </Breadcrumbs>

      {/* HEADER */}
      <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: "center" }}>
        <img src="/icons/chat-box.png" style={{ width: 28, height: 28 }} />
        <Typography sx={{ fontSize: 26, fontWeight: 900 }}>
          Messages
        </Typography>
      </Stack>

      {/* MAIN CONTAINER */}
      <Paper
        elevation={0}
        sx={{
          height: "70vh",
          borderRadius: 4,
          display: "flex",
          overflow: "hidden",
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.divider,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 10px 30px rgba(0,0,0,0.5)"
              : "0 6px 18px rrgba(121, 97, 97, 0.5)",
        }}
      >
        {/* LEFT PANEL */}
        <Box
          sx={{
            width: "35%",
            borderRight: isDark
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* SEARCH */}
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              placeholder="Search conversations..."
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 999,
                  background: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Divider />

          {/* CONTACT LIST */}
          <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
            {CONTACTS.length === 0 ? (
              <Typography sx={{ textAlign: "center", mt: 3, color: "text.secondary" }}>
                No conversation yet
              </Typography>
            ) : (
              CONTACTS.map((c) => (
                <Card
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  sx={{
                    p: 1.5,
                    mb: 1,
                    cursor: "pointer",
                    borderRadius: 3,
                    boxShadow: "none",
                    background:
                      selected === c.id
                        ? isDark
                          ? "rgba(111,104,232,0.15)"
                          : "rgba(80,72,229,0.08)"
                        : "transparent",

                    "&:hover": {
                      background: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    <Avatar>{c.name[0]}</Avatar>

                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: 14 }}>
                        {c.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                        {c.lastMessage}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              ))
            )}
          </Box>
        </Box>

        {/* RIGHT PANEL */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {!selected ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src="/icons/speech-bubble.png"
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "contain",
                    display: "block",
                  }}
                />

                <Typography sx={{ fontWeight: 900, mt: 2 }}>
                  Select a conversation
                </Typography>

                <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                  Choose from your contacts to start chatting
                </Typography>
              </Box>
            </Box>
          ) : (
            <>
              {/* CHAT AREA */}
              <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
                {messages.map((m) => (
                  <Box
                    key={m.id}
                    sx={{
                      display: "flex",
                      justifyContent: m.fromMe ? "flex-end" : "flex-start",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        maxWidth: "60%",
                        fontSize: 14,

                        background: m.fromMe
                          ? "#5048e5"
                          : isDark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.06)",

                        color: m.fromMe
                          ? "#fff"
                          : isDark
                          ? "#fff"
                          : "text.primary",
                      }}
                    >
                      {m.text}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* INPUT */}
              <Box
                sx={{
                  p: 2,
                  borderTop: isDark
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 999,
                        background: isDark
                          ? "rgba(255,255,255,0.05)"
                          : "transparent",
                      },
                    }}
                  />

                  <IconButton
                    sx={{
                      background: "#5048e5",
                      color: "#fff",
                      "&:hover": { background: "#433fcf" },
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Stack>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}