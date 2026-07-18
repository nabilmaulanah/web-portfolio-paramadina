import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    // Validasi
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    // Simpan ke database
    const contact = await prisma.contact_message.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim.",
      data: contact,
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server.",
      },
      {
        status: 500,
      }
    );
  }
}