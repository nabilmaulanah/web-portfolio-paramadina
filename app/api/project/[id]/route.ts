import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";



export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {

  try {


    const { id } =
      await params;



    const projectId =
      Number(id);



    const formData =
      await req.formData();



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



    const image =
      String(
        formData.get("image") || ""
      );



    const tech_stack =
      String(
        formData.get("tech_stack") || ""
      );



    const status =
      String(
        formData.get("status") || "Progress"
      );




    const project =
      await prisma.project.update({

        where: {

          id: projectId,

        },


        data: {

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

      success:true,

      project,

    });





  } catch(error){


    console.log(
      "UPDATE PROJECT ERROR:",
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







export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id:string }>;
  }
) {


  try {


    const { id } =
      await params;



    await prisma.project.delete({

      where: {

        id:Number(id),

      },

    });




    return Response.json({

      success:true,

    });




  } catch(error){


    console.log(
      "DELETE PROJECT ERROR:",
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