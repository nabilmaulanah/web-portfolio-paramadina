const features = [
  {
    title: "Project",
    icon: "💻",
    desc: "Tampilkan seluruh proyek akademik maupun pribadi secara profesional."
  },
  {
    title: "Skill",
    icon: "🚀",
    desc: "Perlihatkan kemampuan teknis dan non-teknis yang dimiliki."
  },
  {
    title: "Certificate",
    icon: "🏆",
    desc: "Simpan sertifikat pelatihan, seminar, maupun kompetisi."
  },
  {
    title: "Experience",
    icon: "👨‍💼",
    desc: "Tampilkan pengalaman organisasi, magang, dan pekerjaan."
  },
  {
    title: "CV Generator",
    icon: "📄",
    desc: "Buat Curriculum Vitae profesional secara otomatis berdasarkan data portofolio."
  },
  {
    title: "Generate SKPI",
    icon: "📑",
    desc: "Ajukan dan unduh Surat Keterangan Pendamping Ijazah (SKPI) secara digital."
  }
];

export default function Feature() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-blue-700 font-semibold uppercase tracking-wider">
            Fitur
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            Fitur Utama
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Semua kebutuhan mahasiswa untuk membangun portofolio digital
            tersedia dalam satu platform yang modern, lengkap, dan mudah
            digunakan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-6xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}