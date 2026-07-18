import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(
req:Request,
context:{
params:Promise<{id:string}>
}

){


try{


const {id}=await context.params;



const data =
await prisma.skpi.findUnique({

where:{
id:Number(id)
},


include:{


user_pengguna:{


include:{


profile:true,


project:true,


skill:true,


certificate:true,


experience:true


}


}


}


});



return NextResponse.json(data);



}catch(error){


return NextResponse.json(
{
message:"error"
},
{
status:500
}
);


}



}




export async function PUT(
req:Request,
context:{
params:Promise<{id:string}>
}

){


try{


const {id}=await context.params;


const body=await req.json();



const update =
await prisma.skpi.update({

where:{
id:Number(id)
},


data:{


status:body.status,


catatan:body.catatan


}


});



return NextResponse.json({

message:"Keputusan berhasil disimpan",

data:update


});



}catch(error){


console.log(error);


return NextResponse.json(
{
message:"Gagal update"
},
{
status:500
}
);


}



}