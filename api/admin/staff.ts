import { ApiRequest, ApiResponse, crmFetch, requireOwner, safeError } from '../_crm';

const text = (value: unknown, max = 200) => String(value ?? '').trim().slice(0, max);

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader('Cache-Control', 'no-store');

  try {
    const owner = await requireOwner(request);

    if (request.method === 'GET') {
      const result = await crmFetch('staff_profiles?select=user_id,email,phone,display_name,role,status,created_at,approved_at&order=created_at.desc');
      if (!result.ok) throw new Error('Unable to load team access.');
      response.status(200).json({ ok: true, staff: await result.json() });
      return;
    }

    if (request.method === 'PATCH') {
      const userId = text(request.body?.userId, 80);
      const action = text(request.body?.action, 20);
      if (!userId || !['approve', 'revoke'].includes(action)) throw new Error('A valid access action is required.');
      if (userId === owner.userId) throw new Error('Owner access cannot be revoked here.');

      const updates = action === 'approve'
        ? { status: 'active', role: 'staff', approved_by: owner.userId, approved_at: new Date().toISOString() }
        : { status: 'revoked', approved_by: owner.userId, approved_at: new Date().toISOString() };

      const result = await crmFetch(`staff_profiles?user_id=eq.${encodeURIComponent(userId)}&role=neq.owner&select=user_id,email,display_name,role,status,created_at,approved_at`, {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(updates),
      });
      if (!result.ok) throw new Error('Unable to change team access.');
      const rows = await result.json() as unknown[];
      response.status(200).json({ ok: true, staff: rows[0] ?? null });
      return;
    }

    response.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (error) {
    const message = safeError(error);
    const status = /owner|approval|access|session|Authentication/i.test(message) ? 401 : 400;
    response.status(status).json({ ok: false, error: message });
  }
}
