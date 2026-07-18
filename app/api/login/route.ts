import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user_pengguna.findUnique({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return Response.json(
        {
          message: "Email tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {
      return Response.json(
        {
          message: "Password salah",
        },
        {
          status: 401,
        }
      );
    }


    return Response.json({
      success: true,
      message: "Login berhasil",

      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        nim: user.nim,
        prodi: user.prodi,
        angkatan: user.angkatan,

profile:{
  foto:
  user.profile?.foto ?? "",
 

  bio:
  user.profile?.bio ?? "",
  

  alamat:
  user.profile?.alamat ?? "",

  no_hp:
  user.profile?.no_hp ?? "",
},
      },
    });


  } catch (error) {

    console.error(
      "LOGIN ERROR:",
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