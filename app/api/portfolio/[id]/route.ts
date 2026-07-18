import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await prisma.user_pengguna.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        profile: true,
        project: {
          orderBy: {
            createdAt: "desc",
          },
        },
        skill: {
          orderBy: {
            category: "asc",
          },
        },
        certificate: {
          orderBy: {
            createdAt: "desc",
          },
        },
        experience: {
          orderBy: {
            startDate: "desc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Portfolio tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan server.",
      },
      {
        status: 500,
      }
    );
  }
}