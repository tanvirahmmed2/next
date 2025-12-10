import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { connectToDatabase } from './mongodb';
import User from '../models/User';

const SESSION_COOKIE_NAME = 'session';
const ITERATIONS = 10000;
const KEYLEN = 64;
const DIGEST = 'sha512';

let cachedSecret = null;

function getAuthSecret() {
  if (cachedSecret) return cachedSecret;
  const fromEnv = process.env.AUTH_SECRET;
  if (fromEnv) {
    cachedSecret = fromEnv;
    return cachedSecret;
  }
  // Fallback secret for local/dev use so the app does not crash if AUTH_SECRET is missing.
  // In production you should always set AUTH_SECRET.
  cachedSecret = crypto.randomBytes(32).toString('hex');
  if (process.env.NODE_ENV !== 'production') {
    console.warn('AUTH_SECRET is not set; using a generated development secret.');
  }
  return cachedSecret;
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST)
    .toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const testHash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST)
    .toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(testHash, 'hex'));
}

function signSession(userId) {
  const secret = getAuthSecret();
  return crypto
    .createHmac('sha256', secret)
    .update(userId.toString())
    .digest('hex');
}

export function createSessionCookie(user) {
  const signature = signSession(user._id);
  const value = `${user._id.toString()}|${signature}`;
  const response = NextResponse.json({ success: true, user: { id: user._id, email: user.email, role: user.role } });
  response.cookies.set(SESSION_COOKIE_NAME, value, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}

export function clearSessionCookie() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });
  return response;
}

export async function getCurrentUser() {
  await connectToDatabase();
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!session) return null;
  const [userId, signature] = session.split('|');
  const expected = signSession(userId);
  if (signature !== expected) return null;
  const user = await User.findById(userId).lean();
  if (!user) return null;
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function requireRole(user, roles = []) {
  if (!user) {
    return { allowed: false, message: 'Not authenticated' };
  }
  if (roles.length && !roles.includes(user.role)) {
    return { allowed: false, message: 'Not authorized' };
  }
  return { allowed: true };
}
