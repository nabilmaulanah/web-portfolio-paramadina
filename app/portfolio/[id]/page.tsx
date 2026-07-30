"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Portfolio {
  id: number;
  nama: string;
  nim: string;
  prodi: string;
  angkatan: number;

  profile: {
    foto: string | null;
    bio: string | null;
    alamat: string | null;
    no_hp: string | null;
  } | null;

  skill: any[];
  project: any[];
  certificate: any[];
  experience: any[];
}

export default function PortfolioDetailPage() {

  const params = useParams();

  const id = params.id;

  const [data, setData] =
    useState<Portfolio | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [isPrivate, setIsPrivate] =
    useState(false);

  useEffect(() => {

    getPortfolio();

  }, []);

  async function getPortfolio() {

    try {

      const res = await fetch(
        `/api/portfolio/${id}`
      );

      const result = await res.json();

      if (result.private) {

        setIsPrivate(true);

        return;

      }

      setData(result);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div className="h-screen flex justify-center items-center text-xl">

        Loading...

      </div>

    );

  }

  if (isPrivate) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg">

          <div className="text-7xl mb-5">
            🔒
          </div>

          <h1 className="text-3xl font-bold">
            Portfolio Private
          </h1>

          <p className="text-gray-600 mt-5 leading-8">
            Portfolio ini bersifat <b>Private</b>.
            <br />
            Pemilik portfolio tidak mengizinkan
            portfolio ini untuk dilihat oleh publik.
          </p>

        </div>

      </div>

    );

  }

  if (!data) {

    return (

      <div className="h-screen flex justify-center items-center text-xl">

        Portfolio tidak ditemukan.

      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto py-12 px-6">

      {/* ===========================
          PROFILE
      ============================ */}

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <Image
            src={data.profile?.foto || "/default-user.png"}
            alt={data.nama}
            width={180}
            height={180}
            className="rounded-full object-cover border w-44 h-44"
          />

          <div className="flex-1">

            <h1 className="text-4xl font-bold">
              {data.nama}
            </h1>

            <p className="text-gray-500 mt-2">
              {data.prodi}
            </p>

            <p className="text-gray-500">
              Angkatan {data.angkatan}
            </p>

            <p className="text-gray-500">
              NIM : {data.nim}
            </p>

            <div className="mt-6">

              <h2 className="text-xl font-semibold mb-2">
                Tentang Saya
              </h2>

              <p className="text-gray-700 leading-7">
                {data.profile?.bio || "Belum memiliki bio."}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ===========================
          INFORMASI
      ============================ */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Informasi
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Nama</strong><br />
              {data.nama}
            </p>

            <p>
              <strong>NIM</strong><br />
              {data.nim}
            </p>

            <p>
              <strong>Program Studi</strong><br />
              {data.prodi}
            </p>

            <p>
              <strong>Angkatan</strong><br />
              {data.angkatan}
            </p>

          </div>

        </div>

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Kontak
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Alamat</strong><br />
              {data.profile?.alamat || "-"}
            </p>

            <p>
              <strong>No HP</strong><br />
              {data.profile?.no_hp || "-"}
            </p>

          </div>

        </div>

      </div>

      {/* ===========================
          SKILL
      ============================ */}

      <div className="bg-white shadow rounded-xl p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-6">
          Skill
        </h2>

        {data.skill.length === 0 ? (

          <p className="text-gray-500">
            Belum ada skill.
          </p>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            {data.skill.map((skill: any) => (

              <div
                key={skill.id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >

                <p className="text-sm text-blue-700 font-semibold">
                  {skill.category}
                </p>

                <h3 className="font-bold text-lg mt-2">
                  {skill.nama_skill}
                </h3>

                <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {skill.level_skill || "-"}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ===========================
          EXPERIENCE
      ============================ */}

      <div className="bg-white shadow rounded-xl p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-6">
          Pengalaman Organisasi
        </h2>

        {data.experience.length === 0 ? (

          <p className="text-gray-500">
            Belum ada pengalaman organisasi.
          </p>

        ) : (

          <div className="space-y-6">

            {data.experience.map((exp: any) => (

              <div
                key={exp.id}
                className="border-l-4 border-blue-700 pl-5"
              >

                <h3 className="text-xl font-bold">
                  {exp.jabatan}
                </h3>

                <p className="text-blue-700 font-medium mt-1">
                  {exp.organisasi}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {new Date(exp.startDate).toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}
                  {" - "}
                  {exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString("id-ID", {
                        month: "long",
                        year: "numeric",
                      })
                    : "Sekarang"}
                </p>

                <p className="mt-4 text-gray-700 leading-7">
                  {exp.description || "-"}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ===========================
          PROJECT
      ============================ */}

      <div className="bg-white shadow rounded-xl p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-6">
          Project
        </h2>

        {data.project.length === 0 ? (

          <p className="text-gray-500">
            Belum ada project.
          </p>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {data.project.map((project: any) => (

              <div
                key={project.id}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition"
              >

                <Image
                  src={project.image || "/default-project.png"}
                  alt={project.title}
                  width={600}
                  height={300}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <h3 className="text-xl font-bold">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mt-3 leading-7">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">

                    {project.tech_stack
                      ?.split(",")
                      .map((tech: string, index: number) => (

                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tech.trim()}
                        </span>

                      ))}

                  </div>

                  <div className="mt-6 flex gap-3">

                    {project.github && (

                      <a
                        href={project.github}
                        target="_blank"
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg"
                      >
                        Github
                      </a>

                    )}

                    {project.demo && (

                      <a
                        href={project.demo}
                        target="_blank"
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Live Demo
                      </a>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ===========================
          CERTIFICATE
      ============================ */}

      <div className="bg-white shadow rounded-xl p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-6">
          Sertifikat
        </h2>

        {data.certificate.length === 0 ? (

          <p className="text-gray-500">
            Belum ada sertifikat.
          </p>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {data.certificate.map((certificate: any) => (

              <div
                key={certificate.id}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition"
              >

                <Image
                  src={certificate.image || "/default-certificate.jpg"}
                  alt={certificate.title}
                  width={500}
                  height={350}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <h3 className="font-bold text-lg">
                    {certificate.title}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {certificate.issuer}
                  </p>

                  <span className="inline-block mt-4 bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
                    {certificate.year}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}