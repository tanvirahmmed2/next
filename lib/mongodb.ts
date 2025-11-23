import mongoose, { type Mongoose } from 'mongoose';

/**
 * Connection string for your MongoDB deployment.
 *
 * Define this in your environment (e.g. `.env.local`) as:
 *   MONGODB_URI=mongodb+srv://user:password@cluster-url/db-name
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // Fail fast in development and at build time if the URI is missing.
  throw new Error('Missing environment variable: MONGODB_URI');
}

/**
 * Shape of the cached Mongoose connection stored on the global object.
 *
 * We cache the connection across hot reloads in development to avoid
 * creating multiple connections to the database.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Augment the global type definition to include our Mongoose cache.
 *
 * `var` is used intentionally here because Next.js (and Node.js) attach
 * global variables to `globalThis` / `global` via `var`, and we want to
 * re-use the same cache object across module reloads in development.
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

// Use the existing cached instance if it exists, otherwise create a new one.
const cached: MongooseCache = global._mongoose ?? (global._mongoose = {
  conn: null,
  promise: null,
});

/**
 * Establishes (or re-uses) a Mongoose connection to MongoDB.
 *
 * This function is safe to call in any API route or server component.
 * In production it creates a single shared connection. In development it
 * re-uses the connection across hot reloads using the global cache above.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // If we already have an active connection, return it immediately.
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection attempt is already in progress, wait for it to finish.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      // Optional: set a logical database name if you don't include it in the URI.
      dbName: process.env.MONGODB_DB,
      // Disable mongoose's internal buffering; rely on native driver behavior.
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // If the connection fails, reset the promise so future calls can retry.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
