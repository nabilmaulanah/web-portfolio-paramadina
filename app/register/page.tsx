"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
    nim: "",
    prodi: "",
    angkatan: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password tidak sama!");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Register berhasil");
      router.push("/login");
    } else {
      alert(data.message || "Register gagal");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center px-5 py-10">

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          Daftar Akun
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Buat akun baru
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input name="nama" onChange={handleChange} type="text" placeholder="Nama Lengkap" className="w-full border rounded-xl p-3" />

          <input name="nim" onChange={handleChange} type="text" placeholder="NIM" className="w-full border rounded-xl p-3" />

          <input name="prodi" onChange={handleChange} type="text" placeholder="Program Studi" className="w-full border rounded-xl p-3" />

          <input name="angkatan" onChange={handleChange} type="number" placeholder="Angkatan" className="w-full border rounded-xl p-3" />

          <input name="email" onChange={handleChange} type="email" placeholder="Email" className="w-full border rounded-xl p-3" />

          <input name="password" onChange={handleChange} type="password" placeholder="Password" className="w-full border rounded-xl p-3" />

          <input name="confirmPassword" onChange={handleChange} type="password" placeholder="Konfirmasi Password" className="w-full border rounded-xl p-3" />

          <button className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800">
            Daftar
          </button>

        </form>

        <p className="text-center mt-6">
          Sudah punya akun?
          <Link href="/login" className="text-blue-700 ml-2 hover:underline">
            Login
          </Link>
        </p>

      </div>

    </main>
  );
}