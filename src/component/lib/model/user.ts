import { Schema } from "mongoose"



export interface IUser{
    name: string,
    password: string
    email: string
    phone: string
    createdAt: Date

}

const userSchema= new Schema<IUser>({
    name: {type: String, required: true, trim :true}

})