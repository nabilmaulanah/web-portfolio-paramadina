import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req:Request){

try{

const {searchParams}=new URL(req.url);

const userId=Number(
    searchParams.get("userId")
);


const user = await prisma.user_pengguna.findUnique({

where:{
    id:userId
},

include:{

profile:true,

_count:{

select:{
project:true,
skill:true,
certificate:true,
experience:true
}

}

}

});


return NextResponse.json(user);


}catch(error){

console.log(error);

return NextResponse.json(
{
error:"Dashboard error"
},
{
status:500
}
);

}

}