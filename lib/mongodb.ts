import mongoose, { type Mongoose } from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing environment variable: MONGODB_URI");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache =
  global._mongooseCache ??
  (global._mongooseCache = {
    conn: null,
    promise: null,
  });


export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

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
