import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
    }
  }, [token, user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold mb-4">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {user.name}
        </h1>
        <p className="text-gray-500 mb-6">{user.email}</p>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/riwayat")}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Riwayat Transaksi
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Kembali ke Home
          </button>
        </div>

      </div>
    </div>
  );
}
