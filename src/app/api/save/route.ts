// src/app/api/save/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveCollegeSchema } from "@/lib/validators";

// GET: Get user's saved colleges
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId: session.user.id },
      include: {
        college: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(savedColleges.map((sc) => sc.college));
  } catch (error) {
    console.error("Get saved colleges error:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved colleges" },
      { status: 500 }
    );
  }
}

// POST: Save a college
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = saveCollegeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { collegeId } = validation.data;

    // Check if college exists
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });
    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    // Check if already saved
    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "College already saved" },
        { status: 200 }
      );
    }

    await prisma.savedCollege.create({
      data: {
        userId: session.user.id,
        collegeId,
      },
    });

    return NextResponse.json(
      { message: "College saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save college error:", error);
    return NextResponse.json(
      { error: "Failed to save college" },
      { status: 500 }
    );
  }
}

// DELETE: Unsave a college
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = saveCollegeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { collegeId } = validation.data;

    await prisma.savedCollege.deleteMany({
      where: {
        userId: session.user.id,
        collegeId,
      },
    });

    return NextResponse.json({ message: "College removed from saved" });
  } catch (error) {
    console.error("Unsave college error:", error);
    return NextResponse.json(
      { error: "Failed to remove college" },
      { status: 500 }
    );
  }
}
