import mongoose, { type Mongoose } from "mongoose";

/**
 * MongoDB connection URI.
 *
 * Define this in `.env.local`:
 *   MONGODB_URI=mongodb+srv://user:password@cluster-url/db-name
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // Fail fast during build and on cold start if the URI is not configured.
  throw new Error("Missing environment variable: MONGODB_URI");
}

/**
 * Cached Mongoose connection stored on the Node.js global object.
 *
 * We use this to:
 * - Avoid creating multiple connections during Next.js dev hot reloads.
 * - Reuse a single connection in production across invocations.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Augment the Node.js global type with our cache field.
 *
 * `var` is used because global variables in Node attach via `var` and we want
 * a single shared instance across module reloads.
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

// Reuse the existing cache if it exists, otherwise initialize it.
const cached: MongooseCache =
  global._mongooseCache ??
  (global._mongooseCache = {
    conn: null,
    promise: null,
  });

/**
 * Establish (or reuse) a Mongoose connection to MongoDB.
 *
 * Call this in any server-only context (API routes, server actions, etc.).
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // Return existing active connection immediately.
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection is in progress, start one.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
      // Optional: rely on MongoDB driver's behavior instead of Mongoose buffers.
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, clear the promise so future calls can retry cleanly.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
