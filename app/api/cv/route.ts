import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request) {

  try {


    const { searchParams } = new URL(req.url);


    const userId = Number(
      searchParams.get("userId")
    );


    if (!userId) {

      return NextResponse.json(
        {
          message: "User ID tidak ditemukan"
        },
        {
          status:400
        }
      );

    }



    const user =
      await prisma.user_pengguna.findUnique({

        where:{
          id:userId
        },


        include:{


          profile:true,


          project:{
            orderBy:{
              id:"desc"
            }
          },


          skill:{
            orderBy:{
              id:"desc"
            }
          },


          certificate:{
            orderBy:{
              id:"desc"
            }
          },


          experience:{
            orderBy:{
              startDate:"desc"
            }
          }


        }


      });





    if(!user){

      return NextResponse.json(
        {
          message:"User tidak ditemukan"
        },
        {
          status:404
        }
      );

    }




    return NextResponse.json({

      user:{


        nama:user.nama,

        nim:user.nim,

        prodi:user.prodi,

        angkatan:user.angkatan,

        email:user.email


      },


      profile:user.profile,


      projects:user.project,


      skills:user.skill,


      certificates:user.certificate,


      experiences:user.experience


    });



  } catch(error){


    console.log(error);



    return NextResponse.json(

      {
        message:"Gagal mengambil data CV"
      },

      {
        status:500
      }

    );


  }


}