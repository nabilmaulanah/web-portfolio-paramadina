import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(req:Request){

try{


const {searchParams}=new URL(req.url);


const userId =
Number(searchParams.get("userId"));



const skills =
await prisma.skill.findMany({

where:{
userId
},

orderBy:{
id:"desc"
}

});



return NextResponse.json(skills);



}catch(error){


console.log(error);


return NextResponse.json(
[],
{
status:500
}
);


}


}




export async function POST(req:Request){

try{


const body =
await req.json();



const skill =
await prisma.skill.create({

data:{


userId:Number(body.userId),


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
message:"Gagal tambah skill"
},

{
status:500
}

);


}

}