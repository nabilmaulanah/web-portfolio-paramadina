import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ==========================
// GET DETAIL MESSAGE
// ==========================
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const message = await prisma.contact_message.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Pesan tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// UPDATE STATUS READ
// ==========================
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const message = await prisma.contact_message.update({
      where: {
        id: Number(id),
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// DELETE MESSAGE
// ==========================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.contact_message.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dihapus.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}