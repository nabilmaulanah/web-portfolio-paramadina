"use client";

import {
  useEffect,
  useState,
  ChangeEvent,
} from "react";


interface Project {

  id:number;

  title:string;

  description:string;

  github:string;

  demo:string;

  image:string;

  tech_stack:string;

  status:string;

}



interface Props {

  open:boolean;

  project:Project | null;

  onClose:()=>void;

  onSuccess:()=>void;

}



export default function EditProjectModal({

  open,

  project,

  onClose,

  onSuccess,

}:Props){



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






  useEffect(()=>{


    if(project){


      setTitle(project.title);

      setDescription(
        project.description || ""
      );

      setGithub(
        project.github || ""
      );

      setDemo(
        project.demo || ""
      );


      setTechStack(
        project.tech_stack || ""
      );


      setStatus(
        project.status || "Progress"
      );


      setPreview(
        project.image || ""
      );


    }


  },[project]);







  if(!open || !project)
    return null;








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


    if(!image)
      return project.image;



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









  const updateProject =
    async()=>{


      try{


        setLoading(true);



        const imagePath =
          await uploadImage();




        const formData =
          new FormData();



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
            `/api/project/${project.id}`,
            {

              method:"PUT",

              body:formData,

            }
          );




        if(res.ok){


          onSuccess();


        }else{


          alert(
            "Gagal update project"
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








return (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">


<div className="bg-white rounded-3xl w-full max-w-xl p-8">


<h2 className="text-2xl font-bold mb-6">
Edit Project
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

placeholder="Deskripsi"

className="w-full border rounded-xl px-4 py-3"

/>





<input

value={github}

onChange={(e)=>setGithub(e.target.value)}

placeholder="Github"

className="w-full border rounded-xl px-4 py-3"

/>





<input

value={demo}

onChange={(e)=>setDemo(e.target.value)}

placeholder="Demo"

className="w-full border rounded-xl px-4 py-3"

/>





<input

value={techStack}

onChange={(e)=>setTechStack(e.target.value)}

placeholder="Tech Stack"

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






<input

type="file"

accept="image/*"

onChange={handleImage}

/>





{
preview && (

<img

src={preview}

className="w-full h-40 object-cover rounded-xl"

/>

)
}





</div>







<div className="flex gap-3 mt-8">


<button

onClick={onClose}

className="flex-1 bg-gray-200 py-3 rounded-xl"

>

Batal

</button>




<button

disabled={loading}

onClick={updateProject}

className="flex-1 bg-blue-700 text-white py-3 rounded-xl"

>


{
loading
?
"Menyimpan..."
:
"Simpan Perubahan"
}


</button>



</div>





</div>


</div>

);


}