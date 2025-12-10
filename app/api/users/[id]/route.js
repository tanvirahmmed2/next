import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { getCurrentUser, requireRole } from '../../../../lib/auth';

export async function PATCH(request, { params }) {
  await connectToDatabase();
  const current = await getCurrentUser();
  const { allowed, message } = requireRole(current, ['admin']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  const { role } = await request.json();
  if (!['user', 'seller', 'admin'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  const user = await User.findByIdAndUpdate(
    params.id,
    { role },
    { new: true, select: '-password' }
  );

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, user });
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  const current = await getCurrentUser();
  const { allowed, message } = requireRole(current, ['admin']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}