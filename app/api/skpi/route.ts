import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req:Request){

try{


const body = await req.json();


const userId = Number(body.userId);



const cek = await prisma.skpi.findUnique({

where:{
userId
}

});



if(cek){

return NextResponse.json({

message:"SKPI sudah pernah diajukan"

});

}



const data = await prisma.skpi.create({

data:{


userId,

status:"Menunggu"


}


});



return NextResponse.json({

message:"Pengajuan SKPI berhasil dikirim",

data

});



}catch(error){


console.log(error);


return NextResponse.json(
{
message:"Server Error"
},
{
status:500
}
);


}

}