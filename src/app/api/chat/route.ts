import { connectDB } from "@/component/lib/database/db";
import { isLogin } from "@/component/lib/middleware";
import Chat from "@/component/lib/model/chat";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        await connectDB()
        const auth = await isLogin()
        if (!auth.success) {
            return NextResponse.json({
                success: false, message: auth.message
            }, { status: 400 })
        }

        const userId = auth.payload._id

        const { otherUserId } = await req.json()

        if (!otherUserId) {
            return NextResponse.json({
                success: false, message: 'Id not recieved'
            }, { status: 400 })
        }

        let chat = await Chat.findOne({
            isGroup: false,
            members: { $all: [userId, otherUserId] },
        });

        if (!chat) {
            chat = await Chat.create({
                members: [userId, otherUserId],
                isGroup: false,
            });
        }

        return NextResponse.json({ success: true, chat });

    } catch (error: any) {
        return NextResponse.json({
            success: false, message: error.message
        }, { status: 500 })

    }

}


export async function GET() {
    try {
        await connectDB()
        const auth= await isLogin()
        if(!auth.success){
            return NextResponse.json({
                success:false, message:auth.message
            },{status:400})
        }

        const chats= await Chat.find({members: auth.payload._id}).sort({createdAt:-1})

        if(!chats){
            return NextResponse.json({
                success:false, message:'No chat found'
            },{status:400})
        }
        return NextResponse.json({
            success:true, message:'Successfully found chat data', payload: chats
        },{status:200})

    } catch (error: any) {
        return NextResponse.json({
            success:false, message: error.message
        },{status:500})
        
    }
    
}