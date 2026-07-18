"use client";

import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SKPIPreview from "@/components/SKPIPreview";


export default function SKPIPage(){


const [data,setData]=useState<any>(null);

const [loading,setLoading]=useState(true);

const [userId,setUserId]=useState<number|null>(null);





useEffect(()=>{


const user =
JSON.parse(
localStorage.getItem("user") || "{}"
);



if(user.id){

setUserId(user.id);

getSKPI(user.id);

}else{

setLoading(false);

}


},[]);






async function getSKPI(id:number){


try{


const res =
await fetch(
`/api/skpi/user/${id}`
);



if(res.status===404){

setData(null);

return;

}



const result =
await res.json();



setData(result);



}catch(error){

console.log(error);

}

finally{

setLoading(false);

}


}








async function ajukanSKPI(){


try{


const res =
await fetch(
"/api/skpi",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

userId:userId

})


}

);



const result =
await res.json();



alert(result.message);



if(userId){

getSKPI(userId);

}



}catch(error){

console.log(error);

}


}









async function downloadPDF(){


if(!data)return;



const element =
document.getElementById(
"skpi-preview"
);



if(!element)return;



const canvas =
await html2canvas(
element,
{

scale:2,

backgroundColor:"#ffffff",

useCORS:true

}

);



const imgData =
canvas.toDataURL(
"image/png"
);



const pdf =
new jsPDF(
"p",
"mm",
"A4"
);



const pdfWidth =
pdf.internal.pageSize.getWidth();



const pdfHeight =
(
canvas.height *
pdfWidth
)
/
canvas.width;



pdf.addImage(

imgData,

"PNG",

0,

0,

pdfWidth,

pdfHeight

);



pdf.save(

`SKPI-${data.user_pengguna.nama}.pdf`

);



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











// BELUM ADA PENGAJUAN

if(!data){


return(

<main className="
min-h-screen
bg-gray-100
flex
items-center
justify-center
">


<div className="
bg-white
p-10
rounded-xl
shadow
text-center
">


<h1 className="
text-3xl
font-bold
">

Pengajuan SKPI

</h1>



<p className="
mt-3
text-gray-500
">

Anda belum memiliki pengajuan SKPI

</p>




<button

onClick={ajukanSKPI}

className="
mt-6
bg-blue-700
text-white
px-8
py-3
rounded-xl
"

>

Ajukan SKPI

</button>


</div>


</main>

)


}











// MENUNGGU ADMIN


if(data.status==="Menunggu"){


return(

<main className="
min-h-screen
bg-gray-100
flex
items-center
justify-center
">


<div className="
bg-white
p-10
rounded-xl
shadow
text-center
">


<div className="text-5xl">

⏳

</div>



<h1 className="
text-3xl
font-bold
text-yellow-600
mt-5
">

Menunggu Persetujuan Admin

</h1>



<p className="mt-4">

Pengajuan SKPI sedang diperiksa admin.

</p>



</div>


</main>


)


}











// DITOLAK


if(data.status==="Ditolak"){


return(

<main className="
min-h-screen
bg-gray-100
flex
items-center
justify-center
">


<div className="
bg-white
p-10
rounded-xl
shadow
text-center
">


<h1 className="
text-3xl
font-bold
text-red-600
">

SKPI Ditolak

</h1>




<p className="mt-5">

Catatan Admin:

</p>




<div className="
bg-red-50
p-4
mt-3
rounded
text-red-600
">

{

data.catatan ||

"Tidak ada catatan"

}

</div>





<button

onClick={ajukanSKPI}

className="
mt-6
bg-blue-700
text-white
px-6
py-3
rounded-xl
"

>

Ajukan Ulang

</button>



</div>


</main>

)


}












// DISETUJUI


if(data.status==="Disetujui"){


return(

<main className="
bg-gray-100
min-h-screen
py-10
">


<div className="
max-w-5xl
mx-auto
">


<div className="
flex
justify-between
items-center
mb-8
">


<h1 className="
text-3xl
font-bold
">

Surat Keterangan Pendamping Ijazah

</h1>





<button

onClick={downloadPDF}

className="
bg-green-700
text-white
px-6
py-3
rounded-xl
"

>

Download PDF

</button>



</div>





<SKPIPreview

data={data}

/>



</div>


</main>


)


}






return null;


}