import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function EventDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openInfo, setOpenInfo] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  // 🔐 SAFE FALLBACK
  const event = location.state?.event || {
    name: "Konser Musik Spektakuler 2025",
    date: "20 Desember 2025",
    time: "19.00 WIB",
    location: "Grage Mall Cirebon",
    description:
      "Konser musik berskala nasional dengan penampilan artis papan atas dan produksi panggung spektakuler.",
    image: "https://picsum.photos/1200/600?random=10",
  };

  return (
    <div className="min-h-screen bg-gray-100 py-14 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* IMAGE HEADER */}
        <div className="relative">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-72 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              {event.name}
            </h1>
            <p className="text-sm md:text-base opacity-90">
              📅 {event.date} • ⏰ {event.time}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8 md:p-10">

          {/* EVENT INFO */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-sm text-gray-500 mb-1">Lokasi</p>
              <p className="font-semibold text-gray-800">
                📍 {event.location}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() =>
              navigate("/checkout", {
                state: {
                  eventName: event.name,
                  eventDate: event.date,
                  eventImage: event.image,
                },
              })
            }
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl text-lg font-semibold transition mb-10"
          >
            Beli Tiket Sekarang
          </button>

          {/* ACCORDION */}
          <div className="space-y-4 border-t pt-6">

            {/* INFO TAMBAHAN */}
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenInfo(!openInfo)}
                className="w-full flex justify-between items-center px-6 py-4 font-medium text-gray-800"
              >
                Informasi Tambahan
                <span
                  className={`transition-transform ${
                    openInfo ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {openInfo && (
                <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                  Tiket yang telah dibeli tidak dapat dikembalikan atau
                  dipindahtangankan. E-ticket akan tersedia setelah pembayaran
                  berhasil diverifikasi.
                </div>
              )}
            </div>

            {/* CONTACT */}
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenContact(!openContact)}
                className="w-full flex justify-between items-center px-6 py-4 font-medium text-gray-800"
              >
                Hubungi Penyelenggara
                <span
                  className={`transition-transform ${
                    openContact ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {openContact && (
                <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                  Email:{" "}
                  <a
                    href="mailto:support@tiketevent.com"
                    className="text-purple-600 underline"
                  >
                    support@tiketevent.com
                  </a>
                  <br />
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline"
                  >
                    0812-3456-7890
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
