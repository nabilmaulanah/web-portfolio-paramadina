"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddExperienceModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [jabatan, setJabatan] = useState("");
  const [organisasi, setOrganisasi] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const addExperience = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const res = await fetch("/api/experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          jabatan,
          organisasi,
          description,
          startDate,
          endDate,
        }),
      });

      if (res.ok) {
        setJabatan("");
        setOrganisasi("");
        setDescription("");
        setStartDate("");
        setEndDate("");

        onSuccess();
      } else {
        alert("Gagal menambahkan experience");
      }
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-xl w[500px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Tambah Experience
        </h2>

        <label className="block mb-2 font-medium">
          Jabatan
        </label>

        <input
          value={jabatan}
          onChange={(e) => setJabatan(e.target.value)}
          placeholder="Frontend Developer"
          className="w-full border rounded-xl px-4 py-3 mb-4"
        />

        <label className="block mb-2 font-medium">
          Organisasi / Perusahaan
        </label>

        <input
          value={organisasi}
          onChange={(e) => setOrganisasi(e.target.value)}
          placeholder="PT Teknologi Indonesia"
          className="w-full border rounded-xl px-4 py-3 mb-4"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">

          <div>

            <label className="block mb-2 font-medium">
              Tanggal Mulai
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Tanggal Selesai
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

        </div>

        <label className="block mb-2 font-medium">
          Deskripsi
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          placeholder="Tuliskan deskripsi pengalaman..."
          className="w-full border rounded-xl px-4 py-3 mb-6"
        />

        <div className="flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 py-3 rounded-xl"
          >
            Batal
          </button>

          <button
            onClick={addExperience}
            disabled={loading}
            className="flex-1 bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>

        </div>

      </div>
    </div>
  );
}