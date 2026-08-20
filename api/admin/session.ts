import { ApiRequest, ApiResponse, ensureStaffProfile, getAuthenticatedUser, safeError } from '../_crm';

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const user = await getAuthenticatedUser(request);
    const access = await ensureStaffProfile(user);
    response.status(200).json({ ok: true, access });
  } catch (error) {
    response.status(401).json({ ok: false, error: safeError(error) });
  }
}

