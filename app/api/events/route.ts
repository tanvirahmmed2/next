import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectToDatabase()

        const formData= await req.formData()

        let event,
        try {
            event= Object.fromEntries(formData.entries())

        } catch (e) {
            return NextResponse.json({message: 'Invalid JSON data format'}, {status: 400})
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({message: "Event  creation failed",  error: e instanceof Error? e.message: "unknown"}, {status: 500})
        
    }
}