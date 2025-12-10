import mongoose, { Schema, models } from 'mongoose';

const OrderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Order = models.Order || mongoose.model('Order', OrderSchema);

export default Order;
