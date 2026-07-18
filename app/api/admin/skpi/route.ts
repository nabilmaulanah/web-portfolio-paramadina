import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){


try{


const data =
await prisma.skpi.findMany({

include:{


user_pengguna:{


select:{


id:true,

nama:true,

nim:true,

prodi:true


}


}


},


orderBy:{


createdAt:"desc"


}


});



return NextResponse.json(data);



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