// src/components/Footer.jsx
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* About */}
        <div className="mb-8">
          <h4 className="text-white font-bold text-lg mb-4">TiketEvent</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            TiketEvent adalah platform terpercaya untuk membeli tiket konser, festival, dan event-event terbaru. Transaksi aman, cepat, dan mudah.
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Hubungi Kami</h4>
          <div className="flex justify-center space-x-6 text-3xl">
            <a href="https://www.instagram.com/onlyy.this_?igsh=aXZ5Y2dvenVsNzFl" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="https://wa.me/082319577968" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">
              <FaWhatsapp />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © 2025 TiketEvent. All rights reserved.
      </div>
    </footer>
  );
}
