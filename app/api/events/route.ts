import { Event, type IEvent } from "@/database";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Fields the client is allowed to send when creating an event.
type EventInput = Omit<IEvent, "slug" | "createdAt" | "updatedAt">;

// Parse request body as JSON or form-data, depending on Content-Type.
async function parseEventBody(req: NextRequest): Promise<Partial<EventInput>> {
  const contentType = req.headers.get("content-type") || "";

  // JSON body (recommended)
  if (contentType.includes("application/json")) {
    return (await req.json()) as Partial<EventInput>;
  }

  // Fallback: support form-data / urlencoded bodies (e.g. from HTML forms)
  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const formData = await req.formData();
    const obj = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;

    const result: Partial<EventInput> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "string") {
        // store raw string; arrays are normalized later
        (result as Record<string, unknown>)[key] = value;
      }
    }
    return result;
  }

  // Unsupported content type
  throw new Error("Unsupported Content-Type. Use application/json or form-data.");
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    let body: Partial<EventInput>;
    try {
      body = await parseEventBody(req);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid request body";
      return NextResponse.json({ message }, { status: 400 });
    }

    // Basic required-field validation.
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
