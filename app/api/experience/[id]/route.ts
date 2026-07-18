import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  req: Request,
  context: Context
) {
  try {
    const { id } = await context.params;

    const experienceId = Number(id);

    const body = await req.json();

    const experience = await prisma.experience.update({
      where: {
        id: experienceId,
      },

      data: {
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
        message: "Gagal update experience",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  context: Context
) {
  try {
    const { id } = await context.params;

    const experienceId = Number(id);

    await prisma.experience.delete({
      where: {
        id: experienceId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Gagal menghapus experience",
      },
      {
        status: 500,
      }
    );
  }
}