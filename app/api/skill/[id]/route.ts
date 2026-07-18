import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



interface Context {

  params: Promise<{
    id:string;
  }>;

}







export async function PUT(

req:Request,

context:Context

){


try{



const {id} =
await context.params;



const skillId =
Number(id);





const body =
await req.json();






const skill =
await prisma.skill.update({


where:{

id:skillId

},



data:{


category:body.category,


nama_skill:body.nama_skill,


level_skill:body.level_skill || null


}



});







return NextResponse.json(skill);






}catch(error){


console.log(error);



return NextResponse.json(

{

message:"Gagal update skill"

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



const {id} =
await context.params;



const skillId =
Number(id);






await prisma.skill.delete({


where:{


id:skillId


}


});







return NextResponse.json({

message:"Skill berhasil dihapus"

});






}catch(error){


console.log(error);



return NextResponse.json(

{

message:"Gagal hapus skill"

},

{

status:500

}

);


}



}