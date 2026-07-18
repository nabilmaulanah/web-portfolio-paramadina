"use client";

import { useEffect, useState } from "react";


interface Skill {

  id:number;

  category:string;

  nama_skill:string;

  level_skill:string | null;

}



interface Props {

  open:boolean;

  skill:Skill | null;

  onClose:()=>void;

  onSuccess:()=>void;

}





export default function EditSkillModal({

  open,

  skill,

  onClose,

  onSuccess

}:Props){



const [category,setCategory] =
useState("");



const [nama_skill,setNamaSkill] =
useState("");



const [level_skill,setLevelSkill] =
useState("");



const [loading,setLoading] =
useState(false);





useEffect(()=>{


if(skill){

setCategory(skill.category);

setNamaSkill(skill.nama_skill);

setLevelSkill(skill.level_skill ?? "");

}


},[skill]);







if(!open || !skill)
return null;








const updateSkill = async()=>{


try{


setLoading(true);



const res =
await fetch(

`/api/skill/${skill.id}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

category,

nama_skill,

level_skill

})


}

);





if(res.ok){

onSuccess();

}else{

alert("Gagal update skill");

}




}catch(error){

console.log(error);

alert("Terjadi kesalahan");



}finally{

setLoading(false);

}



};









return (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


<div className="bg-white rounded-3xl shadow-xl w[400px] p-8">



<h2 className="text-2xl font-bold mb-6">

Edit Skill

</h2>





<label className="block text-sm font-medium mb-2">

Kategori Skill

</label>



<input

type="text"

value={category}

onChange={
e=>setCategory(e.target.value)
}

placeholder="Contoh: Frontend"

className="w-full border rounded-xl px-4 py-3 mb-5"

/>







<label className="block text-sm font-medium mb-2">

Nama Skill

</label>



<input

type="text"

value={nama_skill}

onChange={
e=>setNamaSkill(e.target.value)
}

placeholder="Contoh: React"

className="w-full border rounded-xl px-4 py-3 mb-5"

/>







<label className="block text-sm font-medium mb-2">

Level Skill

</label>



<select

value={level_skill}

onChange={
e=>setLevelSkill(e.target.value)
}

className="w-full border rounded-xl px-4 py-3 mb-6"

>


<option value="">
Pilih Level
</option>


<option value="Beginner">
Beginner
</option>


<option value="Intermediate">
Intermediate
</option>


<option value="Expert">
Expert
</option>


</select>








<div className="flex gap-3">


<button

onClick={onClose}

className="flex-1 bg-gray-200 py-3 rounded-xl"

>

Batal

</button>





<button

onClick={updateSkill}

disabled={loading}

className="flex-1 bg-blue-700 text-white py-3 rounded-xl"

>

{
loading
?
"Menyimpan..."
:
"Update"
}

</button>



</div>




</div>


</div>

);


}