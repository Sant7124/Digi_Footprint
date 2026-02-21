import React, { useState } from 'react';
import { scanAPI } from '../utils/api';

export const ScanInput = ({ onScan, isLoading: externalLoading }) => {
  const [input, setInput] = useState('');
  const [scanType, setScanType] = useState('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!input.trim()) {
      setError('Please enter something to scan');
      return;
    }

    setLoading(true);
    try {
      console.log(`Starting ${scanType} scan for: ${input}`);
      let result; // Declare result only once
      if (scanType === 'email') {
        result = await scanAPI.email(input);
      } else if (scanType === 'username') {
        result = await scanAPI.username(input);
      } else {
        result = await scanAPI.phone(input);
      }

      console.log('Scan API response:', result);
      if (result?.data?.success) {
        onScan(result.data.data);
      } else {
        const backendMsg = result?.data?.error || result?.data?.message || 'Scan returned no data';
        setError(backendMsg);
      }
    } catch (err) {
      console.error('Scan API error:', err);
      const status = err.response?.status;
      const backendMsg = err.response?.data?.error || err.response?.data?.message;
      if (status || backendMsg) {
        setError(`Error${status ? ` ${status}` : ''}: ${backendMsg || err.message}`);
      } else {
        setError('Scan failed. Try again. Network or server error.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Scan Type Selector */}
          <div className="flex p-1 bg-primary/50 border border-slate-800 rounded-2xl gap-1">
            {['email', 'username', 'phone'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setScanType(type)}
                className={`flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${scanType === type
                    ? 'bg-cyber-blue text-primary shadow-lg shadow-cyber-blue/20'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-500 ${(externalLoading || loading) ? 'animate-pulse' : ''}`} />

            <div className="relative scanner-container bg-secondary border border-slate-700/50 rounded-2xl overflow-hidden">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  scanType === 'email'
                    ? 'ENTER TARGET EMAIL...'
                    : scanType === 'username'
                      ? 'ENTER TARGET USERNAME...'
                      : 'ENTER TARGET PHONE (e.g. +1...)'
                }
                className="w-full px-6 py-5 bg-transparent text-white placeholder-slate-600 focus:outline-none font-mono text-lg tracking-tight"
                disabled={externalLoading || loading}
              />
              {(externalLoading || loading) && (
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-cyber-blue animate-scan-line shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
              )}
            </div>
          </div>

          {error && (
            <div className="bg-cyber-rose/10 border border-cyber-rose/20 p-4 rounded-xl flex gap-3 animate-fade-in">
              <span className="text-cyber-rose">⚠️</span>
              <p className="text-sm font-bold text-cyber-rose/90 uppercase tracking-tight">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={externalLoading || loading}
            className={`w-full group relative py-5 px-8 rounded-2xl font-black text-xl uppercase tracking-widest transition-all duration-300 overflow-hidden ${(externalLoading || loading)
                ? 'bg-slate-800 cursor-not-allowed text-slate-600'
                : 'bg-white text-primary hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-white/10'
              }`}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {(externalLoading || loading) ? (
                <>
                  <div className="w-5 h-5 border-4 border-slate-600 border-t-cyber-blue rounded-full animate-spin" />
                  <span>SYNCHRONIZING...</span>
                </>
              ) : (
                <>
                  <span>Initialize Pulse Scan</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScanInput;
