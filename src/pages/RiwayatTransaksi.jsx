import { useEffect, useState } from "react";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const key = `transactions_${user.email}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setTransactions(data.reverse());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Riwayat Transaksi
        </h1>

        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center">
            Belum ada transaksi
          </p>
        ) : (
          <div className="space-y-4">
            {transactions.map((trx) => (
              <div
                key={trx.id}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <p className="font-semibold text-gray-800">
                  {trx.eventName}
                </p>
                <p className="text-sm text-gray-600">
                  Tiket: {trx.ticketType} x{trx.qty}
                </p>
                <p className="text-sm text-gray-600">
                  Total: Rp {trx.total.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  📅 {trx.date} • ⏰ {trx.time}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
