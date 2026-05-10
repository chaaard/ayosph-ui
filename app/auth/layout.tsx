import "leaflet/dist/leaflet.css";
import "react-datepicker/dist/react-datepicker.css";
import "../globals.css";
import Topbar from "@/components/Topbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}