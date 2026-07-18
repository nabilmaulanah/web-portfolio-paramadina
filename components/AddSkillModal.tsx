"use client";


import {useState} from "react";


interface Props{

open:boolean;

onClose:()=>void;

onSuccess:()=>void;

}



export default function AddSkillModal({
open,
onClose,
onSuccess
}:Props){


const [category,setCategory]=useState("");

const [nama_skill,setNamaSkill] = useState("");

const [level_skill,setLevelSkill] = useState("");




if(!open)
return null;




const saveSkill=async()=>{


const user =
JSON.parse(
localStorage.getItem("user") || "{}"
);



await fetch("/api/skill",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId:user.id,

category,

nama_skill,

level_skill

})


});



onSuccess();



};




return (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">


<div className="bg-white rounded-3xl p-8 w[400px]">


<h2 className="text-2xl font-bold mb-5">

Tambah Skill

</h2>



<input

className="w-full border p-3 rounded-xl mb-4"

placeholder="Kategori"

value={category}

onChange={
e=>setCategory(e.target.value)
}

/>



<input

className="w-full border p-3 rounded-xl mb-4"

placeholder="Nama Skill"

value={nama_skill}

onChange={
e=>setNamaSkill(e.target.value)
}

/>

<input

className="w-full border p-3 rounded-xl mb-5"

placeholder="Level (Beginner / Intermediate / Expert)"

value={level_skill}

onChange={
e=>setLevelSkill(e.target.value)
}

/>




<div className="flex gap-3">


<button

onClick={onClose}

className="flex-1 bg-gray-300 py-2 rounded-xl"

>

Batal

</button>



<button

onClick={saveSkill}

className="flex-1 bg-blue-700 text-white py-2 rounded-xl"

>

Simpan

</button>



</div>


</div>


</div>

);


}