const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL ?? '').replace(/\/$/, '');
const anonKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY ?? '');
const storageKey = 'aib_secure_staff_session';

export type AdminSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: { id: string; email?: string; phone?: string };
};

const assertConfigured = () => {
  if (!supabaseUrl || !anonKey) throw new Error('The secure staff portal is awaiting database configuration.');
};

const authFetch = async (path: string, init: RequestInit) => {
  assertConfigured();
  const response = await fetch(`${supabaseUrl}/auth/v1/${path}`, {
    ...init,
    headers: {
      apikey: anonKey,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.msg || payload.error_description || payload.message || 'Authentication failed.');
  return payload;
};

const saveSession = (payload: Record<string, unknown>): AdminSession => {
  const session: AdminSession = {
    access_token: String(payload.access_token ?? ''),
    refresh_token: String(payload.refresh_token ?? ''),
    expires_at: Math.floor(Date.now() / 1000) + Number(payload.expires_in ?? 3600),
    user: payload.user as AdminSession['user'],
  };
  localStorage.setItem(storageKey, JSON.stringify(session));
  return session;
};

export const getStoredSession = (): AdminSession | null => {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) as AdminSession : null;
  } catch {
    return null;
  }
};

export const requestStaffOtp = async (method: 'phone' | 'email', value: string) => {
  const normalized = value.trim();
  if (!normalized) throw new Error(method === 'phone' ? 'Enter the owner mobile number.' : 'Enter your work email.');
  await authFetch('otp', {
    method: 'POST',
    body: JSON.stringify(method === 'phone'
      ? { phone: normalized, create_user: true, channel: 'sms' }
      : { email: normalized, create_user: true }),
  });
};

export const verifyStaffOtp = async (method: 'phone' | 'email', value: string, token: string) => {
  const payload = await authFetch('verify', {
    method: 'POST',
    body: JSON.stringify(method === 'phone'
      ? { phone: value.trim(), token: token.trim(), type: 'sms' }
      : { email: value.trim(), token: token.trim(), type: 'email' }),
  });
  return saveSession(payload);
};

const refreshSession = async (session: AdminSession) => {
  const payload = await authFetch('token?grant_type=refresh_token', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  });
  return saveSession(payload);
};

const validSession = async () => {
  const current = getStoredSession();
  if (!current) throw new Error('Please sign in to continue.');
  if (current.expires_at - 60 > Math.floor(Date.now() / 1000)) return current;
  return refreshSession(current);
};

export const adminApi = async (path: string, init: RequestInit = {}) => {
  const session = await validSession();
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
      ...(init.headers ?? {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Unable to complete the request.');
  return payload;
};

export const signOutStaff = async () => {
  const session = getStoredSession();
  localStorage.removeItem(storageKey);
  if (!session || !supabaseUrl || !anonKey) return;
  await fetch(`${supabaseUrl}/auth/v1/logout`, {
    method: 'POST',
    headers: { apikey: anonKey, Authorization: `Bearer ${session.access_token}` },
  }).catch(() => undefined);
};

