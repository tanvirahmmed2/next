import { connectDB } from "@/component/lib/database/db";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    try {
        await connectDB()
    } catch (error: any) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
        
    }
    
}