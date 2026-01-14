import { model, models, Schema } from "mongoose"



export interface IMessage {
    senderId: string,
    chatId: string,
    message: string
    createdAt: Date
}


const messageSchema = new Schema<IMessage>({
    message: { type: String, required: true, trim: true },
    senderId: { type: String, required: true, trim: true },
    chatId: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
})


const Message= models.messages || model('messages', messageSchema)

export default Message