export type ApiRequest = {
  method?: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
};

export type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: Record<string, unknown>) => void;
  setHeader: (name: string, value: string) => void;
};

export type AuthUser = {
  id: string;
  email?: string;
  phone?: string;
  user_metadata?: Record<string, unknown>;
};

export type StaffAccess = {
  userId: string;
  role: 'owner' | 'staff';
  status: 'pending' | 'active' | 'revoked';
  email: string;
  phone: string;
  displayName: string;
};

const env = () => {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !serviceKey || !anonKey) {
    throw new Error('CRM database is not configured.');
  }

  return { url, serviceKey, anonKey };
};

const normalizedPhone = (value: string | undefined) => (value ?? '').replace(/[^\d+]/g, '');

export const crmFetch = async (path: string, init: RequestInit = {}) => {
  const { url, serviceKey } = env();
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
};

export const getAuthenticatedUser = async (request: ApiRequest): Promise<AuthUser> => {
  const authorization = request.headers?.authorization;
  const value = Array.isArray(authorization) ? authorization[0] : authorization;
  const token = value?.replace(/^Bearer\s+/i, '');
  if (!token) throw new Error('Authentication required.');

  const { url, anonKey } = env();
  const userResponse = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
  });

  if (!userResponse.ok) throw new Error('Your secure session has expired.');
  return userResponse.json() as Promise<AuthUser>;
};

const staffProfileFor = async (userId: string) => {
  const response = await crmFetch(
    `staff_profiles?user_id=eq.${encodeURIComponent(userId)}&select=user_id,email,phone,display_name,role,status`,
  );
  if (!response.ok) throw new Error('Unable to verify staff access.');
  const profiles = (await response.json()) as Array<Record<string, unknown>>;
  return profiles[0] ?? null;
};

export const ensureStaffProfile = async (user: AuthUser): Promise<StaffAccess> => {
  const ownerPhone = normalizedPhone(process.env.OWNER_PHONE_E164);
  const userPhone = normalizedPhone(user.phone);
  const isOwner = Boolean(ownerPhone && userPhone && ownerPhone === userPhone);
  const existing = await staffProfileFor(user.id);
  const metadataName = String(user.user_metadata?.display_name ?? user.user_metadata?.full_name ?? '').trim();

  if (isOwner) {
    const ownerProfile = {
      user_id: user.id,
      email: user.email ?? '',
      phone: user.phone ?? '',
      display_name: metadataName || 'Owner',
      role: 'owner',
      status: 'active',
      approved_by: user.id,
      approved_at: new Date().toISOString(),
    };
    const upsert = await crmFetch('staff_profiles?on_conflict=user_id', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates' },
      body: JSON.stringify(ownerProfile),
    });
    if (!upsert.ok) throw new Error('Unable to initialise owner access.');
    return {
      userId: user.id,
      role: 'owner',
      status: 'active',
      email: user.email ?? '',
      phone: user.phone ?? '',
      displayName: ownerProfile.display_name,
    };
  }

  if (!existing) {
    const pendingProfile = {
      user_id: user.id,
      email: user.email ?? '',
      phone: user.phone ?? '',
      display_name: metadataName || user.email?.split('@')[0] || 'Team member',
      role: 'staff',
      status: 'pending',
    };
    const created = await crmFetch('staff_profiles', {
      method: 'POST',
      body: JSON.stringify(pendingProfile),
    });
    if (!created.ok) throw new Error('Unable to create an access request.');
    return {
      userId: user.id,
      role: 'staff',
      status: 'pending',
      email: pendingProfile.email,
      phone: pendingProfile.phone,
      displayName: pendingProfile.display_name,
    };
  }

  return {
    userId: String(existing.user_id),
    role: existing.role === 'owner' ? 'owner' : 'staff',
    status: existing.status === 'active' ? 'active' : existing.status === 'revoked' ? 'revoked' : 'pending',
    email: String(existing.email ?? ''),
    phone: String(existing.phone ?? ''),
    displayName: String(existing.display_name ?? 'Team member'),
  };
};

export const requireActiveStaff = async (request: ApiRequest) => {
  const user = await getAuthenticatedUser(request);
  const access = await ensureStaffProfile(user);
  if (access.status !== 'active') throw new Error('Owner approval is required.');
  return access;
};

export const requireOwner = async (request: ApiRequest) => {
  const access = await requireActiveStaff(request);
  if (access.role !== 'owner') throw new Error('Owner access is required.');
  return access;
};

export const safeError = (error: unknown) => error instanceof Error ? error.message : 'Unable to complete the request.';

