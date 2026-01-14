import mongoose from "mongoose";
import { MONGO_URL } from "./secret";

export async function connectDB() {
  if (!MONGO_URL) {
    throw new Error("MONGO_URL is missing");
  }

  return mongoose.connect(MONGO_URL);
}
