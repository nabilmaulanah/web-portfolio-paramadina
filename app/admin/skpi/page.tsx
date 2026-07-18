"use client";


import { useEffect,useState } from "react";
import Link from "next/link";


export default function AdminSKPIPage(){


const [data,setData]=useState<any[]>([]);

const [loading,setLoading]=useState(true);




useEffect(()=>{


getSKPI();


},[]);





async function getSKPI(){


try{


const res =
await fetch(
"/api/admin/skpi"
);


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








return(


<main className="
min-h-screen
bg-gray-100
p-10
">


<div className="
max-w-6xl
mx-auto
">


<h1 className="
text-3xl
font-bold
mb-8
">

Pengajuan SKPI Mahasiswa

</h1>





<div className="
bg-white
rounded-xl
shadow
overflow-hidden
">



<table className="
w-full
">


<thead className="
bg-gray-200
">


<tr>


<th className="
p-4
text-left
">

Nama

</th>


<th className="
p-4
text-left
">

NIM

</th>


<th className="
p-4
text-left
">

Program Studi

</th>


<th className="
p-4
text-left
">

Status

</th>


<th className="
p-4
">

Aksi

</th>


</tr>


</thead>





<tbody>


{

data.map((item)=>{


return(


<tr

key={item.id}

className="
border-t
"

>


<td className="p-4">

{item.user_pengguna.nama}

</td>



<td className="p-4">

{item.user_pengguna.nim}

</td>




<td className="p-4">

{item.user_pengguna.prodi}

</td>




<td className="p-4">


{

item.status==="Menunggu" &&

<span className="
bg-yellow-100
text-yellow-700
px-3
py-1
rounded-full
">

Menunggu

</span>

}





{

item.status==="Disetujui" &&

<span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
">

Disetujui

</span>

}





{

item.status==="Ditolak" &&

<span className="
bg-red-100
text-red-700
px-3
py-1
rounded-full
">

Ditolak

</span>

}



</td>






<td className="p-4 text-center">


<Link

href={`/admin/skpi/${item.id}`}

className="
bg-blue-700
text-white
px-5
py-2
rounded-lg
"

>

Review

</Link>



</td>




</tr>


)


})


}



{

data.length===0 &&

<tr>

<td

colSpan={5}

className="
text-center
p-10
text-gray-500
"

>

Belum ada pengajuan SKPI

</td>

</tr>

}



</tbody>



</table>



</div>



</div>



</main>


)


}