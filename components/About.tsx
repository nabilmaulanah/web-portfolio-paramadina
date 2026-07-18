export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            About Paramadina Portfolio
          </h2>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Paramadina Portfolio merupakan platform yang dirancang untuk
            membantu mahasiswa membangun portofolio digital secara profesional.
            Mahasiswa dapat menampilkan proyek, keterampilan, sertifikat,
            pengalaman, serta pencapaian akademik dalam satu halaman yang mudah
            diakses oleh dosen maupun recruiter.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              🎯 Tujuan
            </h3>

            <p className="text-gray-600">
              Membantu mahasiswa memiliki portofolio online yang menarik,
              profesional, dan mudah dibagikan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              🚀 Fitur
            </h3>

            <p className="text-gray-600">
              Menampilkan Project, Skills, Certificate, Experience, serta
              informasi profil mahasiswa dalam satu website.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              🌐 Manfaat
            </h3>

            <p className="text-gray-600">
              Memudahkan perusahaan maupun dosen melihat kompetensi mahasiswa
              melalui satu tautan portofolio digital.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}