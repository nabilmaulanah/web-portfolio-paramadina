"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PortfolioUser {
  id: string;
  nama: string;
  nim: string;
  prodi: string;
  angkatan: number;
  foto: string | null;
  bio: string | null;

  // TAMBAHAN
  visibility: string;
}

export default function PortfolioPage() {

  const [users, setUsers] = useState<PortfolioUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPortfolio();
  }, []);

  async function getPortfolio() {
    try {

      const res = await fetch("/api/portfolio");

      const data = await res.json();

      setUsers(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold text-center mb-3">
        Portfolio Mahasiswa
      </h1>

      <p className="text-center text-gray-500 mb-10">
        Universitas Paramadina
      </p>

      {users.length === 0 ? (

        <div className="text-center text-gray-500">
          Belum ada portfolio.
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {users.map((user) => (

            <div
              key={user.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >

              <div className="flex justify-center pt-8">

                <Image
                  src={user.foto || "/default-user.png"}
                  alt={user.nama}
                  width={120}
                  height={120}
                  className="rounded-full object-cover w-32 h-32 border"
                />

              </div>

              <div className="p-6 text-center">

                <h2 className="text-xl font-bold">
                  {user.nama}
                </h2>

                <p className="text-gray-500 mt-2">
                  {user.prodi}
                </p>

                <p className="text-gray-500">
                  Angkatan {user.angkatan}
                </p>

                {/* STATUS */}

                <div className="mt-3">

                  {user.visibility === "Private" ? (

                    <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      🔒 Private
                    </span>

                  ) : (

                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      🌍 Public
                    </span>

                  )}

                </div>

                <p className="text-gray-600 mt-4 line-clamp-3">
                  {user.bio || "Belum memiliki bio."}
                </p>

                {user.visibility === "Private" ? (

                  <button
                    disabled
                    className="
                      inline-block
                      mt-6
                      w-full
                      bg-gray-400
                      text-white
                      px-5
                      py-2
                      rounded-lg
                      cursor-not-allowed
                    "
                  >
                    🔒 Portfolio Private
                  </button>

                ) : (

                  <Link
                    href={`/portfolio/${user.id}`}
                    className="
                      inline-block
                      mt-6
                      w-full
                      bg-blue-700
                      hover:bg-blue-800
                      text-white
                      px-5
                      py-2
                      rounded-lg
                      transition
                    "
                  >
                    Lihat Portfolio
                  </Link>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}