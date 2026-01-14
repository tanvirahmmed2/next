import { model, models, Schema } from "mongoose"



export interface IUser{
    name: string,
    password: string
    email: string
    phone: string
    createdAt: Date

}

const userSchema= new Schema<IUser>({
    name: {type: String, required: true, trim :true},
    password:{type: String, required: true, trim :true},
    email: {type: String, required: true, trim :true},
    createdAt:{ type:Date, default: Date.now}

})

const User= models.users || model('users', userSchema)

export default User