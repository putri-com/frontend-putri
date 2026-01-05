import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import QR_GOPAY from "../assets/img/QR GOPAY.jpg";
import QR_BCA from "../assets/img/QR BCA 1.jpg";
import QR_TIKET from "../assets/img/QR TIKET.jpg";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [userName, setUserName] = useState("");
  const [qty, setQty] = useState(1);
  const [ticketType, setTicketType] = useState("REGULER");
  const [paymentMethod, setPaymentMethod] = useState("GOPAY");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const prices = {
    REGULER: 150000,
    VIP: 300000,
    VVIP: 500000,
  };

  const total = prices[ticketType] * qty;

  const paymentInfo = {
    GOPAY: {
      text: "Scan QR atau transfer ke 0823-1957-7968",
      qr: QR_GOPAY,
    },
    BCA: {
      text: "Transfer ke BCA 818-062-8895 a.n Event Organizer",
      qr: QR_BCA,
    },
  };

  // 🔐 CEK LOGIN
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/login");
    } else {
      setUserName(user.name);
    }
  }, [navigate]);

  // ❗ CEK EVENT
  useEffect(() => {
    if (!state) navigate("/");
  }, [state, navigate]);

  if (!state) return null;

  const handleCheckout = () => {
    setStep(2);
    setLoading(true);

    setTimeout(() => {
      // SIMPAN RIWAYAT TRANSAKSI (PER USER)
      const user = JSON.parse(localStorage.getItem("user"));
      const historyKey = `transactions_${user.email}`;

      const oldHistory =
        JSON.parse(localStorage.getItem(historyKey)) || [];

      const newTransaction = {
        event: state.eventName,
        ticketType,
        qty,
        total,
        paymentMethod,
        time: new Date().toLocaleString("id-ID"),
      };

      localStorage.setItem(
        historyKey,
        JSON.stringify([...oldHistory, newTransaction])
      );

      setStep(3);
      setLoading(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">
              Checkout Tiket
            </h1>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p><b>Event:</b> {state.eventName}</p>
              <p><b>Nama:</b> {userName}</p>
            </div>

            <select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg mb-4"
            >
              <option value="REGULER">Reguler - Rp150.000</option>
              <option value="VIP">VIP - Rp300.000</option>
              <option value="VVIP">VVIP - Rp50.000.000</option>
            </select>

            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="w-full border px-4 py-3 rounded-lg mb-4"
            />

            <div className="bg-gray-100 p-4 rounded-lg mb-4 font-bold text-center">
              Total: Rp {total.toLocaleString()}
            </div>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg mb-6"
            >
              <option value="GOPAY">Gopay</option>
              <option value="BCA">BCA</option>
            </select>

            <button
              onClick={handleCheckout}
              className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700"
            >
              Bayar Sekarang
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">
              Informasi Pembayaran
            </h1>

            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <p className="font-semibold mb-2">{paymentMethod}</p>
              <p className="text-gray-600 mb-4">
                {paymentInfo[paymentMethod].text}
              </p>
              <img
                src={paymentInfo[paymentMethod].qr}
                alt="QR Payment"
                className="w-40 mx-auto mb-4"
              />
              <p className="text-gray-500">
                {loading && "Menunggu konfirmasi pembayaran..."}
              </p>
            </div>
          </>
        )}

        {/* STEP 3 — FINAL */}
        {step === 3 && (
          <>
            <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
              Pembayaran Berhasil
            </h1>

            <div className="bg-gray-50 p-6 rounded-xl text-center space-y-2 mb-6">
              <p className="font-semibold text-lg">{state.eventName}</p>
              <p>Nama: {userName}</p>
              <p>Tiket: {ticketType} x{qty}</p>
              <p className="font-bold">
                Total: Rp {total.toLocaleString()}
              </p>

              {/* QR TIKET — FIX, GA ILANG */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">
                  Tunjukkan QR ini saat masuk event
                </p>
                <img
                  src={QR_TIKET}
                  alt="QR Tiket"
                  className="mx-auto w-40 border rounded-lg shadow"
                />
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold"
            >
              Kembali ke Home
            </button>
          </>
        )}

      </div>
    </div>
  );
}
