import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { hashPassword } from '../../../../lib/auth';

export async function POST(request) {
  await connectToDatabase();
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
    role: role && ['user', 'seller', 'admin'].includes(role) ? role : 'user',
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