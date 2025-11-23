import {
  Schema,
  model,
  models,
  Types,
  type Model,
  type Document,
} from "mongoose";

import { Event } from "./event.model";

export interface IBooking {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingDocument = IBooking & Document;

// Simple email validation.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<BookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => EMAIL_REGEX.test(value),
        message: "Invalid email format",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Make sure the referenced event exists before saving.
bookingSchema.pre<BookingDocument>("save", async function (next) {
  if (!this.isModified("eventId")) {
    return next();
  }

  try {
    const eventExists = await Event.exists({ _id: this.eventId });
    if (!eventExists) {
      return next(new Error("Cannot create booking: event does not exist"));
    }
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

export const Booking: Model<BookingDocument> =
  (models.Booking as Model<BookingDocument>) ||
  model<BookingDocument>("Booking", bookingSchema);
