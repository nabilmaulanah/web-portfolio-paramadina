import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req:Request){


try{


const {searchParams}=new URL(req.url);


const userId =
Number(searchParams.get("userId"));



const certificate =
await prisma.certificate.findMany({

where:{
userId
},

orderBy:{
id:"desc"
}

});



return NextResponse.json(certificate);



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


const formData = await req.formData();



const userId = Number(
formData.get("userId")
);


const title = String(
formData.get("title")
);


const issuer = String(
formData.get("issuer")
);


const year = String(
formData.get("year")
);



const file = formData.get("image") as File;



let imagePath = "";



if(file){


const bytes = await file.arrayBuffer();


const buffer = Buffer.from(bytes);



const filename =
Date.now()+"-"+file.name;



const uploadDir =
path.join(
process.cwd(),
"public/uploads/certificate"
);



if(!fs.existsSync(uploadDir)){

fs.mkdirSync(
uploadDir,
{
recursive:true
}
);

}



fs.writeFileSync(

path.join(
uploadDir,
filename
),

buffer

);



imagePath =
"/uploads/certificate/"+filename;


}




const certificate =
await prisma.certificate.create({

data:{


userId,


title,


issuer,


year,


image:imagePath || null


}


});



return NextResponse.json(certificate);



}catch(error){


console.log(error);


return NextResponse.json(

{
message:"Gagal tambah certificate"
},

{
status:500
}

);


}


}