import { model, models, Schema } from "mongoose"


export interface IMessage{
    name: String
    email: String
    subject: String
    description: String
    createdAt: Date
}

const messageSchema= new Schema<IMessage>({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true},
    subject:{type:String, required:true, trim:true},
    description:{type:String, required:true, trim:true},
    createdAt: {type:Date, default: Date.now}
})

const Message= models.messages || model('message', messageSchema)

export default Message