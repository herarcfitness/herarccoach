/*export default function Overview() {
    return (
      <div className="text-xl font-semibold text-gray-800">
        Payments Screen Placeholder
      </div>
    );
  }*/
    import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('/api/payments'); // backend must expose this
        setPayments(res.data || []);
      } catch (e) {
        console.error(e);
        setErr('Could not load payments.');
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // helpers
  const fmtCurrency = (n, currency = 'usd') =>
    new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.toUpperCase(),
      maximumFractionDigits: 2,
    }).format(n || 0);

  // stats from payment intents (counts only "succeeded")
  const succeeded = useMemo(
    () => payments.filter(p => (p.status || '').toLowerCase() === 'succeeded'),
    [payments]
  );

  const totalRevenue = useMemo(
    () => succeeded.reduce((sum, p) => sum + (Number(p.amount) || 0), 0),
    [succeeded]
  );

  const thisMonthRevenue = useMemo(() => {
    const now = new Date();
    return succeeded
      .filter(p => {
        const d = new Date(p.created);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  }, [succeeded]);

  // crude "active subs" proxy = unique customers with a succeeded payment in last 30 days
  const activeSubs = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const setIds = new Set(
      succeeded
        .filter(p => new Date(p.created).getTime() >= cutoff)
        .map(p => p.customer || p.id) // fallback just in case
    );
    return setIds.size;
  }, [succeeded]);

  if (loading) return <div className="p-6">Loading payments…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      {/* Stat Cards */}
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

      {/* Filters/Search (UI only for now) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex gap-2 mb-2 sm:mb-0">
          <select className="border rounded p-2 text-sm">
            <option>All Statuses</option>
            <option>Succeeded</option>
            <option>Processing</option>
            <option>Requires Action</option>
            <option>Canceled</option>
          </select>
          <button
            className="bg-gray-100 px-4 py-2 text-sm rounded hover:bg-gray-200"
            onClick={() => {
              // quick CSV export of what's loaded
              const headers = ['id','customer','status','created','amount','currency'];
              const rows = payments.map(p => [
                p.id,
                p.customer || '',
                p.status || '',
                p.created || '',
                p.amount || 0,
                (p.currency || 'usd').toUpperCase(),
              ]);
              const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `payments_${Date.now()}.csv`;
              a.click();
              URL.revokeObjectURL(url);
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

      {/* Table */}
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
            {payments.length === 0 ? (
              <tr>
                <td className="p-3 text-gray-500 italic" colSpan="5">
                  No payment records yet.
                </td>
              </tr>
            ) : (
              payments.map(p => (
                <tr key={p.id} className="border-b">
                  <td className="p-3">{p.customer || 'N/A'}</td>
                  <td className="p-3 capitalize">{p.status}</td>
                  <td className="p-3">
                    {p.created ? new Date(p.created).toLocaleDateString() : '-'}
                  </td>
                  <td className="p-3">{fmtCurrency(p.amount, p.currency)}</td>
                  <td className="p-3">{(p.currency || 'usd').toUpperCase()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}