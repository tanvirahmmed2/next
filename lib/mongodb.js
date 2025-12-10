import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set in environment variables');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'next-fashion-shop',
    }).then((mongooseInstance) => mongooseInstance);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
