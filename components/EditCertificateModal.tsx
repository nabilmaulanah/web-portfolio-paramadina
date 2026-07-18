"use client";

import { useState, useEffect } from "react";


interface Props {

    open:boolean;

    onClose:()=>void;

    onSuccess:()=>void;

    certificate:any;

}



export default function EditCertificateModal({

    open,

    onClose,

    onSuccess,

    certificate

}:Props){


const [title,setTitle]=useState("");

const [issuer,setIssuer]=useState("");

const [year,setYear]=useState("");

const [image,setImage]=useState("");

const [loading,setLoading]=useState(false);



useEffect(()=>{

    if(certificate){

        setTitle(certificate.title);

        setIssuer(certificate.issuer);

        setYear(certificate.year);

        setImage(certificate.image || "");

    }

},[certificate]);




if(!open) return null;



const updateCertificate = async()=>{


try{


setLoading(true);


const res = await fetch(

`/api/certificate/${certificate.id}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

title,

issuer,

year,

image

})

}

);



if(res.ok){

    onSuccess();

}else{

    alert("Gagal update certificate");

}



}catch(error){

console.log(error);

alert("Terjadi kesalahan");

}

finally{

setLoading(false);

}


};



return (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


<div className="bg-white rounded-3xl shadow-xl w[420px] p-8">


<h2 className="text-2xl font-bold mb-6">

Edit Certificate

</h2>



<label className="block mb-2 font-medium">

Nama Certificate

</label>


<input

value={title}

onChange={e=>setTitle(e.target.value)}

className="w-full border rounded-xl px-4 py-3 mb-4"

/>




<label className="block mb-2 font-medium">

Penerbit

</label>


<input

value={issuer}

onChange={e=>setIssuer(e.target.value)}

className="w-full border rounded-xl px-4 py-3 mb-4"

/>





<label className="block mb-2 font-medium">

Tahun

</label>


<input

value={year}

onChange={e=>setYear(e.target.value)}

className="w-full border rounded-xl px-4 py-3 mb-4"

/>





<label className="block mb-2 font-medium">

Gambar Certificate

</label>


<input

value={image}

onChange={e=>setImage(e.target.value)}

className="w-full border rounded-xl px-4 py-3 mb-6"

/>




<div className="flex gap-3">


<button

onClick={onClose}

className="flex-1 bg-gray-200 py-3 rounded-xl"

>

Batal

</button>



<button

disabled={loading}

onClick={updateCertificate}

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