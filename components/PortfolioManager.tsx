"use client";

import {
  FolderOpen,
  Code2,
  Award,
  Briefcase,
  FileText,
  FileCheck,
} from "lucide-react";

export default function PortfolioManager() {
  return (
    <section id="PortofolioManager" className="bg-gray-100 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold">
            Kelola Portofolio
          </h2>

          <p className="text-gray-500 mt-3">
            Tambahkan dan kelola data portofolio Anda.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">

          {/* PROJECT */}
          <a
            href="#project"
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-10 block text-center"
          >
            <FolderOpen
              size={55}
              className="mx-auto text-blue-700"
            />

            <h3 className="font-bold text-2xl mt-5">
              Project
            </h3>

            <p className="text-gray-500 mt-3">
              Tambahkan project baru.
            </p>
          </a>

          {/* SKILL */}
          <a
            href="#skill"
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-10 block text-center"
          >
            <Code2
              size={55}
              className="mx-auto text-green-600"
            />

            <h3 className="font-bold text-2xl mt-5">
              Skill
            </h3>

            <p className="text-gray-500 mt-3">
              Tambahkan skill baru.
            </p>
          </a>

          {/* CERTIFICATE */}
          <a
            href="#certificate"
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-10 block text-center"
          >
            <Award
              size={55}
              className="mx-auto text-yellow-500"
            />

            <h3 className="font-bold text-2xl mt-5">
              Certificate
            </h3>

            <p className="text-gray-500 mt-3">
              Tambahkan sertifikat.
            </p>
          </a>

          {/* EXPERIENCE */}
          <a
            href="#experience"
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-10 block text-center"
          >
            <Briefcase
              size={55}
              className="mx-auto text-purple-600"
            />

            <h3 className="font-bold text-2xl mt-5">
              Experience
            </h3>

            <p className="text-gray-500 mt-3">
              Tambahkan pengalaman.
            </p>
          </a>

          {/* CV */}
          <a
            href="/cv"
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-10 block text-center"
          >
            <FileText
              size={55}
              className="mx-auto text-red-600"
            />

            <h3 className="font-bold text-2xl mt-5">
              Buat CV
            </h3>

            <p className="text-gray-500 mt-3">
              Buat CV profesional otomatis.
            </p>
          </a>

          {/* SKPI */}
          <a
            href="/skpi"
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-10 block text-center"
          >
            <FileCheck
              size={55}
              className="mx-auto text-indigo-600"
            />

            <h3 className="font-bold text-2xl mt-5">
              Generate SKPI
            </h3>

            <p className="text-gray-500 mt-3">
              Generate Surat Keterangan Pendamping Ijazah.
            </p>
          </a>

        </div>

      </div>

    </section>
  );
}