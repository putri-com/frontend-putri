import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [openProfile, setOpenProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="font-extrabold text-2xl tracking-wide hover:text-purple-400 transition"
        >
          TicketApp
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-4 relative">

          {/* RIWAYAT */}
          {token && (
            <Link
              to="/riwayat"
              className="px-4 py-2 rounded-lg border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition font-medium"
            >
              Riwayat Transaksi
            </Link>
          )}

          {/* PROFILE */}
          {!token ? (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-medium"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{user?.name}</span>
              </button>

              {/* DROPDOWN */}
              {openProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    className="block px-4 py-3 hover:bg-gray-100 transition"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
