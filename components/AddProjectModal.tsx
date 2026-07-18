"use client";

import {
  useState,
  ChangeEvent,
} from "react";


interface Props {

  open:boolean;

  onClose:()=>void;

  onSuccess:()=>void;

}



export default function AddProjectModal({
  open,
  onClose,
  onSuccess,
}:Props){


  const user =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem("user") || "{}"
        )
      : null;



  const [title,setTitle] =
    useState("");

  const [description,setDescription] =
    useState("");

  const [github,setGithub] =
    useState("");

  const [demo,setDemo] =
    useState("");

  const [techStack,setTechStack] =
    useState("");

  const [status,setStatus] =
    useState("Progress");


  const [image,setImage] =
    useState<File | null>(null);


  const [preview,setPreview] =
    useState("");



  const [loading,setLoading] =
    useState(false);





  if(!open) return null;





  const handleImage = (
    e:ChangeEvent<HTMLInputElement>
  )=>{


    const file =
      e.target.files?.[0];


    if(file){

      setImage(file);


      setPreview(
        URL.createObjectURL(file)
      );

    }

  };







  const uploadImage = async()=>{


    if(!image) return "";



    const formData =
      new FormData();


    formData.append(
      "file",
      image
    );



    const res =
      await fetch(
        "/api/upload/project",
        {
          method:"POST",
          body:formData,
        }
      );



    const data =
      await res.json();



    return data.image;

  };







  const submitProject =
    async()=>{


      try{


        setLoading(true);



        let imagePath="";



        if(image){

          imagePath =
            await uploadImage();

        }





        const formData =
          new FormData();



        formData.append(
          "userId",
          String(user.id)
        );


        formData.append(
          "title",
          title
        );


        formData.append(
          "description",
          description
        );


        formData.append(
          "github",
          github
        );


        formData.append(
          "demo",
          demo
        );


        formData.append(
          "image",
          imagePath
        );


        formData.append(
          "tech_stack",
          techStack
        );


        formData.append(
          "status",
          status
        );





        const res =
          await fetch(
            "/api/project",
            {
              method:"POST",
              body:formData,
            }
          );



        if(res.ok){


          onSuccess();


          reset();


        }else{


          alert(
            "Gagal menambahkan project"
          );

        }



      }catch(error){


        console.log(error);


        alert(
          "Terjadi kesalahan"
        );


      }finally{


        setLoading(false);


      }


    };







  const reset=()=>{


    setTitle("");

    setDescription("");

    setGithub("");

    setDemo("");

    setTechStack("");

    setStatus("Progress");

    setImage(null);

    setPreview("");

  };







return (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">


<div className="bg-white rounded-3xl w-full max-w-xl p-8">


<h2 className="text-2xl font-bold mb-6">
Tambah Project
</h2>



<div className="space-y-4">



<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder="Judul Project"
className="w-full border rounded-xl px-4 py-3"
/>



<textarea
value={description}
onChange={(e)=>setDescription(e.target.value)}
placeholder="Deskripsi Project"
className="w-full border rounded-xl px-4 py-3"
/>



<input
value={github}
onChange={(e)=>setGithub(e.target.value)}
placeholder="Link Github"
className="w-full border rounded-xl px-4 py-3"
/>




<input
value={demo}
onChange={(e)=>setDemo(e.target.value)}
placeholder="Link Demo"
className="w-full border rounded-xl px-4 py-3"
/>





<input
value={techStack}
onChange={(e)=>setTechStack(e.target.value)}
placeholder="Tech Stack (contoh: Next.js, MySQL)"
className="w-full border rounded-xl px-4 py-3"
/>





<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
className="w-full border rounded-xl px-4 py-3"
>

<option>
Progress
</option>

<option>
Selesai
</option>

</select>





<div>

  <label className="block font-medium mb-2">
    Gambar Project
  </label>


  <label
    htmlFor="projectImage"
    className="
      inline-block
      bg-blue-600
      text-white
      px-5
      py-2
      rounded-xl
      cursor-pointer
      hover:bg-blue-700
      transition
    "
  >
    Pilih Gambar
  </label>


  <input
    id="projectImage"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={handleImage}
  />


  {image && (

    <p className="text-sm text-gray-500 mt-2">
      File dipilih: {image.name}
    </p>

  )}


</div>





{preview && (

<img
src={preview}
className="w-full h-40 object-cover rounded-xl"
/>

)}



</div>





<div className="flex gap-3 mt-8">


<button
onClick={()=>{
reset();
onClose();
}}
className="flex-1 bg-gray-200 py-3 rounded-xl"
>
Batal
</button>




<button
disabled={loading}
onClick={submitProject}
className="flex-1 bg-blue-700 text-white py-3 rounded-xl"
>

{
loading
?
"Menyimpan..."
:
"Simpan"
}

</button>


</div>




</div>


</div>

);


}