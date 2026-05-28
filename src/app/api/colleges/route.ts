// src/app/api/colleges/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { collegeFilterSchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());
    const validation = collegeFilterSchema.safeParse(params);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid filters", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { search, location, type, minRating, maxFees, page, limit } =
      validation.data;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { city: { contains: search } },
        { state: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (location) {
      where.OR = [
        ...(Array.isArray(where.OR) ? where.OR : []),
        { city: { contains: location } },
        { state: { contains: location } },
        { location: { contains: location } },
      ];
    }

    if (type) {
      where.type = type;
    }

    if (minRating) {
      where.rating = { gte: minRating };
    }

    if (maxFees) {
      where.feesMin = { lte: maxFees };
    }

    const skip = (page - 1) * limit;

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ ranking: "asc" }, { rating: "desc" }],
        include: {
          _count: {
            select: { savedBy: true, reviews: true },
          },
        },
      }),
      prisma.college.count({ where }),
    ]);

    return NextResponse.json({
      colleges,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Colleges API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}
