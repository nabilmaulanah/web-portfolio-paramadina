import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = Number(searchParams.get("userId"));

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User tidak ditemukan",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user_pengguna.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      bio: user.profile?.bio,
      alamat: user.profile?.alamat,
      no_hp: user.profile?.no_hp,
      foto: user.profile?.foto,

      // TAMBAHAN
      visibility: user.visibility,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

async function saveProfile(req: Request) {
  try {
    const formData = await req.formData();

    const userId = Number(formData.get("userId"));

    const bio = String(formData.get("bio") || "");

    const alamat = String(formData.get("alamat") || "");

    const no_hp = String(formData.get("no_hp") || "");

    // TAMBAHAN
    const visibility = String(
      formData.get("visibility") || "Public"
    );

    const file = formData.get("foto") as File | null;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User tidak ditemukan",
        },
        {
          status: 400,
        }
      );
    }

    let fotoPath = undefined;

    if (file && file.size > 0) {
      const uploadDir = path.join(
        process.cwd(),
        "public/uploads/profile"
      );

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, {
          recursive: true,
        });
      }

      const filename = `${Date.now()}-${file.name}`;

      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      fs.writeFileSync(
        path.join(uploadDir, filename),
        buffer
      );

      fotoPath = `/uploads/profile/${filename}`;
    }

    // UPDATE VISIBILITY USER
    await prisma.user_pengguna.update({
      where: {
        id: userId,
      },
      data: {
        visibility,
      },
    });

    const oldProfile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (oldProfile) {
      await prisma.profile.update({
        where: {
          id: oldProfile.id,
        },
        data: {
          bio,
          alamat,
          no_hp,

          ...(fotoPath && {
            foto: fotoPath,
          }),
        },
      });
    } else {
      await prisma.profile.create({
        data: {
          userId,
          bio,
          alamat,
          no_hp,
          foto: fotoPath ?? null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Profile berhasil disimpan",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  return saveProfile(req);
}

export async function PUT(req: Request) {
  return saveProfile(req);
}