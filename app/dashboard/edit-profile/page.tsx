"use client";

import { useEffect, useState } from "react";

export default function EditProfilePage() {

  const [userId, setUserId] =
    useState<number>();

  const [bio, setBio] =
    useState("");

  const [alamat, setAlamat] =
    useState("");

  const [no_hp, setNoHp] =
    useState("");

  const [foto, setFoto] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("/default-user.png");


  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user.id) return;

    setUserId(user.id);

    loadProfile(user.id);

  }, []);



  async function loadProfile(id: number) {

    const res = await fetch(
      `/api/profile?userId=${id}`
    );

    const data = await res.json();

    if (!data) return;


    setBio(data.bio || "");

    setAlamat(data.alamat || "");

    setNoHp(data.no_hp || "");


    if (data.foto) {

      setPreview(data.foto);

    }

  }



  async function handleSubmit(e: any) {

    e.preventDefault();


    const formData =
      new FormData();


    formData.append(
      "userId",
      String(userId)
    );


    formData.append(
      "bio",
      bio
    );


    formData.append(
      "alamat",
      alamat
    );


    formData.append(
      "no_hp",
      no_hp
    );


    if (foto) {

      formData.append(
        "foto",
        foto
      );

    }



    const res =
      await fetch(
        "/api/profile",
        {
          method: "POST",
          body: formData
        }
      );


    const data =
      await res.json();



    if (data.success) {

      alert(
        "Profile berhasil diperbarui"
      );


      loadProfile(userId!);

      setFoto(null);

    }

  }



  return (

    <div className="min-h-screen bg-gray-100 p-10">


      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">


        <h1 className="text-3xl font-bold mb-6">

          Edit Profile

        </h1>



        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >



          {/* FOTO PROFILE */}

          <div>


            <img
              src={preview}
              alt="Preview Profile"
              className="w-32 h-32 rounded-full object-cover border mb-4"
            />



            <label className="block font-medium mb-2">

              Foto Profile

            </label>



            <label
              htmlFor="foto"
              className="
                inline-block
                bg-blue-600
                text-white
                px-5
                py-2
                rounded-lg
                cursor-pointer
                hover:bg-blue-700
                transition
              "
            >

              Pilih Foto

            </label>



            <input

              id="foto"

              type="file"

              accept="image/*"

              className="hidden"

              onChange={(e) => {


                const file =
                  e.target.files?.[0];


                if (!file) return;



                setFoto(file);



                setPreview(
                  URL.createObjectURL(file)
                );


              }}

            />



            {foto && (

              <p className="text-sm text-gray-500 mt-2">

                File dipilih: {foto.name}

              </p>

            )}



          </div>





          {/* BIO */}

          <div>


            <label className="block font-medium mb-2">

              Bio

            </label>



            <textarea

              rows={5}

              value={bio}

              onChange={(e) =>
                setBio(e.target.value)
              }

              className="
                border
                w-full
                p-3
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />


          </div>





          {/* ALAMAT */}

          <div>


            <label className="block font-medium mb-2">

              Alamat

            </label>



            <input

              value={alamat}

              onChange={(e) =>
                setAlamat(e.target.value)
              }

              className="
                border
                w-full
                p-3
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />


          </div>





          {/* NO HP */}

          <div>


            <label className="block font-medium mb-2">

              No HP

            </label>



            <input

              value={no_hp}

              onChange={(e) =>
                setNoHp(e.target.value)
              }

              className="
                border
                w-full
                p-3
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "

            />


          </div>





          <button

            type="submit"

            className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-lg
              hover:bg-blue-700
              transition
            "

          >

            Simpan Profile

          </button>



        </form>


      </div>


    </div>

  );

}