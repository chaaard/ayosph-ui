"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Link from "next/link";
import { useState } from "react";

const menu = [
  { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { text: "Booking", path: "/booking", icon: <BookIcon /> },
  { text: "Profile", path: "/profile", icon: <PersonIcon /> },
  { text: "Wallet", path: "/wallet", icon: <WalletIcon /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{ position: "fixed", top: 10, left: 10 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6">
            Booking App
          </Typography>

          <List>
            {menu.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton onClick={() => setOpen(false)}>
                  {item.icon}
                  <ListItemText sx={{ ml: 2 }} primary={item.text} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}