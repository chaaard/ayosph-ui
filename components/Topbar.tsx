"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  Paper,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";

import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

import Image from "next/image";

import { useThemeMode } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const { toggleMode } = useThemeMode();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        px: 2,
        backgroundColor: "background.paper",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LEFT: Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <Image
              src="/images/login-logo.png"
              onClick={() => router.push("/user/dashboard")}
              alt="AyosPH Logo"
              width={90}
              height={30}
            />
          </Box>
        </Box>

        {/* CENTER: Search */}
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 0.5,
            width: "40%",
            borderRadius: 999,
            backgroundColor: "background.default",
            border: "1px solid",
            borderColor: "divider",
          }}
          elevation={0}
        >
          <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />

          <InputBase
            placeholder="Search services..."
            fullWidth
            sx={{ fontSize: 14 }}
          />
        </Paper>

        {/* RIGHT: Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          
        {/* Notification */}
        <IconButton
          sx={{
            width: 42,
            height: 42,
            backgroundColor: "background.paper",
            transition: "all 0.2s ease",

            "&:hover": {
              backgroundColor: "action.hover",
              transform: "scale(1.05)",
            },
          }}
        >
          <Badge
            badgeContent={3}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#5048e5",
                color: "#fff",
              },
            }}
          >
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>

          {/* User Menu */}
          <IconButton
            onClick={handleOpenMenu}
            sx={{
              ml: 1,
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: "2px solid",
              borderColor: "#5048e5",
              transition: "all 0.2s ease",

              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "rgba(80,72,229,0.08)",
                borderColor: "#433fcf",
              },
            }}
          >
            <PermIdentityOutlinedIcon
              sx={{
                fontSize: 22,
                color: "#5048e5",
              }}
            />
          </IconButton>

          {/* Dark Mode */}
          <IconButton
            onClick={toggleMode}
            sx={{
              width: 42,
              height: 42,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <DarkModeIcon />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  mt: 1.5,
                  minWidth: 260,
                  borderRadius: 4,
                  overflow: "visible",
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
                  p: 1,
                },
              },
            }}
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
          >
            
            {/* User Info */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Avatar
                sx={{
                  width: 45,
                  height: 45,
                  background:
                    "linear-gradient(135deg, #6f68e8 0%, #8f88ff 100%)",
                }}
              >
                JP
              </Avatar>

              <Box>
                <Typography 
                  sx={{
                    fontWeight: 700,
                    fontSize: 14
                  }}
                >
                  Josel Pambid
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Profile */}
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                router.push("/user/profile");
              }}
              sx={{
                borderRadius: 3,
                py: 1.2,
              }}
            >
              <ListItemIcon>
                <Person2OutlinedIcon fontSize="small" />
              </ListItemIcon>

              <ListItemText primary="Profile" />
            </MenuItem>

            {/* Messages */}
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                router.push("/user/message");
              }}
              sx={{
                borderRadius: 3,
                py: 1.2,
              }}
            >
              <ListItemIcon>
                <MessageOutlinedIcon fontSize="small" />
              </ListItemIcon>

              <ListItemText primary="Messages" />
            </MenuItem>

            {/* Bookings */}
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                router.push("/user/booking/my-bookings");
              }}
              sx={{
                borderRadius: 3,
                py: 1.2,
              }}
            >
              <ListItemIcon>
                <CalendarMonthOutlinedIcon fontSize="small" />
              </ListItemIcon>

              <ListItemText primary="My Bookings" />
            </MenuItem>

            <Divider sx={{ my: 1.5 }} />

            {/* Logout Button */}
            <Box sx={{ px: 1 }}>
              <Button
                fullWidth
                onClick={() => {
                  handleCloseMenu();
                  router.push("/auth/login");
                }}
                variant="contained"
                startIcon={<LogoutRoundedIcon />}
                sx={{
                  borderRadius: 3,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "none",
                  background: "linear-gradient(135deg, #5048e5, #6c63ff)",
                }}
              >
                Logout
              </Button>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}