import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Inbox,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
  UserX,
} from 'lucide-react';
import {
  adminApi,
  getStoredSession,
  requestStaffOtp,
  signOutStaff,
  verifyStaffOtp,
} from '../lib/adminAuth';

type Access = {
  userId: string;
  role: 'owner' | 'staff';
  status: 'pending' | 'active' | 'revoked';
  email: string;
  phone: string;
  displayName: string;
};

type Enquiry = {
  id: string;
  full_name: string;
  company_name: string;
  business_email: string;
  phone_whatsapp?: string;
  product_requirement: string;
  estimated_quantity?: string;
  destination?: string;
  buyer_notes?: string;
  internal_notes?: string;
  status: string;
  email_status?: string;
  source_path?: string;
  created_at: string;
  updated_at?: string;
};

type StaffProfile = {
  user_id: string;
  email?: string;
  phone?: string;
  display_name: string;
  role: 'owner' | 'staff';
  status: 'pending' | 'active' | 'revoked';
  created_at: string;
  approved_at?: string;
};

const statusOptions = ['new', 'contacted', 'qualified', 'quoted', 'won', 'lost', 'closed'];
const fieldClass = 'w-full rounded-xl border border-[#d8c9aa] bg-white px-4 py-3 text-sm text-[#17362e] outline-none focus:border-[#b88a2c] focus:ring-2 focus:ring-[#b88a2c]/15';

const statusStyle = (status: string) => {
  if (status === 'won') return 'bg-[#dfeade] text-[#2c6640]';
  if (status === 'lost' || status === 'closed') return 'bg-[#ece7de] text-[#6f6b63]';
  if (status === 'quoted') return 'bg-[#eee2c5] text-[#765411]';
  if (status === 'qualified') return 'bg-[#dbe8e4] text-[#23584a]';
  return 'bg-[#f3e9d2] text-[#8b6317]';
};

export const AdminPortal: React.FC = () => {
  const [phase, setPhase] = useState<'loading' | 'login' | 'otp' | 'pending' | 'revoked' | 'dashboard'>('loading');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [identity, setIdentity] = useState('');
  const [otp, setOtp] = useState('');
  const [access, setAccess] = useState<Access | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [staff, setStaff] = useState<StaffProfile[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tab, setTab] = useState<'enquiries' | 'team'>('enquiries');
  const [draftNotes, setDraftNotes] = useState('');

  const selected = enquiries.find((item) => item.id === selectedId) ?? null;

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase();
    return enquiries.filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const haystack = `${item.full_name} ${item.company_name} ${item.business_email} ${item.product_requirement} ${item.destination ?? ''}`.toLowerCase();
      return matchesStatus && (!query || haystack.includes(query));
    });
  }, [enquiries, search, statusFilter]);

  const loadDashboard = async (resolvedAccess: Access) => {
    const enquiryData = await adminApi('/api/admin/enquiries');
    const nextEnquiries = (enquiryData.enquiries ?? []) as Enquiry[];
    setEnquiries(nextEnquiries);
    setSelectedId((current) => current || nextEnquiries[0]?.id || '');

    if (resolvedAccess.role === 'owner') {
      const staffData = await adminApi('/api/admin/staff');
      setStaff((staffData.staff ?? []) as StaffProfile[]);
    }
  };

  const resolveAccess = async () => {
    const payload = await adminApi('/api/admin/session', { method: 'POST', body: '{}' });
    const resolved = payload.access as Access;
    setAccess(resolved);
    if (resolved.status === 'pending') {
      setPhase('pending');
      return;
    }
    if (resolved.status === 'revoked') {
      setPhase('revoked');
      return;
    }
    await loadDashboard(resolved);
    setPhase('dashboard');
  };

  useEffect(() => {
    document.title = 'Private Enquiry Desk | Ancient Indian Botanicals';
    const robots = document.querySelector('meta[name="robots"]');
    robots?.setAttribute('content', 'noindex, nofollow, noarchive');

    if (!getStoredSession()) {
      setPhase('login');
      return;
    }
    resolveAccess().catch((reason) => {
      setError(reason instanceof Error ? reason.message : 'Please sign in again.');
      setPhase('login');
    });
  }, []);

  useEffect(() => {
    setDraftNotes(selected?.internal_notes ?? '');
  }, [selectedId, selected?.internal_notes]);

  const sendOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await requestStaffOtp(loginMethod, identity);
      setPhase('otp');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to send the sign-in code.');
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await verifyStaffOtp(loginMethod, identity, otp);
      await resolveAccess();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The code could not be verified.');
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await signOutStaff();
    setAccess(null);
    setEnquiries([]);
    setStaff([]);
    setOtp('');
    setIdentity('');
    setPhase('login');
  };

  const updateEnquiry = async (updates: { status?: string; internalNotes?: string }) => {
    if (!selected) return;
    setBusy(true);
    setError('');
    try {
      const payload = await adminApi('/api/admin/enquiries', {
        method: 'PATCH',
        body: JSON.stringify({ id: selected.id, ...updates }),
      });
      const updated = payload.enquiry as Enquiry;
      setEnquiries((current) => current.map((item) => item.id === updated.id ? updated : item));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to update the enquiry.');
    } finally {
      setBusy(false);
    }
  };

  const changeStaffAccess = async (profile: StaffProfile, action: 'approve' | 'revoke') => {
    setBusy(true);
    setError('');
    try {
      const payload = await adminApi('/api/admin/staff', {
        method: 'PATCH',
        body: JSON.stringify({ userId: profile.user_id, action }),
      });
      const updated = payload.staff as StaffProfile;
      setStaff((current) => current.map((item) => item.user_id === updated.user_id ? { ...item, ...updated } : item));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to change team access.');
    } finally {
      setBusy(false);
    }
  };

  if (phase === 'loading') {
    return <div className="flex min-h-screen items-center justify-center bg-[#062b23] text-[#e4c16e]"><RefreshCw className="h-7 w-7 animate-spin" /></div>;
  }

  if (phase === 'login' || phase === 'otp') {
    return (
      <div className="min-h-screen bg-[#062b23] px-4 py-10 text-[#17362e] sm:py-16">
        <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-[#c59a43]/45 bg-[#f7f1e5] shadow-[0_30px_90px_rgba(0,0,0,.35)]">
          <div className="bg-[#073b30] px-6 py-7 text-[#fffaf0] sm:px-8">
            <a href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#d9b65e]"><ArrowLeft className="h-4 w-4" /> Website</a>
            <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#d9b65e]/50 bg-white/5 text-[#d9b65e]"><ShieldCheck className="h-6 w-6" /></div>
            <h1 className="mt-4 font-serif text-3xl font-semibold">Private enquiry desk</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#e9e0d0]/70">Secure access for the owner and approved Ancient Indian Botanicals team members.</p>
          </div>

          <div className="px-6 py-7 sm:px-8">
            {phase === 'login' ? (
              <form onSubmit={sendOtp}>
                <div className="grid grid-cols-2 rounded-xl bg-[#e9dfcc] p-1 text-xs font-bold">
                  <button type="button" onClick={() => { setLoginMethod('phone'); setIdentity(''); setError(''); }} className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 ${loginMethod === 'phone' ? 'bg-white text-[#17362e] shadow-sm' : 'text-[#66736d]'}`}><Phone className="h-4 w-4" /> Owner</button>
                  <button type="button" onClick={() => { setLoginMethod('email'); setIdentity(''); setError(''); }} className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 ${loginMethod === 'email' ? 'bg-white text-[#17362e] shadow-sm' : 'text-[#66736d]'}`}><Mail className="h-4 w-4" /> Employee</button>
                </div>

                <label className="mt-6 block text-[10px] font-bold uppercase tracking-[.16em] text-[#52675f]">{loginMethod === 'phone' ? 'Authorised owner mobile' : 'Work email address'}</label>
                <input type={loginMethod === 'phone' ? 'tel' : 'email'} autoComplete={loginMethod === 'phone' ? 'tel' : 'email'} required value={identity} onChange={(event) => setIdentity(event.target.value)} placeholder={loginMethod === 'phone' ? '+91…' : 'name@company.com'} className={`${fieldClass} mt-2`} />
                <p className="mt-3 text-xs leading-relaxed text-[#6c7772]">{loginMethod === 'phone' ? 'A one-time code will be sent only to the configured owner number.' : 'New employees remain pending until the owner approves their account.'}</p>

                {error && <p className="mt-4 rounded-xl border border-[#b95043]/25 bg-[#f7e8e4] px-4 py-3 text-xs text-[#8b372d]">{error}</p>}
                <button disabled={busy} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#b88a2c] px-6 py-3.5 text-xs font-bold uppercase tracking-[.14em] text-[#062b23] disabled:opacity-60">{busy ? 'Sending code…' : 'Send secure code'} <ChevronRight className="h-4 w-4" /></button>
              </form>
            ) : (
              <form onSubmit={verifyOtp}>
                <button type="button" onClick={() => { setPhase('login'); setOtp(''); setError(''); }} className="inline-flex items-center gap-2 text-xs font-bold text-[#765411]"><ArrowLeft className="h-4 w-4" /> Change sign-in</button>
                <label className="mt-6 block text-[10px] font-bold uppercase tracking-[.16em] text-[#52675f]">Six-digit security code</label>
                <input inputMode="numeric" autoComplete="one-time-code" required minLength={6} maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" className={`${fieldClass} mt-2 text-center text-2xl tracking-[.35em]`} />
                <p className="mt-3 text-center text-xs text-[#6c7772]">Code sent to {identity}</p>
                {error && <p className="mt-4 rounded-xl border border-[#b95043]/25 bg-[#f7e8e4] px-4 py-3 text-xs text-[#8b372d]">{error}</p>}
                <button disabled={busy} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#b88a2c] px-6 py-3.5 text-xs font-bold uppercase tracking-[.14em] text-[#062b23] disabled:opacity-60">{busy ? 'Verifying…' : 'Enter private desk'} <ChevronRight className="h-4 w-4" /></button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'pending' || phase === 'revoked') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#062b23] p-4">
        <div className="w-full max-w-lg rounded-3xl border border-[#c59a43]/45 bg-[#f7f1e5] p-8 text-center text-[#17362e] shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#a87920] shadow-sm">{phase === 'pending' ? <Clock3 className="h-8 w-8" /> : <UserX className="h-8 w-8" />}</div>
          <h1 className="mt-6 font-serif text-3xl font-semibold">{phase === 'pending' ? 'Owner approval is pending.' : 'This access has been removed.'}</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#607169]">{phase === 'pending' ? 'Your request is safely recorded. The owner must approve this account before any enquiry data becomes visible.' : 'Contact the owner if access should be restored. No private enquiry information is available to this account.'}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"><button onClick={() => resolveAccess().catch((reason) => setError(reason.message))} className="rounded-full bg-[#b88a2c] px-6 py-3 text-xs font-bold uppercase tracking-[.13em] text-[#062b23]">Check access</button><button onClick={logout} className="rounded-full border border-[#17362e]/20 px-6 py-3 text-xs font-bold uppercase tracking-[.13em] text-[#17362e]">Sign out</button></div>
          {error && <p className="mt-4 text-xs text-[#8b372d]">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ece5d8] text-[#17362e]">
      <header className="border-b border-[#b88a2c]/35 bg-[#062b23] px-4 py-4 text-[#fffaf0] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#d9b65e]">Ancient Indian Botanicals</p><h1 className="font-serif text-2xl font-semibold">Private enquiry desk</h1></div>
          <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-xs font-bold">{access?.displayName}</p><p className="text-[9px] uppercase tracking-[.15em] text-[#d9b65e]">{access?.role}</p></div><button onClick={logout} aria-label="Sign out" className="rounded-full border border-white/15 p-2.5 text-[#e8dfcf] hover:border-[#d9b65e]"><LogOut className="h-4 w-4" /></button></div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {[{ label: 'New enquiries', value: enquiries.filter((item) => item.status === 'new').length, icon: Inbox }, { label: 'In progress', value: enquiries.filter((item) => ['contacted', 'qualified', 'quoted'].includes(item.status)).length, icon: RefreshCw }, { label: 'Total records', value: enquiries.length, icon: CheckCircle2 }].map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border border-[#d4c39f] bg-[#f8f4eb] p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[.15em] text-[#6b776f]">{label}</p><p className="mt-1 font-serif text-3xl font-semibold">{value}</p></div><Icon className="h-6 w-6 text-[#a87920]" /></div></div>)}
        </div>

        {access?.role === 'owner' && <div className="mb-5 inline-flex rounded-xl bg-[#ddd2bd] p-1 text-xs font-bold"><button onClick={() => setTab('enquiries')} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 ${tab === 'enquiries' ? 'bg-white shadow-sm' : 'text-[#637069]'}`}><Inbox className="h-4 w-4" /> Enquiries</button><button onClick={() => setTab('team')} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 ${tab === 'team' ? 'bg-white shadow-sm' : 'text-[#637069]'}`}><Users className="h-4 w-4" /> Team access {staff.filter((item) => item.status === 'pending').length > 0 && <span className="rounded-full bg-[#b88a2c] px-1.5 text-[9px] text-[#062b23]">{staff.filter((item) => item.status === 'pending').length}</span>}</button></div>}

        {error && <div className="mb-5 rounded-xl border border-[#b95043]/25 bg-[#f7e8e4] px-4 py-3 text-xs text-[#8b372d]">{error}</div>}

        {tab === 'team' && access?.role === 'owner' ? (
          <section className="overflow-hidden rounded-2xl border border-[#d4c39f] bg-[#f8f4eb] shadow-sm">
            <div className="border-b border-[#d4c39f] p-5"><h2 className="font-serif text-2xl font-semibold">Owner-controlled team access</h2><p className="mt-1 text-xs text-[#68736e]">Approve only recognised employees. Revoked accounts immediately lose access to enquiry data.</p></div>
            <div className="divide-y divide-[#ded2ba]">
              {staff.map((profile) => <div key={profile.user_id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><p className="font-bold">{profile.display_name || profile.email || profile.phone}</p><span className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[.1em] ${profile.status === 'active' ? 'bg-[#dfeade] text-[#2c6640]' : profile.status === 'pending' ? 'bg-[#f3e9d2] text-[#8b6317]' : 'bg-[#eadfdd] text-[#8b4139]'}`}>{profile.status}</span>{profile.role === 'owner' && <span className="rounded-full bg-[#073b30] px-2 py-1 text-[9px] font-bold uppercase text-white">Owner</span>}</div><p className="mt-1 text-xs text-[#68736e]">{profile.email || profile.phone} · Requested {new Date(profile.created_at).toLocaleDateString('en-IN')}</p></div>{profile.role !== 'owner' && <div className="flex gap-2">{profile.status !== 'active' && <button disabled={busy} onClick={() => changeStaffAccess(profile, 'approve')} className="inline-flex items-center gap-2 rounded-full bg-[#27634e] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.12em] text-white"><UserCheck className="h-4 w-4" /> Approve</button>}{profile.status !== 'revoked' && <button disabled={busy} onClick={() => changeStaffAccess(profile, 'revoke')} className="inline-flex items-center gap-2 rounded-full border border-[#934f46]/30 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#934f46]"><UserX className="h-4 w-4" /> Revoke</button>}</div>}</div>)}
              {staff.length === 0 && <p className="p-8 text-center text-sm text-[#68736e]">No team access requests yet.</p>}
            </div>
          </section>
        ) : (
          <div className="grid min-h-[620px] overflow-hidden rounded-2xl border border-[#d4c39f] bg-[#f8f4eb] shadow-sm lg:grid-cols-[420px_1fr]">
            <aside className="border-b border-[#d4c39f] lg:border-b-0 lg:border-r">
              <div className="space-y-3 border-b border-[#d4c39f] p-4"><div className="relative"><Search className="absolute left-3 top-3.5 h-4 w-4 text-[#7b837f]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search buyer, company or product" className={`${fieldClass} pl-10`} /></div><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className={fieldClass}><option value="all">All enquiry stages</option>{statusOptions.map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}</select></div>
              <div className="max-h-[560px] divide-y divide-[#e1d7c3] overflow-y-auto">
                {filteredEnquiries.map((item) => <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full p-4 text-left transition hover:bg-white ${selectedId === item.id ? 'bg-white shadow-[inset_3px_0_0_#b88a2c]' : ''}`}><div className="flex items-start justify-between gap-3"><div><p className="font-serif text-lg font-semibold leading-tight">{item.company_name}</p><p className="mt-1 text-xs text-[#68736e]">{item.full_name} · {item.destination || 'Destination pending'}</p></div><span className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase ${statusStyle(item.status)}`}>{item.status}</span></div><p className="mt-3 line-clamp-2 text-xs font-semibold text-[#315148]">{item.product_requirement}</p><p className="mt-2 text-[9px] uppercase tracking-[.1em] text-[#8a8e89]">{new Date(item.created_at).toLocaleString('en-IN')}</p></button>)}
                {filteredEnquiries.length === 0 && <p className="p-8 text-center text-sm text-[#68736e]">No enquiries match this view.</p>}
              </div>
            </aside>

            <section className="min-w-0 p-5 sm:p-7">
              {selected ? <div className="mx-auto max-w-3xl"><div className="flex flex-col gap-4 border-b border-[#ded2ba] pb-6 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#9a7020]">Enquiry {selected.id.slice(0, 8)}</p><h2 className="mt-2 font-serif text-3xl font-semibold">{selected.product_requirement}</h2><p className="mt-2 text-sm text-[#637069]">Received {new Date(selected.created_at).toLocaleString('en-IN')}</p></div><select value={selected.status} onChange={(event) => updateEnquiry({ status: event.target.value })} className={`${fieldClass} sm:w-44`}>{statusOptions.map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}</select></div>
                <div className="grid gap-5 py-6 sm:grid-cols-2">{[['Buyer', selected.full_name], ['Company', selected.company_name], ['Email', selected.business_email], ['Phone / WhatsApp', selected.phone_whatsapp || 'Not provided'], ['Approx. quantity', selected.estimated_quantity || 'Not sure yet'], ['Destination', selected.destination || 'To be confirmed']].map(([label, value]) => <div key={label}><p className="text-[9px] font-bold uppercase tracking-[.15em] text-[#7a837e]">{label}</p><p className="mt-1 break-words text-sm font-semibold">{value}</p></div>)}</div>
                <div className="rounded-xl border border-[#ded2ba] bg-white p-5"><p className="text-[9px] font-bold uppercase tracking-[.15em] text-[#7a837e]">Buyer notes</p><p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#40564e]">{selected.buyer_notes || 'No additional notes provided.'}</p></div>
                <div className="mt-5"><label className="text-[9px] font-bold uppercase tracking-[.15em] text-[#7a837e]">Private team notes</label><textarea rows={5} value={draftNotes} onChange={(event) => setDraftNotes(event.target.value)} placeholder="Record calls, samples, pricing follow-up or next action…" className={`${fieldClass} mt-2 resize-y`} /><button disabled={busy} onClick={() => updateEnquiry({ internalNotes: draftNotes })} className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#173f34] px-5 py-3 text-[10px] font-bold uppercase tracking-[.13em] text-white disabled:opacity-60"><Save className="h-4 w-4" /> Save private notes</button></div>
              </div> : <div className="flex h-full min-h-[450px] items-center justify-center text-center"><div><Inbox className="mx-auto h-10 w-10 text-[#b88a2c]" /><h2 className="mt-4 font-serif text-2xl font-semibold">Select an enquiry</h2><p className="mt-2 text-sm text-[#68736e]">Buyer details and internal follow-up notes will appear here.</p></div></div>}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

