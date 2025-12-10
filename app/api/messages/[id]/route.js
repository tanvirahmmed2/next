import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import Message from '../../../../models/Message';
import { getCurrentUser, requireRole } from '../../../../lib/auth';

export async function PATCH(request, { params }) {
  await connectToDatabase();
  const current = await getCurrentUser();
  const { allowed, message } = requireRole(current, ['admin']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  const msg = await Message.findByIdAndUpdate(
    params.id,
    { read: true },
    { new: true }
  );

  if (!msg) {
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: msg });
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  const current = await getCurrentUser();
  const { allowed, message } = requireRole(current, ['admin']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  await Message.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}