import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {
  const navigate = useNavigate();
  const [hibpKey, setHibpKey] = useState('');
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newKey, setNewKey] = useState('');

  useEffect(() => {
    loadConfig();
    loadScans();
  }, []);

  const loadConfig = async () => {
    try {
      const res = await fetch('/api/admin/config');
      const j = await res.json();
      if (j.success) setHibpKey(j.data.HIBP_API_KEY || '(not set)');
    } catch (err) {
      console.error('Failed to load config:', err);
    }
  };

  const loadScans = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/scans');
      const j = await res.json();
      if (j.success) setScans(j.data || []);
    } catch (err) {
      console.error('Failed to load scans:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveKey = async () => {
    if (!newKey.trim()) return alert('Enter a key');
    try {
      const res = await fetch('/api/admin/hibp-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: newKey.trim() })
      });
      const j = await res.json();
      if (j.success) {
        alert('Key saved! Restart backend for full effect.');
        setNewKey('');
        setHibpKey(newKey.trim());
      } else {
        alert('Error: ' + (j.error || 'unknown'));
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="border-b border-slate-700 sticky top-0 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-cyan-400">⚙️ Admin Panel</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-slate-600 hover:border-cyan-500 rounded-lg text-slate-300 hover:text-cyan-300 transition-all"
          >
            ← Back to Home
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HIBP Key Management */}
        <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">🔑 HIBP API Key</h2>
          <p className="text-slate-400 mb-4">Current status: <span className={hibpKey === '(not set)' ? 'text-red-400' : 'text-green-400'}>{hibpKey === '(not set)' ? 'Not configured' : '✓ Set'}</span></p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-2">Paste New HIBP API Key</label>
              <input
                type="password"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="paste your HIBP API key here..."
                className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              onClick={saveKey}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-all"
            >
              Save & Persist to .env
            </button>
            <p className="text-xs text-slate-400">Get your free HIBP API key at https://haveibeenpwned.com/API/v3</p>
          </div>
        </div>

        {/* Scan History */}
        <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">📊 Scan History</h2>
            <button
              onClick={loadScans}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 text-sm"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : scans.length === 0 ? (
            <p className="text-slate-400">No scans yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-600">
                  <tr className="text-left text-slate-300">
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Input</th>
                    <th className="pb-3">Accounts Found</th>
                    <th className="pb-3">Confidence</th>
                    <th className="pb-3">Breaches</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {scans.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-700/30 transition">
                      <td className="py-3 text-slate-400">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 text-white">{r.scan.input}</td>
                      <td className="py-3">{r.scan.confidenceDetails?.platformsFound || 0}</td>
                      <td className="py-3">
                        <div className="w-20 bg-slate-700 rounded h-2">
                          <div
                            style={{ width: `${r.scan.confidenceScore || 0}%` }}
                            className="h-2 bg-cyan-400 rounded"
                          />
                        </div>
                      </td>
                      <td className="py-3">{r.scan.breaches?.length || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="text-xs text-slate-500 mt-4">Total scans stored: {scans.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
