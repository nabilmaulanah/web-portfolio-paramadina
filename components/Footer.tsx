"use client";

import { useState } from "react";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Semua field wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengirim pesan.");
      }

      alert("Pesan berhasil dikirim.");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengirim pesan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* CONTACT SECTION */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">

          {/* FORM */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Contact Me
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-blue-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-blue-500"
              />

              <textarea
                rows={4}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-600 text-white py-3 rounded-lg transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

          {/* INFO */}
          <div className="flex flex-col justify-center space-y-6">

            <div>
              <h3 className="text-xl font-semibold text-white">
                Email
              </h3>

              <p className="text-gray-400">
                youremail@example.com
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">
                Location
              </h3>

              <p className="text-gray-400">
                Indonesia
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">
                Social
              </h3>

              <p className="text-gray-400">
                LinkedIn | GitHub | Instagram
              </p>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">

          <p>
            © {new Date().getFullYear()} Paramadina Portfolio. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#feature" className="hover:text-white">Feature</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>

        </div>

      </div>
    </footer>
  );
}