import { Link } from "react-router-dom";
import Footer from "../components/Footer";

import Bestie1 from "../assets/img/bestie 1.jpg";
import Konser1 from "../assets/img/KONSER 1.jpg";
import Konser2 from "../assets/img/KONSER 2.jpg";

export default function Home() {
  const events = [
    { 
      id: 1, 
      name: "Konser Musik Bestie Val", 
      date: "23 Desember 2025", 
      image: Bestie1,
      location: "Grage Mall Cirebon" 
    },
    { 
      id: 2, 
      name: "Konser Suara Malam", 
      date: "3 Januari 2025", 
      image: Konser1,
      location: "Alun-Alun Kota Bandung" 
    },
    { 
      id: 3, 
      name: "Konser Musik Satu Nada, Sejuta Cerita", 
      date: "30 Desember 2025", 
      image: Konser2,
      location: "Mall Central Park Jakarta" 
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* HERO */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Temukan Event Favoritmu
          </h2>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Platform pembelian tiket konser dan event terpercaya
          </p>
        </div>
      </section>

      {/* EVENT LIST */}
      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-10 text-center">
            Event Populer
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-52 object-cover rounded-t-xl"
                />

                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">
                    {event.name}
                  </h4>
                  <p className="text-sm text-gray-500">{event.location}</p>
                  <p className="text-sm text-gray-500 mb-4">{event.date}</p>

                  <div className="flex gap-3">
                    <Link
                      to="/checkout"
                      state={{ 
                        eventName: event.name,
                        eventDate: event.date,
                        eventImage: event.image 
                      }}
                      className="flex-1 text-center bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition"
                    >
                      Beli Tiket
                    </Link>

                    <Link
                      to={`/event/${event.id}`}
                      state={{ event }}
                      className="flex-1 text-center border border-purple-600 text-purple-600 py-2 rounded-md font-medium hover:bg-purple-50 transition"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
