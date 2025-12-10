import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Message from '../../../models/Message';
import { getCurrentUser, requireRole } from '../../../lib/auth';

// Public: create a message
export async function POST(request) {
  await connectToDatabase();
  const { name, email, subject, body } = await request.json();

  if (!name || !email || !subject || !body) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const msg = await Message.create({ name, email, subject, body });
  return NextResponse.json({ success: true, message: msg });
}

// Admin: list messages
export async function GET() {
  await connectToDatabase();
  const current = await getCurrentUser();
  const { allowed, message } = requireRole(current, ['admin']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ messages });
}