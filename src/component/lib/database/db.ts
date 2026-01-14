import mongoose from "mongoose";
import { MONGO_URL } from "./secret";


let cached = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function ConnectDB() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URL)
            .then((mongoose) => {
                return mongoose
            })
    }
    cached.conn= await cached.promise
    return cached.conn
}