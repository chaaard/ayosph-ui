import ThemeContextProvider from "@/context/ThemeContext";
import { Poppins } from "next/font/google";
import { CssBaseline } from "@mui/material";
import "leaflet/dist/leaflet.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeContextProvider>
          <CssBaseline />
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}