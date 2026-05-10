import "leaflet/dist/leaflet.css";
import "react-datepicker/dist/react-datepicker.css";
import "../globals.css";
import Topbar from "@/components/Topbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
}