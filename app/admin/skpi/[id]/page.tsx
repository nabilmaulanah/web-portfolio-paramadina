"use client";


import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


export default function ReviewSKPIPage(){


const params = useParams();

const id = params.id;



const [data,setData]=useState<any>(null);

const [loading,setLoading]=useState(true);


const [status,setStatus]=useState("");

const [catatan,setCatatan]=useState("");





useEffect(()=>{


if(id){

getData();

}


},[id]);







async function getData(){


try{


const res =
await fetch(
`/api/admin/skpi/${id}`
);



const result =
await res.json();



setData(result);


setStatus(
result.status || "Menunggu"
);


setCatatan(
result.catatan || ""
);



}catch(error){

console.log(error);

}

finally{

setLoading(false);

}


}









async function simpan(){


try{


const res =
await fetch(

`/api/admin/skpi/${id}`,

{


method:"PUT",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


status,

catatan


})


}


);



const result =
await res.json();



alert(
result.message ||
"Berhasil disimpan"
);



getData();



}catch(error){


console.log(error);


}


}









if(loading){


return(

<div className="
min-h-screen
flex
items-center
justify-center
">

Loading...

</div>

)


}








if(!data){


return(

<div className="
min-h-screen
flex
items-center
justify-center
">

Data SKPI tidak ditemukan

</div>

)

}






const user =
data.user_pengguna;








return(


<main className="
min-h-screen
bg-gray-100
p-10
">



<div className="
max-w-6xl
mx-auto
bg-white
rounded-xl
shadow
p-8
">





<h1 className="
text-3xl
font-bold
mb-8
">

Review Pengajuan SKPI

</h1>









<section>


<h2 className="
text-xl
font-bold
mb-4
">

Identitas Mahasiswa

</h2>




<div className="
space-y-2
">


<p>

<b>Nama :</b> {user?.nama}

</p>


<p>

<b>NIM :</b> {user?.nim}

</p>



<p>

<b>Program Studi :</b> {user?.prodi}

</p>



<p>

<b>Email :</b> {user?.email || "-"}

</p>



<p>

<b>Bio :</b> {user?.profile?.bio || "-"}

</p>



</div>


</section>







<hr className="my-8"/>








<section>


<h2 className="
text-xl
font-bold
mb-4
">

Skill

</h2>



{

user?.skill?.length > 0 ?



<ul className="
list-disc
ml-6
">


{

user.skill.map(
(item:any)=>(

<li key={item.id}>

{item.nama_skill}

-
{item.level_skill}

</li>


)

)


}


</ul>



:


<p className="text-gray-500">

Belum ada skill

</p>


}



</section>









<hr className="my-8"/>








<section>


<h2 className="
text-xl
font-bold
mb-4
">

Project

</h2>




{

user?.project?.length >0 ?



user.project.map(
(item:any)=>(


<div

key={item.id}

className="
border
rounded-lg
p-4
mb-4
">


<h3 className="
font-bold
">

{item.title}

</h3>



<p>

{item.description}

</p>



</div>


)

)



:


<p className="text-gray-500">

Belum ada project

</p>



}



</section>








<hr className="my-8"/>








<section>


<h2 className="
text-xl
font-bold
mb-4
">

Certificate

</h2>





{

user?.certificate?.length >0 ?



user.certificate.map(
(item:any)=>(


<div

key={item.id}

className="
mb-3
border-b
pb-2
">


<b>
{item.title}
</b>


<br/>


{item.issuer}

-
{item.year}



</div>



)

)



:


<p className="text-gray-500">

Belum ada sertifikat

</p>


}



</section>










<hr className="my-8"/>







<section>


<h2 className="
text-xl
font-bold
mb-4
">

Experience

</h2>





{


user?.experience?.length >0 ?



user.experience.map(
(item:any)=>(


<div

key={item.id}

className="
mb-4
">


<b>

{item.jabatan}

</b>


<br/>


{item.organisasi}



</div>


)

)



:


<p className="text-gray-500">

Belum ada pengalaman

</p>


}



</section>










<hr className="my-8"/>








<section>


<h2 className="
text-xl
font-bold
mb-4
">

Keputusan Admin

</h2>







<label className="
font-bold
">

Status

</label>




<select

value={status}

onChange={
(e)=>setStatus(e.target.value)
}

className="
border
w-full
p-3
rounded-lg
mt-2
"

>



<option value="Menunggu">

Menunggu

</option>



<option value="Disetujui">

Disetujui

</option>



<option value="Ditolak">

Ditolak

</option>



</select>








<div className="mt-5">


<label className="
font-bold
">

Catatan Admin

</label>



<textarea


value={catatan}


onChange={
(e)=>setCatatan(e.target.value)
}


rows={5}


className="
border
w-full
p-3
rounded-lg
mt-2
"


placeholder="Isi alasan jika ditolak"


/>


</div>









<button


onClick={simpan}


className="
mt-8
bg-blue-700
text-white
px-8
py-3
rounded-xl
"


>


Simpan Keputusan


</button>






</section>







</div>



</main>


)


}