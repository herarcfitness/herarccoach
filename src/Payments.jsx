import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        // Use your live backend URL to dodge proxy/CORS weirdness.
        const res = await axios.get('https://herarcbackend.onrender.com/api/payments', { timeout: 15000 });
        const data = Array.isArray(res.data) ? res.data : [];
        if (isMounted) setPayments(data);
      } catch (e) {
        console.error('Payments fetch failed:', e?.message || e);
        if (isMounted) setErr('Could not load payments.');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const fmtCurrency = (n, currency = 'USD') => {
    const amount = Number.isFinite(n) ? Number(n) : 0;
    const code = typeof currency === 'string' && currency.trim() ? currency.toUpperCase() : 'USD';
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: code, maximumFractionDigits: 2 }).format(amount);
    } catch {
      return `$${amount.toFixed(2)}`;
    }
  };

  const safePayments = useMemo(() => (Array.isArray(payments) ? payments : []), [payments]);

  const succeeded = useMemo(() => {
    try {
      return safePayments.filter(p => String(p?.status || '').toLowerCase() === 'succeeded');
    } catch {
      return [];
    }
  }, [safePayments]);

  const totalRevenue = useMemo(
    () => succeeded.reduce((sum, p) => sum + (Number(p?.amount) || 0), 0),
    [succeeded]
  );

  const thisMonthRevenue = useMemo(() => {
    const now = new Date();
    return succeeded.reduce((sum, p) => {
      const d = p?.created ? new Date(p.created) : null;
      if (d && !Number.isNaN(d.getTime()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
        return sum + (Number(p?.amount) || 0);
      }
      return sum;
    }, 0);
  }, [succeeded]);

  const activeSubs = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const ids = new Set();
    for (const p of succeeded) {
      const t = p?.created ? new Date(p.created).getTime() : NaN;
      if (Number.isFinite(t) && t >= cutoff) ids.add(p?.customer || p?.id || Math.random());
    }
    return ids.size;
  }, [succeeded]);

  if (loading) return <div className="p-6">Loading payments…</div>;
  // Don’t crash render if there’s an error—just show the UI with zeros/empty state.
  // if (err) return <div className="p-6 text-red-600">{err}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-2xl font-semibold">{fmtCurrency(totalRevenue)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">This Month</p>
          <p className="text-2xl font-semibold">{fmtCurrency(thisMonthRevenue)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Active (≈30d)</p>
          <p className="text-2xl font-semibold">{activeSubs}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex gap-2 mb-2 sm:mb-0">
          <select className="border rounded p-2 text-sm" defaultValue="all">
            <option value="all">All Statuses</option>
            <option value="succeeded">Succeeded</option>
            <option value="processing">Processing</option>
            <option value="requires_action">Requires Action</option>
            <option value="canceled">Canceled</option>
          </select>
          <button
            className="bg-gray-100 px-4 py-2 text-sm rounded hover:bg-gray-200"
            onClick={() => {
              try {
                const headers = ['id','customer','status','created','amount','currency'];
                const rows = safePayments.map(p => [
                  p?.id ?? '',
                  p?.customer ?? '',
                  p?.status ?? '',
                  p?.created ?? '',
                  String(p?.amount ?? 0),
                  String((p?.currency ?? 'USD')).toUpperCase(),
                ]);
                const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `payments_${Date.now()}.csv`;
                a.click();
                URL.revokeObjectURL(url);
              } catch (e) {
                console.error('CSV export failed:', e);
              }
            }}
          >
            Export CSV
          </button>
        </div>
        <input
          type="text"
          placeholder="Search clients..."
          className="border p-2 rounded text-sm w-full sm:w-64"
          onChange={() => {}}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Client (Stripe customer)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Currency</th>
            </tr>
          </thead>
          <tbody>
            {safePayments.length === 0 ? (
              <tr>
                <td className="p-3 text-gray-500 italic" colSpan="5">
                  {err ? 'No payment records yet (fetch failed).' : 'No payment records yet.'}
                </td>
              </tr>
            ) : (
              safePayments.map((p) => {
                const created = p?.created ? new Date(p.created) : null;
                const createdStr = created && !Number.isNaN(created.getTime())
                  ? created.toLocaleDateString()
                  : '-';
                return (
                  <tr key={p?.id || Math.random()} className="border-b">
                    <td className="p-3">{p?.customer || 'N/A'}</td>
                    <td className="p-3 capitalize">{p?.status || 'unknown'}</td>
                    <td className="p-3">{createdStr}</td>
                    <td className="p-3">{fmtCurrency(p?.amount, p?.currency)}</td>
                    <td className="p-3">{String(p?.currency || 'USD').toUpperCase()}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}