import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { getCurrentUser, requireRole } from '../../../lib/auth';

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const filter = {};
  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter).lean();

  return NextResponse.json({ products });
}

export async function POST(request) {
  await connectToDatabase();
  const user = await getCurrentUser();
  const { allowed, message } = requireRole(user, ['admin', 'seller']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  const { name, description, price, category, imageUrl, inStock } = await request.json();

  if (!name || !price || !category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    imageUrl,
    inStock: inStock ?? true,
    createdBy: user.id,
  });

  return NextResponse.json({ success: true, product });
}