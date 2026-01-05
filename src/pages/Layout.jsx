import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // pastikan path sesuai
import Footer from "../components/Footer"; // opsional

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet /> {/* Halaman spesifik muncul di sini */}
      </main>
    </div>
  );
}
