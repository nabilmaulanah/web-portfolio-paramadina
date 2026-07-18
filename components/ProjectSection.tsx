"use client";

import { useEffect, useState } from "react";

import AddProjectModal from "./AddProjectModal";
import EditProjectModal from "./EditProjectModal";


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



export default function ProjectSection(){


  const [projects,setProjects] =
    useState<Project[]>([]);


  const [loading,setLoading] =
    useState(true);



  const [addOpen,setAddOpen] =
    useState(false);



  const [editOpen,setEditOpen] =
    useState(false);



  const [selectedProject,setSelectedProject] =
    useState<Project | null>(null);





  const user =
    typeof window !== "undefined"
    ?
    JSON.parse(
      localStorage.getItem("user") || "{}"
    )
    :
    null;







  const loadProjects =
    async()=>{


      try{


        setLoading(true);



        const res =
          await fetch(
            `/api/project?userId=${user.id}`
          );



        const data =
          await res.json();



        setProjects(data);



      }catch(error){


        console.log(error);



      }finally{


        setLoading(false);


      }


    };







  useEffect(()=>{


    if(user?.id){

      loadProjects();

    }


  },[]);







  const deleteProject =
    async(id:number)=>{


      const confirmDelete =
        confirm(
          "Yakin ingin menghapus project ini?"
        );


      if(!confirmDelete)
        return;





      const res =
        await fetch(
          `/api/project/${id}`,
          {
            method:"DELETE",
          }
        );





      if(res.ok){

        loadProjects();

      }else{

        alert(
          "Gagal menghapus project"
        );

      }


    };








return (

<>


<section
id="project"
className="max-w-7xl mx-auto px-6 py-20"
>


<div className="flex justify-between items-center mb-10">


<div>

<h2 className="text-4xl font-bold">
Project Saya
</h2>


<p className="text-gray-500 mt-2">
Seluruh project yang pernah dikerjakan.
</p>


</div>





<button

onClick={()=>setAddOpen(true)}

className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800"

>

+ Tambah Project

</button>



</div>







{
loading && (

<div className="text-center py-20">

Memuat Project...

</div>

)
}









{
!loading && projects.length===0 && (

<div className="bg-white rounded-3xl shadow p-10 text-center">

<h3 className="text-xl font-semibold">

Belum ada Project

</h3>


<p className="text-gray-500 mt-2">

Klik tombol Tambah Project untuk membuat portfolio pertama.

</p>


</div>

)
}









<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">


{

projects.map((project)=>(



<div

key={project.id}

className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"

>



<img

src={
project.image ||
"/default-project.png"
}

alt={project.title}

className="w-full h-52 object-cover"

/>





<div className="p-6">





<div className="flex justify-between items-center">


<h3 className="text-2xl font-bold">

{project.title}

</h3>



<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">

{project.status}

</span>



</div>








<p className="text-gray-500 mt-4">

{project.description}

</p>








<div className="flex flex-wrap gap-2 mt-5">


{
project.tech_stack
?.split(",")
.map((tech,index)=>(


<span

key={index}

className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"

>

{tech.trim()}

</span>


))
}



</div>








<div className="flex gap-4 mt-5">


{
project.github && (

<a

href={project.github}

target="_blank"

className="text-blue-700 hover:underline"

>

Github

</a>

)
}





{
project.demo && (

<a

href={project.demo}

target="_blank"

className="text-blue-700 hover:underline"

>

Demo

</a>

)
}



</div>








<div className="flex gap-3 mt-8">


<button

onClick={()=>{

setSelectedProject(project);

setEditOpen(true);

}}

className="flex-1 bg-blue-700 text-white py-2 rounded-xl hover:bg-blue-800"

>

Edit

</button>





<button

onClick={()=>deleteProject(project.id)}

className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"

>

Hapus

</button>



</div>





</div>



</div>



))

}



</div>





</section>









<AddProjectModal

open={addOpen}

onClose={()=>setAddOpen(false)}

onSuccess={()=>{

setAddOpen(false);

loadProjects();

}}

/>







<EditProjectModal

open={editOpen}

project={selectedProject}

onClose={()=>setEditOpen(false)}

onSuccess={()=>{

setEditOpen(false);

setSelectedProject(null);

loadProjects();

}}

/>






</>


);


}