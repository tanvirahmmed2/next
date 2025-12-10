import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import Product from '../../../../models/Product';
import { getCurrentUser, requireRole } from '../../../../lib/auth';

export async function PATCH(request, { params }) {
  await connectToDatabase();
  const user = await getCurrentUser();
  const { allowed, message } = requireRole(user, ['admin', 'seller']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  const body = await request.json();
  const product = await Product.findByIdAndUpdate(params.id, body, { new: true });
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, product });
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  const user = await getCurrentUser();
  const { allowed, message } = requireRole(user, ['admin']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}