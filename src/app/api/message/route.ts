import { connectDB } from "@/component/lib/database/db";
import { isLogin } from "@/component/lib/middleware";
import Chat from "@/component/lib/model/chat";
import Message from "@/component/lib/model/message";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const auth = await isLogin();
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    const { chatId, text } = await req.json();

    if (!chatId || !text) {
      return NextResponse.json({ success: false, message: "Chat id and text are required" }, { status: 400 });
    }

    const chat = await Chat.findById(chatId);
    if (!chat || !chat.members.includes(auth.payload._id)) {
      return NextResponse.json({ success: false, message: "Unauthorized chat access" }, { status: 403 });
    }

    const newMessage = await Message.create({
      chatId,
      senderId: auth.payload._id,
      text
    });

    return NextResponse.json({
      success: true,
      message: "Message sent",
      data: newMessage
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


