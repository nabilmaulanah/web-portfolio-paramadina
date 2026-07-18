import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <div className="text-center lg:text-left">

          <p className="text-blue-700 font-semibold uppercase tracking-wider mb-3">
            Universitas Paramadina
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Bangun
            <span className="text-blue-700"> Portofolio Digital </span>
            Profesional
          </h1>

          <p className="text-gray-600 mt-6 text-lg leading-relaxed">
            Tampilkan pengalaman organisasi, proyek, prestasi,
            sertifikat, dan keterampilan dalam satu website yang
            profesional dan mudah dibagikan kepada dosen maupun
            recruiter.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">

            <Link href="/login">
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-7 py-3 rounded-xl transition duration-300">
                Mulai Sekarang
              </button>
            </Link>

            <Link href="/portfolio">
              <button className="border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-7 py-3 rounded-xl transition duration-300">
                Lihat Portfolio
              </button>
            </Link>

          </div>

        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/upm logo.jpg"
            alt="Hero Image"
            width={400}
            height={400}
            priority
            className="w-full max-w-lg h-auto"
          />
        </div>

      </div>
    </section>
  );
}