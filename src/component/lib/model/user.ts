import { Schema, model, models } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "user" | "admin";
  isBanned: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, 
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
