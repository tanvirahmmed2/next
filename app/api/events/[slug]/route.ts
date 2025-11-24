import { Event } from "@/database";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{slug: string}> }
) {
  const { slug } = await params;

  try {
    await connectToDatabase();

    if (!slug) {
      return NextResponse.json({ message: "Slug not provided" }, { status: 400 });
    }

    const event = await Event.findOne({ slug }).lean();

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Successfully fetched event data", event },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Data fetching failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
