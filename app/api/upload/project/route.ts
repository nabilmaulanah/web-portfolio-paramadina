import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";


export async function POST(
  req: NextRequest
) {

  try {


    const formData =
      await req.formData();



    const file =
      formData.get("file") as File;



    if (!file) {

      return Response.json(
        {
          message:"File tidak ditemukan",
        },
        {
          status:400,
        }
      );

    }




    const bytes =
      await file.arrayBuffer();



    const buffer =
      Buffer.from(bytes);




    const uploadDir =
      path.join(
        process.cwd(),
        "public",
        "uploads",
        "project"
      );




    if(
      !fs.existsSync(uploadDir)
    ){

      fs.mkdirSync(
        uploadDir,
        {
          recursive:true,
        }
      );

    }





    const fileName =
      `${Date.now()}-${file.name.replace(/\s/g,"-")}`;



    const filePath =
      path.join(
        uploadDir,
        fileName
      );




    fs.writeFileSync(
      filePath,
      buffer
    );




    const imageUrl =
      `/uploads/project/${fileName}`;




    return Response.json({

      success:true,

      image:imageUrl,

    });




  } catch(error){


    console.log(
      "UPLOAD PROJECT ERROR:",
      error
    );



    return Response.json(

      {
        message:"Upload gagal",
      },

      {
        status:500,
      }

    );

  }

}