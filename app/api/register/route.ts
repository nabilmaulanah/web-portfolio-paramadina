import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nama, nim, prodi, angkatan, email, password } = body;

    const existingUser = await prisma.user_pengguna.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user_pengguna.create({
      data: {
        nama,
        nim,
        prodi,
        angkatan: Number(angkatan),
        email,
        password: hashedPassword,
      },
    });

    return Response.json(
      {
        message: "Register berhasil",
        user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);

    return Response.json(
      {
        message: "Terjadi kesalahan server",
        error: error.message,
      },
      { status: 500 }
    );
  }
}