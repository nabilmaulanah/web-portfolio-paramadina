"use client";


import Image from "next/image";



interface Props{

data:any;

}




export default function SKPIPreview({
data
}:Props){



if(!data){

return(

<div className="
p-10
text-center
">

Data SKPI tidak tersedia

</div>

)

}




const user =
data.user_pengguna;



const profile =
user?.profile;





return(


<div

id="skpi-preview"

className="
bg-white
text-black
w[794px]
min-h[1123px]
mx-auto
p-10
font-serif
"

>







{/* HEADER */}


<div className="
text-center
mb-8
">


<h1 className="
text-xl
font-bold
">

UNIVERSITAS PARAMADINA

</h1>



<h2 className="
text-lg
font-bold
mt-2
">

SURAT KETERANGAN PENDAMPING IJAZAH

</h2>



<p className="
text-sm
mt-1
">

(SKPI)

</p>



<div className="
border-b-2
border-black
mt-5
"/>


</div>









{/* IDENTITAS */}


<section className="
mb-6
">


<h3 className="
font-bold
mb-3
">

A. IDENTITAS PEMEGANG IJAZAH

</h3>





<table className="
w-full
text-sm
">


<tbody>



<tr>

<td className="w-48">

Nama

</td>


<td>

: {user?.nama}

</td>


</tr>





<tr>

<td>

NIM

</td>


<td>

: {user?.nim}

</td>


</tr>





<tr>

<td>

Program Studi

</td>


<td>

: {user?.prodi}

</td>


</tr>





<tr>

<td>

Jenjang

</td>


<td>

: S1

</td>


</tr>




</tbody>



</table>



</section>









{/* FOTO */}


<div className="
flex
justify-end
mb-6
">


<div className="
w-28
h-36
border
flex
items-center
justify-center
">


{

profile?.foto ?



<Image

src={profile.foto}

width={112}

height={144}

alt="Foto"

className="
w-full
h-full
object-cover
"

/>



:


<span className="text-xs">

Foto

</span>



}



</div>


</div>









{/* DESKRIPSI */}



<section className="
mb-6
">


<h3 className="
font-bold
mb-3
">

B. DESKRIPSI SINGKAT

</h3>




<p className="
text-sm
text-justify
leading-relaxed
">


{

data.deskripsi ||

`
Lulusan Universitas Paramadina memiliki kompetensi akademik,
keterampilan profesional, kemampuan komunikasi,
serta kemampuan beradaptasi dalam dunia kerja.
`

}



</p>



</section>









{/* SKILL */}



<section className="
mb-6
">


<h3 className="
font-bold
mb-3
">

C. KOMPETENSI

</h3>





<table className="
w-full
border
border-black
text-sm
">


<thead>


<tr>


<th className="
border
p-2
">

No

</th>


<th className="
border
p-2
">

Kompetensi

</th>



</tr>


</thead>





<tbody>



{


user?.skill?.length >0 ?



user.skill.map(
(item:any,index:number)=>(


<tr key={item.id}>


<td className="
border
p-2
text-center
">

{index+1}

</td>



<td className="
border
p-2
">

{item.nama_skill}

({item.level_skill})

</td>



</tr>


)

)



:



<tr>


<td className="
border
p-2
text-center
">

1

</td>


<td className="
border
p-2
">

Kemampuan teknologi informasi

</td>


</tr>


}



</tbody>



</table>



</section>

{/* PROJECT */}



<section className="
mb-6
">


<h3 className="
font-bold
mb-3
">

D. PROYEK DAN KARYA

</h3>





<table className="
w-full
border
border-black
text-sm
">


<thead>


<tr>


<th className="
border
p-2
">

Nama Project

</th>


<th className="
border
p-2
">

Deskripsi

</th>



</tr>


</thead>





<tbody>


{


user?.project?.length >0 ?



user.project.map(
(item:any)=>(


<tr key={item.id}>


<td className="
border
p-2
">

{item.title}

</td>



<td className="
border
p-2
">

{item.description}

</td>



</tr>


)

)



:



<tr>


<td className="
border
p-2
">

-

</td>


<td className="
border
p-2
">

Belum ada project

</td>


</tr>


}




</tbody>


</table>




</section>









{/* SERTIFIKAT */}



<section className="
mb-6
">


<h3 className="
font-bold
mb-3
">

E. SERTIFIKASI

</h3>






<ul className="
list-disc
ml-6
text-sm
">


{


user?.certificate?.length >0 ?



user.certificate.map(
(item:any)=>(


<li key={item.id}>


{item.title}

-

{item.issuer}

-

{item.year}



</li>


)

)



:


<li>

Belum ada sertifikat

</li>


}




</ul>



</section>









{/* EXPERIENCE */}



<section>


<h3 className="
font-bold
mb-3
">

F. PENGALAMAN

</h3>





<ul className="
list-disc
ml-6
text-sm
">


{


user?.experience?.length >0 ?



user.experience.map(
(item:any)=>(


<li key={item.id}>


{item.jabatan}

-

{item.organisasi}



</li>


)

)



:


<li>

Belum ada pengalaman

</li>


}



</ul>



</section>









{/* FOOTER */}


<div className="
mt-16
flex
justify-between
text-sm
">


<div className="
text-center
">


<p>

Jakarta,

{new Date().getFullYear()}

</p>



<br/>

<br/>

<br/>



<p>

Ketua Program Studi

</p>



</div>

<div className="
text-center
">


<p>

Mahasiswa

</p>



<br/>

<br/>

<br/>




<p>

{user?.nama}

</p>



</div>



</div>







</div>


)


}