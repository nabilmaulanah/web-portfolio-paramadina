"use client";


import { useEffect, useState } from "react";

import AddSkillModal from "./AddSkillModal";
import EditSkillModal from "./EditSkillModal";



interface Skill {

id:number;

category:string;

nama_skill:string;

level_skill:string | null;

}




export default function SkillSection(){


const [skills,setSkills] =
useState<Skill[]>([]);


const [loading,setLoading] =
useState(true);


const [addOpen,setAddOpen] =
useState(false);


const [editOpen,setEditOpen] =
useState(false);


const [selectedSkill,setSelectedSkill] =
useState<Skill | null>(null);






const user =
typeof window !== "undefined"
?
JSON.parse(
localStorage.getItem("user") || "{}"
)
:
null;








const loadSkills = async()=>{


try{


setLoading(true);



const res =
await fetch(
`/api/skill?userId=${user.id}`
);



const data =
await res.json();



if(Array.isArray(data)){

setSkills(data);

}else{

setSkills([]);

}




}catch(error){

console.log(error);


}finally{

setLoading(false);

}


};







useEffect(()=>{


if(user?.id){

loadSkills();

}


},[]);









const deleteSkill =
async(id:number)=>{


const confirmDelete =
confirm(
"Yakin ingin menghapus skill ini?"
);



if(!confirmDelete)
return;





const res =
await fetch(

`/api/skill/${id}`,

{

method:"DELETE"

}

);





if(res.ok){

loadSkills();

}else{

alert("Gagal menghapus skill");

}



};










return (

<>


<section

id="skill"

className="max-w-7xl mx-auto px-6 py-20"

>



<div className="flex justify-between items-center mb-10">


<div>

<h2 className="text-4xl font-bold">

Skill Saya

</h2>


<p className="text-gray-500 mt-2">

Daftar kemampuan yang saya kuasai.

</p>


</div>





<button

onClick={()=>setAddOpen(true)}

className="bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-800"

>

+ Tambah Skill

</button>



</div>









{
loading &&

<div className="text-center py-20">

Memuat Skill...

</div>

}









{
!loading && skills.length===0 &&

<div className="bg-white rounded-3xl shadow p-10 text-center">

<h3 className="text-xl font-semibold">

Belum ada Skill

</h3>


<p className="text-gray-500 mt-2">

Klik Tambah Skill untuk menambahkan.

</p>


</div>

}









<div className="grid md:grid-cols-2 gap-8">


{

skills.map((skill)=>(


<div

key={skill.id}

className="bg-white shadow-lg rounded-3xl p-8"

>


<div className="flex justify-between items-center mb-6">


<h3 className="text-2xl font-bold text-blue-700">

{skill.category}

</h3>



<div className="flex gap-3">


<button

onClick={()=>{

setSelectedSkill(skill);

setEditOpen(true);

}}

className="text-blue-700"

>

Edit

</button>



<button

onClick={()=>deleteSkill(skill.id)}

className="text-red-500"

>

Hapus

</button>



</div>


</div>







<div className="flex flex-wrap gap-3">


<span

className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"

>

{skill.nama_skill}

{
skill.level_skill &&
` - ${skill.level_skill}`
}

</span>



</div>



</div>



))

}


</div>




</section>








<AddSkillModal

open={addOpen}

onClose={()=>setAddOpen(false)}

onSuccess={()=>{

setAddOpen(false);

loadSkills();

}}

/>









<EditSkillModal

open={editOpen}

skill={selectedSkill}

onClose={()=>setEditOpen(false)}

onSuccess={()=>{

setEditOpen(false);

setSelectedSkill(null);

loadSkills();

}}

/>





</>

);


}