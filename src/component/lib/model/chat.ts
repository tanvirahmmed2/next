import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IChat extends Document {
  members: mongoose.Types.ObjectId[];
  title: string
  isGroup: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ChatSchema = new Schema<IChat>(
  {
     title: {
      type: String,
      required: true,
      trim: true,
    },
    members: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: true,
      validate: {
        validator: (v: mongoose.Types.ObjectId[]) => v.length >= 2,
        message: "Chat must have at least 2 members",
      },
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
ChatSchema.index({ members: 1 });

const Chat = models.Chat || model<IChat>("Chat", ChatSchema);

export default Chat;
