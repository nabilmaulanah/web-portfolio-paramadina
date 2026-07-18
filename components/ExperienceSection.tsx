"use client";

import { useEffect, useState } from "react";
import AddExperienceModal from "./AddExperienceModal";
import EditExperienceModal from "./EditExperienceModal";

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const getExperiences = async () => {
    if (!user.id) return;

    const res = await fetch(
      `/api/experience?userId=${user.id}`
    );

    const data = await res.json();

    setExperiences(data);
  };

  useEffect(() => {
    getExperiences();
  }, []);

  const deleteExperience = async (id: number) => {
    if (!confirm("Yakin ingin menghapus experience ini?")) return;

    await fetch(`/api/experience/${id}`, {
      method: "DELETE",
    });

    getExperiences();
  };

  const formatPeriod = (
    startDate: string,
    endDate: string
  ) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      year: "numeric",
    };

    const start = new Date(startDate).toLocaleDateString(
      "id-ID",
      options
    );

    const end = endDate
      ? new Date(endDate).toLocaleDateString(
          "id-ID",
          options
        )
      : "Sekarang";

    return `${start} - ${end}`;
  };

  return (
    <>
      <section
        id="experience"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <div className="flex justify-between items-center mb-12">

          <div>

            <h2 className="text-4xl font-bold">
              Experience
            </h2>

            <p className="text-gray-500 mt-2">
              Pengalaman organisasi, magang,
              pekerjaan, dan kepanitiaan.
            </p>

          </div>

          <button
            onClick={() => setAddOpen(true)}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition"
          >
            + Tambah Experience
          </button>

        </div>

        <div className="relative border-l-4 border-blue-700 pl-10 space-y-10">

          {experiences.map((item) => (

            <div
              key={item.id}
              className="relative bg-white rounded-3xl shadow-lg p-8"
            >

              <div className="absolute -left-14 top-8 w-8 h-8 rounded-full bg-blue-700 border-4 border-white"></div>

              <h3 className="text-2xl font-bold">
                {item.jabatan}
              </h3>

              <p className="text-blue-700 font-semibold mt-2">
                {item.organisasi}
              </p>

              <p className="text-gray-500 mt-1">
                {formatPeriod(
                  item.startDate,
                  item.endDate
                )}
              </p>

              <p className="mt-5 text-gray-600 leading-7">
                {item.description}
              </p>

              <div className="flex gap-3 mt-8">

                <button
                  onClick={() => {
                    setSelected(item);
                    setEditOpen(true);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteExperience(item.id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
                >
                  Hapus
                </button>

              </div>

            </div>

          ))}

                  </div>

      </section>

      <AddExperienceModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={() => {
          setAddOpen(false);
          getExperiences();
        }}
      />

      <EditExperienceModal
        open={editOpen}
        experience={selected}
        onClose={() => setEditOpen(false)}
        onSuccess={() => {
          setEditOpen(false);
          getExperiences();
        }}
      />
    </>
  );
}