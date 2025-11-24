
import { Event } from "@/database";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params
  try {
    await connectToDatabase()

    if (!slug) {
      return NextResponse.json({ message: 'Slug not found' }, { status: 404 })
    }

    const event = await Event.findOne({ slug }).lean()
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 400 })
    }

    return NextResponse.json({ message: "Successfully fetched event data", event }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ message: 'Data fecthing failed', error: e }, { status: 500 })

  }
}