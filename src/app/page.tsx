/**
 * app/page.tsx
 *
 * Root redirect — sends users to the correct dashboard based on auth role.
 * If the access token contains admin claims, send to /dashboard/admin.
 * Otherwise send to the user dashboard.
 */
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function getRoleFromToken(token: string | undefined): string | null {
  if (!token) return null;
  const segments = token.split('.');
  if (segments.length !== 3) return null;

  try {
    const payload = Buffer.from(segments[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
    const parsed = JSON.parse(payload) as { role?: string };
    return parsed.role ?? null;
  } catch {
    return null;
  }
}

export default function Home() {
  const token = cookies().get('accessToken')?.value;
  const role = getRoleFromToken(token) ?? cookies().get('userRole')?.value;

  if (!token && !role) {
    redirect('/auth/register');
  }

  if (role === 'ADMIN') {
    redirect('/dashboard/admin');
  }

  redirect('/user');
}
