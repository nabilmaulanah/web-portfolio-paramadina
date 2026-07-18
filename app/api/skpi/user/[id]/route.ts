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


const userId=Number(id);



const data =
await prisma.skpi.findUnique({

where:{
userId
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



if(!data){

return NextResponse.json(
null,
{
status:404
}
);

}



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