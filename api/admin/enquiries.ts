import { ApiRequest, ApiResponse, crmFetch, requireActiveStaff, safeError } from '../_crm';

const allowedStatuses = new Set(['new', 'contacted', 'qualified', 'quoted', 'won', 'lost', 'closed']);
const text = (value: unknown, max = 2000) => String(value ?? '').trim().slice(0, max);

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader('Cache-Control', 'no-store');

  try {
    const access = await requireActiveStaff(request);

    if (request.method === 'GET') {
      const queryStatus = Array.isArray(request.query?.status) ? request.query?.status[0] : request.query?.status;
      const statusFilter = queryStatus && allowedStatuses.has(queryStatus) ? `&status=eq.${queryStatus}` : '';
      const result = await crmFetch(`enquiries?select=*&order=created_at.desc&limit=500${statusFilter}`);
      if (!result.ok) throw new Error('Unable to load enquiries.');
      response.status(200).json({ ok: true, enquiries: await result.json(), access });
      return;
    }

    if (request.method === 'PATCH') {
      const body = request.body ?? {};
      const id = text(body.id, 80);
      if (!id) throw new Error('Enquiry reference is required.');

      const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
      const status = text(body.status, 30);
      if (status) {
        if (!allowedStatuses.has(status)) throw new Error('Invalid enquiry status.');
        updates.status = status;
      }
      if ('internalNotes' in body) updates.internal_notes = text(body.internalNotes, 5000);
      if ('assignedTo' in body && access.role === 'owner') {
        updates.assigned_to = body.assignedTo ? text(body.assignedTo, 80) : null;
      }

      const result = await crmFetch(`enquiries?id=eq.${encodeURIComponent(id)}&select=*`, {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(updates),
      });
      if (!result.ok) throw new Error('Unable to update the enquiry.');

      await crmFetch('enquiry_activity', {
        method: 'POST',
        body: JSON.stringify({ enquiry_id: id, actor_user_id: access.userId, action: 'updated', details: updates }),
      });

      const rows = await result.json() as unknown[];
      response.status(200).json({ ok: true, enquiry: rows[0] ?? null });
      return;
    }

    response.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (error) {
    const message = safeError(error);
    const status = /approval|access|session|Authentication/i.test(message) ? 401 : 400;
    response.status(status).json({ ok: false, error: message });
  }
}

