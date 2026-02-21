import React, { useState } from 'react';

export const BreachCard = ({ breach, index }) => {
  const [expanded, setExpanded] = useState(false);

  const severityColor = {
    'critical': 'bg-red-900/40 border-red-600',
    'high': 'bg-orange-600/40 border-orange-500',
    'medium': 'bg-yellow-600/40 border-yellow-500',
    'low': 'bg-blue-600/40 border-blue-500'
  };

  const severityBadge = {
    'critical': 'bg-red-600 text-white',
    'high': 'bg-orange-500 text-white',
    'medium': 'bg-yellow-500 text-white',
    'low': 'bg-blue-500 text-white'
  };

  return (
    <div
      className={`breach-card border-2 rounded-lg p-5 cursor-pointer transition-all ${
        expanded
          ? severityColor[breach.severity] + ' ring-2 ring-offset-2 ring-offset-slate-800'
          : 'bg-slate-700 border-slate-600 hover:border-slate-500'
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-white">{breach.website}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${severityBadge[breach.severity]}`}>
              {breach.severity?.toUpperCase()}
            </span>
          </div>
          <p className="text-slate-300 text-sm">📅 {breach.year}</p>
        </div>
        <span className="text-2xl">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-600 space-y-3 animate-fade-in">
          <div>
            <p className="text-slate-400 text-sm font-semibold mb-2">Data Compromised:</p>
            <div className="flex flex-wrap gap-2">
              {breach.dataLeaked?.map((item, idx) => (
                <span key={idx} className="bg-slate-600/50 px-3 py-1 rounded text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded text-sm text-slate-300 italic">
            💡 Change your password immediately on this site and enable two-factor authentication if available.
          </div>
        </div>
      )}
    </div>
  );
};

export const BreachList = ({ breaches, onTimeline }) => {
  if (!breaches || breaches.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-700 text-center">
        <p className="text-2xl mb-2">✅</p>
        <p className="text-xl font-bold text-green-400">Great News!</p>
        <p className="text-slate-400 mt-2">No breaches found for this account.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">🔓 Breach Detection</h2>
          <p className="text-slate-400">{breaches.length} breach(es) detected</p>
        </div>
        {breaches.length > 0 && (
          <button
            onClick={onTimeline}
            className="px-4 py-2 bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500 rounded-lg text-cyan-300 font-semibold transition-all"
          >
            📊 View Timeline
          </button>
        )}
      </div>

      <div className="space-y-3">
        {breaches.map((breach, idx) => (
          <BreachCard key={idx} breach={breach} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default BreachList;
