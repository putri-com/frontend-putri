import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        setError("Akun belum terdaftar. Silakan register dulu.");
        setLoading(false);
        return;
      }

      if (email !== storedUser.email || password !== storedUser.password) {
        setError("Email atau password salah!");
        setLoading(false);
        return;
      }

      // ✅ LOGIN BERHASIL
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("user", JSON.stringify(storedUser));

      navigate("/");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT */}
        <div className="bg-gradient-to-br from-purple-700 to-indigo-600 flex flex-col justify-center items-center p-10 text-white">
          <h1 className="text-4xl font-extrabold mb-2">TicketApp</h1>
          <p className="text-purple-100 text-center">
            Login untuk beli tiket event favoritmu
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Login Akun
          </h2>

          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition flex justify-center items-center"
            >
              {loading && (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
              )}
              {loading ? "Memproses..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-purple-600 font-semibold hover:underline"
            >
              Register dulu
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
