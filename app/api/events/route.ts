import { Event } from "@/database";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  secure: true,
  url: process.env.CLOUDINARY_URL
});


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

    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json({ message: "Image file is required" }, { status: 401 })
    }

    const tags = JSON.parse(formData.get('tags') as string)
    const agenda = JSON.parse(formData.get('agenda') as string)

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'next' }, (error, result) => {
        if (error) return reject(error);
        resolve(result)
      }).end(buffer)
    })
    event.image = (uploadResult as { secure_url: string }).secure_url

    delete event.tags;
    delete event.agenda;
    console.log("EVENT BEFORE CREATE:", event);
    console.log("TAGS:", tags);
    console.log("AGENDA:", agenda);


    const createdEvent = await Event.create({
      ...event,
      tags,
      agenda,
    });



    return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 })
  } catch (e) {

    return NextResponse.json({ message: "Event creation failed", error: e instanceof Error ? e.message : "Unknown" }, { status: 400 })
  }

}


export async function GET() {
  try {
    await connectToDatabase()

    const events = await Event.find().sort({ createdAt: -1 })

    return NextResponse.json({ message: "Event fetched successfully", events }, { status: 200 })

  } catch (e) {
    return NextResponse.json({ message: "Event fetching failed", error: e }, { status: 500 })

  }

}
