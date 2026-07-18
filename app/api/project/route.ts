import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = Number(
      searchParams.get("userId")
    );


    if (!userId) {
      return Response.json(
        {
          message: "User ID tidak ditemukan",
        },
        {
          status: 400,
        }
      );
    }


    const projects =
      await prisma.project.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });


    return Response.json(projects);


  } catch (error) {

    console.log(
      "GET PROJECT ERROR:",
      error
    );


    return Response.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}





export async function POST(
  req: NextRequest
) {

  try {


    const formData =
      await req.formData();



    const userId =
      Number(
        formData.get("userId")
      );


    const title =
      String(
        formData.get("title")
      );


    const description =
      String(
        formData.get("description") || ""
      );


    const github =
      String(
        formData.get("github") || ""
      );


    const demo =
      String(
        formData.get("demo") || ""
      );


    const tech_stack =
      String(
        formData.get("tech_stack") || ""
      );


    const status =
      String(
        formData.get("status") || "Progress"
      );


    const image =
      String(
        formData.get("image") || ""
      );




    const project =
      await prisma.project.create({

        data: {

          userId,

          title,

          description,

          github,

          demo,

          image,

          tech_stack,

          status,

        },

      });




    return Response.json({

      success: true,

      project,

    });




  } catch(error){


    console.log(
      "POST PROJECT ERROR:",
      error
    );


    return Response.json(

      {
        message:"Server Error",
      },

      {
        status:500,
      }

    );

  }

}