"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      // simpan session sementara (nanti kita upgrade ke Auth.js)
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } else {
      alert(data.message || "Login gagal");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center px-5">

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          Selamat Datang
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login ke akun Anda
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label>Email</label>

            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full mt-2 border rounded-xl p-3"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full mt-2 border rounded-xl p-3"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div className="flex justify-between items-center text-sm">

            <label className="flex gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <Link href="/forgot-password" className="text-blue-700 hover:underline">
              Lupa Password?
            </Link>

          </div>

          <button className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800">
            Login
          </button>

        </form>

        <p className="text-center mt-6">
          Belum punya akun?
          <Link href="/register" className="text-blue-700 ml-2 hover:underline">
            Daftar
          </Link>
        </p>

      </div>

    </main>
  );
}