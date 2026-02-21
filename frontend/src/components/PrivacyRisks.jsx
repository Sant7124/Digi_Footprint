import React from 'react';

const riskLevelColor = {
  'critical': 'bg-red-600/30 border-red-500',
  'high': 'bg-orange-600/30 border-orange-500',
  'medium': 'bg-yellow-600/30 border-yellow-500',
  'low': 'bg-blue-600/30 border-blue-500'
};

export const PrivacyRisks = ({ risks }) => {
  if (!risks || risks.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-700 text-center">
        <p className="text-2xl mb-2">✨</p>
        <p className="text-lg font-bold text-slate-300">No privacy risks detected</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-700">
      <h2 className="text-3xl font-bold text-white mb-2">🛡️ Privacy Risks</h2>
      <p className="text-slate-400 mb-6">{risks.length} risk(s) identified</p>

      <div className="space-y-3">
        {risks.map((risk, idx) => (
          <div
            key={idx}
            className={`border-2 rounded-lg p-4 ${riskLevelColor[risk.level]}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl mt-1">
                {risk.level === 'critical' ? '🚨' : risk.level === 'high' ? '⚠️' : '⚡'}
              </span>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">{risk.risk}</h3>
                <p className="text-sm text-slate-300">{risk.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyRisks;
