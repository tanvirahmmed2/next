import { Schema, model, models, type Model, type Document } from "mongoose";

// Event entity shape used in the app and in Mongoose.
export interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // Stored as YYYY-MM-DD
  time: string; // Stored as HH:MM (24h)
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type EventDocument = IEvent & Document;

// Basic slug generator from title.
function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

// Very small helper to normalize time into HH:MM 24h.
function normalizeTime(value: string): string | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

const eventSchema = new Schema<EventDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    overview: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    image: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    date: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    time: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    mode: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    audience: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    agenda: {
      type: [String],
      required: true,
      default: [],
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug and normalize date/time before saving.
eventSchema.pre<EventDocument>("save", function () {
  if (this.isModified("title") || !this.slug) {
    const baseSlug = slugify(this.title);
    this.slug = baseSlug || `event-${this._id.toString()}`;
  }

  if (this.isModified("date")) {
    const parsed = new Date(this.date);
    if (Number.isNaN(parsed.getTime())) {
      throw new Error("Invalid date format");
    }
    this.date = parsed.toISOString().slice(0, 10);
  }

  if (this.isModified("time")) {
    const normalized = normalizeTime(this.time);
    if (!normalized) {
      throw new Error("Invalid time format; expected HH:MM");
    }
    this.time = normalized;
  }
});

export const Event: Model<EventDocument> =
  (models.Event as Model<EventDocument>) || model<EventDocument>("Event", eventSchema);
