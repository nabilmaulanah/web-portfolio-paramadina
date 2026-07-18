import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



interface Context{

params:Promise<{

id:string

}>;

}






export async function PUT(

req:Request,

context:Context

){


try{


const {id}=await context.params;


const certificateId =
Number(id);



const body =
await req.json();




const certificate =
await prisma.certificate.update({

where:{
id:certificateId
},


data:{


title:body.title,


issuer:body.issuer,


year:body.year,


image:body.image || null


}


});



return NextResponse.json(certificate);



}catch(error){


console.log(error);


return NextResponse.json(
{
message:"Gagal update certificate"
},
{
status:500
}
);


}


}









export async function DELETE(

req:Request,

context:Context

){


try{


const {id}=await context.params;


const certificateId =
Number(id);



await prisma.certificate.delete({

where:{
id:certificateId
}

});



return NextResponse.json({

success:true

});



}catch(error){


console.log(error);


return NextResponse.json(

{
message:"Gagal hapus certificate"
},

{
status:500
}

);


}


}