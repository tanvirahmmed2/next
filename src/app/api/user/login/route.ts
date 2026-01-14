import { connectDB } from "@/component/lib/database/db";
import User from "@/component/lib/model/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/component/lib/database/secret";



export async function POST(req: Request) {
    try {
        await connectDB()

        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({
                success: false, messaged: 'Please fill all information'
            }, { status: 400 })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                success: false, message: 'User not found'
            }, { status: 400 })
        }
        if (user.isBanned) {
            return NextResponse.json({
                success: false, message: "User is banned"
            }, { status: 400 })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return NextResponse.json({
                success: false, message: 'Incorrect password'
            }, { status: 400 })
        }


        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })


        const response = NextResponse.json({
            success: true, message: 'Successfully logged in'
        }, { status: 200 })

        response.cookies.set({
            name: "user_token",
            value: token,
            httpOnly: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        })

        return response

    } catch (error: any) {
        return NextResponse.json({
            success: false, message: error.message
        }, { status: 500 })
    }

}