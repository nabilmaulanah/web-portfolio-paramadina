"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


interface DashboardData {

  id: number;
  nama: string;
  email: string;
  nim: string;
  prodi: string;
  angkatan: number;

  profile?: {
    foto: string;
    bio: string;
    alamat: string;
    no_hp: string;
  } | null;

  _count: {
    project: number;
    skill: number;
    certificate: number;
    experience: number;
  };

}



export default function DashboardHero() {


  const [data, setData] = useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);



  const loadDashboard = async () => {


    try {


      const userStorage = localStorage.getItem("user");


      if (!userStorage) {

        setLoading(false);
        return;

      }



      const user = JSON.parse(userStorage);



      const res = await fetch(
        `/api/dashboard?userId=${user.id}`
      );



      if (!res.ok) {

        throw new Error(
          "Gagal mengambil data dashboard"
        );

      }



      const result = await res.json();



      setData(result);



    } catch (error) {


      console.log(error);


    } finally {


      setLoading(false);


    }


  };




  useEffect(() => {

    loadDashboard();

  }, []);





  if (loading) {


    return (

      <section
        id="hero"
        className="max-w-7xl mx-auto px-6 py-20"
      >

        <h2 className="text-center text-xl font-semibold">
          Memuat data...
        </h2>


      </section>

    );


  }





  if (!data) {


    return (

      <section
        id="hero"
        className="max-w-7xl mx-auto px-6 py-20"
      >

        <h2 className="text-center text-xl font-semibold">
          Data dashboard tidak ditemukan.
        </h2>


      </section>

    );


  }





  return (

    <section
      id="hero"
      className="max-w-7xl mx-auto px-6 py-16 lg:py-24"
    >


      <div className="grid lg:grid-cols-2 gap-16 items-center">



        {/* INFORMASI USER */}

        <div>


          <p className="text-blue-700 font-semibold mb-3">
            Selamat Datang
          </p>



          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">

            {data.nama}

          </h1>




          <p className="text-xl text-blue-700 mt-3 font-medium">

            Mahasiswa Universitas Paramadina

          </p>





          <p className="mt-6 text-gray-600 text-lg leading-8">

            {data.profile?.bio ??
              "Belum ada deskripsi profil"}

          </p>






          <div className="mt-6 space-y-2 text-gray-600">


            <p>
              <strong>NIM :</strong> {data.nim}
            </p>


            <p>
              <strong>Program Studi :</strong> {data.prodi}
            </p>


            <p>
              <strong>Angkatan :</strong> {data.angkatan}
            </p>



            {
              data.profile?.alamat &&

              <p>
                <strong>Alamat :</strong> {data.profile.alamat}
              </p>
            }




            {
              data.profile?.no_hp &&

              <p>
                <strong>No HP :</strong> {data.profile.no_hp}
              </p>

            }


          </div>






          <div className="flex flex-wrap gap-4 mt-8">


            <a
              href="#project"
              className="bg-blue-700 hover:bg-blue-800 text-white px-7 py-3 rounded-xl transition"
            >

              Lihat Portofolio

            </a>





            <Link

              href="/dashboard/edit-profile"

              className="border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-7 py-3 rounded-xl transition"

            >

              Edit Profil

            </Link>



          </div>




        </div>








        {/* FOTO PROFILE */}


        <div className="flex justify-center">


          <div className="bg-white shadow-xl rounded-3xl p-5">


            <img

              src={
                data.profile?.foto ??
                "/default-user.png"
              }

              alt="Profile"

              className="w[350px] h[350px] object-cover rounded-3xl"

            />


          </div>


        </div>




      </div>







      {/* STATISTIK */}


      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">



        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <h2 className="text-4xl font-bold text-blue-700">

            {data._count.project}

          </h2>

          <p className="mt-2 text-gray-600">
            Project
          </p>

        </div>






        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <h2 className="text-4xl font-bold text-blue-700">

            {data._count.skill}

          </h2>

          <p className="mt-2 text-gray-600">
            Skill
          </p>

        </div>






        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <h2 className="text-4xl font-bold text-blue-700">

            {data._count.certificate}

          </h2>

          <p className="mt-2 text-gray-600">
            Certificate
          </p>

        </div>






        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <h2 className="text-4xl font-bold text-blue-700">

            {data._count.experience}

          </h2>

          <p className="mt-2 text-gray-600">
            Experience
          </p>

        </div>




      </div>






    </section>

  );


}