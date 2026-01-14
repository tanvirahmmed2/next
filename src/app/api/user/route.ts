import { NextResponse } from "next/server";




export async function POST(req:Request) {
    try {
        
    } catch (error: any) {
        return NextResponse.json({
            success: false, message: error.message
        }, {status:500})
        
    }
    
}