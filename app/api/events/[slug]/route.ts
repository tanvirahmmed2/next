import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db"; // adjust to your actual DB util
import Event from "@/models/Event"; // adjust to your actual Event model path

// Dynamic route params shape provided by Next.js
interface RouteParams {
  slug: string;
}

// Shape of a single event returned by the API.
// Prefer to import a typed interface from your model if you already have one.
export interface EventDto {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  [key: string]: unknown; // allow extra fields without using `any`
}

// Common error response
interface ErrorResponse {
  success: false;
  message: string;
  details?: string;
}

// Successful response
interface SuccessResponse {
  success: true;
  data: EventDto;
}

// Basic slug validation (customize if needed)
const isValidSlug = (slug: string): boolean =>
  typeof slug === "string" && /^[a-zA-Z0-9-]+$/.test(slug);

/**
 * GET /api/events/[slug]
 * Fetch a single event by its slug.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: RouteParams }
): Promise<NextResponse<ErrorResponse | SuccessResponse>> {
  const { slug } = params;

  // 1. Validate presence and format of slug
  if (!slug) {
    return NextResponse.json<ErrorResponse>(
      {
        success: false,
        message: "Missing 'slug' parameter.",
        details: "Call this route as /api/events/[slug] with a non-empty slug.",
      },
      { status: 400 }
    );
  }

  if (!isValidSlug(slug)) {
    return NextResponse.json<ErrorResponse>(
      {
        success: false,
        message: "Invalid 'slug' format.",
        details: "Slug may only contain letters, numbers, and hyphens.",
      },
      { status: 400 }
    );
  }

  try {
    // 2. Ensure database connection
    await connectToDatabase();

    // 3. Query the event by slug
    const eventDoc = await Event.findOne({ slug }).lean().exec();

    if (!eventDoc) {
      return NextResponse.json<ErrorResponse>(
        {
          success: false,
          message: "Event not found.",
          details: `No event exists with slug '${slug}'.`,
        },
        { status: 404 }
      );
    }

    // 4. Map to DTO if you want to control exposed fields
    const event: EventDto = {
      _id: String((eventDoc as { _id: unknown })._id),
      slug: (eventDoc as { slug: string }).slug,
      title: (eventDoc as { title: string }).title,
      description: (eventDoc as { description?: string }).description,
      date: (eventDoc as { date?: string }).date,
      location: (eventDoc as { location?: string }).location,
      // spread remaining fields if you intentionally expose them
      ...(eventDoc as Record<string, unknown>),
    };

    return NextResponse.json<SuccessResponse>(
      {
        success: true,
        data: event,
      },
      { status: 200 }
    );
  } catch (err) {
    const error = err instanceof Error ? err : undefined;

    // 5. Catch-all error handler
    return NextResponse.json<ErrorResponse>(
      {
        success: false,
        message: "Unexpected server error while fetching event.",
        // Consider omitting `details` in strict production environments
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
