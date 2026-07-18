"use client";


import {useEffect,useState} from "react";

import AddCertificateModal from "./AddCertificateModal";

import EditCertificateModal from "./EditCertificateModal";



export default function CertificateSection(){


const [certificates,setCertificates]=useState<any[]>([]);


const [addOpen,setAddOpen]=useState(false);


const [editOpen,setEditOpen]=useState(false);


const [selected,setSelected]=useState<any>(null);




const user =

typeof window !== "undefined"

?

JSON.parse(localStorage.getItem("user") || "{}")

:

{};





const getCertificate = async()=>{


const res = await fetch(

`/api/certificate?userId=${user.id}`

);


const data = await res.json();


setCertificates(data);


};





useEffect(()=>{


if(user.id){

getCertificate();

}


},[]);






const deleteCertificate = async(id:number)=>{


if(!confirm("Hapus certificate ini?")) return;



await fetch(

`/api/certificate/${id}`,

{

method:"DELETE"

}

);



getCertificate();


};





return (

<section id="certificate" className="py-20 bg-gray-100">


<div className="max-w-7xl mx-auto px-6">



<div className="flex justify-between items-center mb-10">


<h2 className="text-4xl font-bold">

Certificate

</h2>



<button

onClick={()=>setAddOpen(true)}

className="bg-blue-700 text-white px-6 py-3 rounded-xl"

>

+ Tambah Certificate

</button>


</div>





<div className="grid md:grid-cols-3 gap-6">


{

certificates.map((item)=>(


<div

key={item.id}

className="bg-white rounded-3xl shadow p-6"

>


<img

src={item.image || "/certificate.png"}

className="w-full h-40 object-cover rounded-xl mb-4"

/>



<h3 className="font-bold text-xl">

{item.title}

</h3>


<p>

{item.issuer}

</p>


<p>

{item.year}

</p>




<div className="flex gap-3 mt-5">


<button

onClick={()=>{

setSelected(item);

setEditOpen(true);

}}

className="flex-1 bg-yellow-400 py-2 rounded-xl"

>

Edit

</button>




<button

onClick={()=>deleteCertificate(item.id)}

className="flex-1 bg-red-500 text-white py-2 rounded-xl"

>

Hapus

</button>



</div>



</div>


))

}



</div>




<AddCertificateModal

open={addOpen}

onClose={()=>setAddOpen(false)}

onSuccess={()=>{

setAddOpen(false);

getCertificate();

}}

/>





<EditCertificateModal

open={editOpen}

certificate={selected}

onClose={()=>setEditOpen(false)}

onSuccess={()=>{

setEditOpen(false);

getCertificate();

}}

/>




</div>


</section>

);


}