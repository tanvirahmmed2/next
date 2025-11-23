import { Event, type IEvent } from "@/database";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


type EventInput = Omit<IEvent, "slug" | "createdAt" | "updatedAt">;

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = (await req.json()) as Partial<EventInput>;

    
    const requiredStringFields: (keyof EventInput)[] = [
      "title",
      "description",
      "overview",
      "image",
      "venue",
      "location",
      "date",
      "time",
      "mode",
      "audience",
      "organizer",
    ];

    for (const field of requiredStringFields) {
      const value = body[field];
      if (typeof value !== "string" || !value.trim()) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Normalize agenda and tags so they always end up as string arrays.
    const normalizeStringArray = (value: unknown): string[] => {
      if (Array.isArray(value)) {
        return value.map((v) => String(v).trim()).filter(Boolean);
      }
      if (typeof value === "string") {
        return value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
      }
      return [];
    };

    const eventData: EventInput = {
      title: body.title!.trim(),
      description: body.description!.trim(),
      overview: body.overview!.trim(),
      image: body.image!.trim(),
      venue: body.venue!.trim(),
      location: body.location!.trim(),
      date: body.date!.trim(),
      time: body.time!.trim(),
      mode: body.mode!.trim(),
      audience: body.audience!.trim(),
      organizer: body.organizer!.trim(),
      agenda: normalizeStringArray(body.agenda),
      tags: normalizeStringArray(body.tags),
    };

    const createdEvent = await Event.create(eventData);

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Event creation failed",
        error: e instanceof Error ? e.message : "unknown",
      },
      { status: 500 }
    );
  }
}
