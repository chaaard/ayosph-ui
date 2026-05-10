"use client";

import {
  Box,
  Typography,
  Card,
  Avatar,
  Stack,
  TextField,
  IconButton,
  Divider,
  Button,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export default function ProfilePage() {
  return (
    <Box 
      sx={{ 
        p: 4, 
        maxWidth: 900, 
        mx: "auto",
        mt: 1, 
        px: 3, 
        bgcolor: "background.default",
      }}
    >
      {/* HEADER */}
      <Typography sx={{ fontSize: 30, fontWeight: 900 }}>
        My Profile
      </Typography>

      <Typography sx={{ color: "text.secondary", mb: 3 }}>
        Manage your personal information
      </Typography>

      {/* PROFILE HEADER CARD */}
      <Card
        sx={{
          p: 3,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          gap: 3,
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* AVATAR */}
        <Box sx={{ position: "relative" }}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              fontSize: 28,
              fontWeight: 800,
              background: "linear-gradient(135deg, #5048e5, #6c63ff)",
              cursor: "pointer",
            }}
          >
            JP
          </Avatar>

          <IconButton
            size="small"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* INFO */}
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 900 }}>
            Josel Pambid
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            jpambid.ayosph@gmail.com
          </Typography>
        </Box>
      </Card>

      {/* CONTACT INFORMATION */}
      <Card sx={cardStyle}>
        <SectionHeader
          icon={<PhoneOutlinedIcon />}
          title="Contact Information"
        />

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
            Phone Number
          </Typography>

          <TextField
            fullWidth
            placeholder="Add phone number"
            size="small"
          />
        </Stack>
      </Card>

      {/* EMERGENCY CONTACT */}
      <Card sx={cardStyle}>
        <SectionHeader
          icon={<ContactEmergencyOutlinedIcon />}
          title="Emergency Contact"
        />

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Field label="Contact Name" />
          <Field label="Contact Phone Number" />
          <Field label="Address" />
        </Stack>
      </Card>

      {/* SAVED ADDRESSES */}
      <Card sx={cardStyle}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <SectionHeader
            icon={<LocationOnOutlinedIcon />}
            title="Saved Addresses"
          />

          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            sx={{ textTransform: "none", fontWeight: 800 }}
          >
            Add
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* EMPTY STATE */}
        <Box
          sx={{
            textAlign: "center",
            py: 4,
            color: "text.secondary",
          }}
        >
          No saved addresses
        </Box>

        {/* SAMPLE ADDRESS (optional UI preview) */}
        <Card
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "rgba(80,72,229,0.05)",
          }}
        >
          <Typography sx={{ fontWeight: 800 }}>
            Home Address
          </Typography>
          <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
            Quezon City, Metro Manila
          </Typography>
        </Card>
      </Card>

      {/* ACTIONS */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 4, justifyContent: "space-between" }}
      >
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          sx={primaryBtn}
        >
          Save Changes
        </Button>

        <Button
          startIcon={<LogoutIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 800,
            color: "#d32f2f",
          }}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
}

/* ---------------- HELPERS ---------------- */

function SectionHeader({ icon, title }: any) {
  return (
    <Stack direction="row" spacing={1} sx={{alignItems: "center"}} >
      <Box sx={{ color: "#5048e5" }}>{icon}</Box>
      <Typography sx={{ fontWeight: 900 }}>{title}</Typography>
    </Stack>
  );
}

function Field({ label }: { label: string }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 0.5 }}>
        {label}
      </Typography>

      <TextField fullWidth size="small" placeholder={label} />
    </Box>
  );
}

/* ---------------- STYLES ---------------- */

const cardStyle = {
  mt: 3,
  p: 3,
  borderRadius: 4,
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const primaryBtn = {
  textTransform: "none",
  fontWeight: 800,
  px: 4,
  py: 1.2,
  borderRadius: 999,
  background: "linear-gradient(135deg, #5048e5, #6c63ff)",
  boxShadow: "0 10px 25px rgba(80,72,229,0.25)",
};