import mongoose, { Schema, models } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    inStock: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model('Product', ProductSchema);

export default Product;
