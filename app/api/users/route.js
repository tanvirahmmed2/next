import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User';
import { getCurrentUser, requireRole, hashPassword } from '../../../lib/auth';

export async function GET() {
  await connectToDatabase();
  const current = await getCurrentUser();
  const { allowed, message } = requireRole(current, ['admin']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  const users = await User.find({}, '-password').lean();
  return NextResponse.json({ users });
}

// Admin can create another admin user
export async function POST(request) {
  await connectToDatabase();
  const current = await getCurrentUser();
  const { allowed, message } = requireRole(current, ['admin']);
  if (!allowed) {
    return NextResponse.json({ error: message }, { status: 403 });
  }

  const { name, email, password, role } = await request.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
  }

  const hashed = hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: role && ['user', 'seller', 'admin'].includes(role) ? role : 'admin',
  });

  return NextResponse.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}