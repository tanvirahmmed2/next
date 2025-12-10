import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { verifyPassword, createSessionCookie } from '../../../../lib/auth';

export async function POST(request) {
  await connectToDatabase();
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Missing credentials' }), {
      status: 400,
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
    });
  }

  const valid = verifyPassword(password, user.password);
  if (!valid) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
    });
  }

  // Use helper to set session cookie
  return createSessionCookie(user);
}