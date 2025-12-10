import { clearSessionCookie } from '../../../../lib/auth';

export async function POST() {
  return clearSessionCookie();
}