"use client";

import { useState } from "react";



interface Props {

    open:boolean;

    onClose:()=>void;

    onSuccess:()=>void;

}





export default function AddCertificateModal({

    open,

    onClose,

    onSuccess

}:Props){



const [title,setTitle] =
useState("");



const [issuer,setIssuer] =
useState("");



const [year,setYear] =
useState("");



const [image,setImage]=useState<File | null>(null);



const [loading,setLoading] =
useState(false);







if(!open)
return null;







const addCertificate = async()=>{


try{


setLoading(true);


const user = JSON.parse(
localStorage.getItem("user") || "{}"
);



const formData = new FormData();


formData.append(
"userId",
user.id
);


formData.append(
"title",
title
);


formData.append(
"issuer",
issuer
);


formData.append(
"year",
year
);



if(image){

formData.append(
"image",
image
);

}



const res = await fetch(

"/api/certificate",

{

method:"POST",

body:formData

}

);



if(res.ok){

setTitle("");

setIssuer("");

setYear("");

setImage(null);


onSuccess();


}else{

alert("Gagal menambahkan certificate");

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

<div

className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"

>


<div

className="bg-white rounded-3xl shadow-xl w[420px] p-8"

>



<h2 className="text-2xl font-bold mb-6">

Tambah Certificate

</h2>







<label className="block mb-2 font-medium">

Nama Certificate

</label>


<input

value={title}

onChange={
e=>setTitle(e.target.value)
}

placeholder="Google Data Analytics"

className="w-full border rounded-xl px-4 py-3 mb-4"

/>









<label className="block mb-2 font-medium">

Penerbit

</label>



<input

value={issuer}

onChange={
e=>setIssuer(e.target.value)
}

placeholder="Google"

className="w-full border rounded-xl px-4 py-3 mb-4"

/>








<label className="block mb-2 font-medium">

Tahun

</label>


<input

value={year}

onChange={
e=>setYear(e.target.value)
}

placeholder="2025"

className="w-full border rounded-xl px-4 py-3 mb-4"

/>








<div>

<label className="block mb-2 font-medium">

Gambar Certificate

</label>



<label
htmlFor="certificateImage"
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

id="certificateImage"

type="file"

accept="image/*"

className="hidden"

onChange={(e)=>{

const file =
e.target.files?.[0];

if(file){

setImage(file);

}

}}

 />



{
image && (

<p className="text-sm text-gray-500 mt-2">

File dipilih: {image.name}

</p>

)

}


</div>







<div className="flex gap-3">



<button

onClick={onClose}

className="flex-1 bg-gray-200 py-3 rounded-xl"

>

Batal

</button>







<button

onClick={addCertificate}

disabled={loading}

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