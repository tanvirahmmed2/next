import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import { getCurrentUser, requireRole } from '../../../lib/auth';

// User: create order from items [{ productId, quantity }]
export async function POST(request) {
  await connectToDatabase();
  const current = await getCurrentUser();
  const { allowed, message } = requireRole(current, ['user', 'seller', 'admin']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  const { items } = await request.json();
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'No items' }, { status: 400 });
  }

  const productIds = items.map((i) => i.productId);
  const products = await Product.find({ _id: { $in: productIds } }).lean();

  const orderItems = [];
  let total = 0;
  for (const input of items) {
    const product = products.find((p) => p._id.toString() === input.productId);
    if (!product) continue;
    const price = product.price;
    const quantity = input.quantity || 1;
    total += price * quantity;
    orderItems.push({ product: product._id, quantity, price });
  }

  if (!orderItems.length) {
    return NextResponse.json({ error: 'No valid items' }, { status: 400 });
  }

  const order = await Order.create({
    user: current.id,
    items: orderItems,
    total,
  });

  return NextResponse.json({ success: true, order });
}

// Admin: list all orders
export async function GET() {
  await connectToDatabase();
  const current = await getCurrentUser();
  const { allowed, message } = requireRole(current, ['admin']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  const orders = await Order.find().populate('user', 'name email').populate('items.product').lean();
  return NextResponse.json({ orders });
}