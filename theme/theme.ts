import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: "#1976d2",
      },

      background: {
        default: mode === "light" ? "#f7f8fa" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },

      text: {
        primary: mode === "light" ? "#000" : "#ffffff",
        secondary: mode === "light" ? "#666" : "#aaa",
      },
    },

    shape: {
      borderRadius: 12,
    },

    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });