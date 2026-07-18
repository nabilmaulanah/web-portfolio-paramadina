import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = Number(searchParams.get("userId"));

    const experiences = await prisma.experience.findMany({
      where: {
        userId,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return NextResponse.json(experiences);
  } catch (error) {
    console.log(error);

    return NextResponse.json([], {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const experience = await prisma.experience.create({
      data: {
        userId: Number(body.userId),
        jabatan: body.jabatan,
        organisasi: body.organisasi,
        description: body.description,
        startDate: body.startDate
          ? new Date(body.startDate)
          : null,
        endDate: body.endDate
          ? new Date(body.endDate)
          : null,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Gagal menambahkan experience",
      },
      {
        status: 500,
      }
    );
  }
}