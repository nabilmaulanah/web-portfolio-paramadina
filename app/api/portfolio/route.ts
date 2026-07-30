import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user_pengguna.findMany({
      include: {
        profile: true,
      },
      orderBy: {
        nama: "asc",
      },
    });

    const result = users.map((user) => ({
      id: user.id,
      nama: user.nama,
      nim: user.nim,
      prodi: user.prodi,
      angkatan: user.angkatan,
      foto: user.profile?.foto || null,
      bio: user.profile?.bio || null,

      // TAMBAHAN
      visibility: user.visibility,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan.",
      },
      {
        status: 500,
      }
    );
  }
}