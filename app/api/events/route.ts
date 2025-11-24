import { Event } from "@/database";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const formData = await req.formData()

    let event
    try {
      event = Object.fromEntries(formData.entries())
    } catch (e) {
      return NextResponse.json({ message: "Invalid JSON data format", e }, { status: 400 })
    }

    const file= formData.get('image') as File

    if(!file){
      return NextResponse.json({message: "Image not found"}, {status:401})
    }

    const createdEvent = await Event.create(event)

    return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 })
  } catch (e) {

    return NextResponse.json({ message: "Event creation failed", error: e instanceof Error? e.message :"Unknown" }, { status: 400 })
  }

}


