import React from 'react';

const getExposureColor = (level) => {
  const colors = {
    'SAFE': 'from-green-500 to-green-600',
    'LOW': 'from-blue-500 to-blue-600',
    'MODERATE': 'from-yellow-500 to-orange-600',
    'HIGH': 'from-red-500 to-red-600',
    'CRITICAL': 'from-red-700 to-red-900'
  };
  return colors[level] || 'from-slate-500 to-slate-600';
};

const getExposureBg = (level) => {
  const colors = {
    'SAFE': 'bg-green-500/20 border-green-500',
    'LOW': 'bg-blue-500/20 border-blue-500',
    'MODERATE': 'bg-yellow-500/20 border-yellow-500',
    'HIGH': 'bg-red-500/20 border-red-500',
    'CRITICAL': 'bg-red-900/30 border-red-700'
  };
  return colors[level] || 'bg-slate-500/20 border-slate-500';
};

export const ExposureScore = ({ score, level, factors, recommendation }) => {
  const percentage = score;

  return (
    <div className="w-full bg-slate-800 rounded-2xl p-8 border-2 border-slate-700">
      <h2 className="text-3xl font-bold mb-2 text-white">Exposure Score</h2>
      <p className="text-slate-400 mb-6">Your online privacy risk assessment based on real API data</p>

      {/* Main Score Display */}
      <div className={`bg-gradient-to-r ${getExposureColor(level)} p-8 rounded-xl mb-6 glow`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-200 text-lg mb-2">Overall Risk</p>
            <p className="text-6xl font-bold text-white">{score}</p>
            <p className="text-xl font-bold text-white/80 mt-2">/ 100</p>
          </div>
          <div className="text-6xl">{getRiskEmoji(level)}</div>
        </div>
      </div>

      {/* Level Badge */}
      <div className={`border-2 rounded-lg p-4 mb-6 text-center font-bold text-xl ${getExposureBg(level)}`}>
        <span className="text-white">{level} EXPOSURE</span>
      </div>

      {/* Recommendation */}
      {recommendation && (
        <div className="bg-slate-700/50 border-l-4 border-cyan-500 p-4 rounded mb-6">
          <p className="text-white font-semibold mb-1">💡 Recommendation:</p>
          <p className="text-slate-200 text-sm">{recommendation}</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Safe</span>
          <span>Critical</span>
        </div>
        <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getExposureColor(level)} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Contributing Factors */}
      {factors && factors.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-slate-300 font-semibold">Risk Factors:</p>
          <ul className="space-y-1">
            {factors.map((factor, idx) => (
              <li key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                <span className="text-red-400">⚠️</span> {factor}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

function getRiskEmoji(level) {
  const emojis = {
    'SAFE': '✅',
    'LOW': '⚠️',
    'MODERATE': '⚠️',
    'HIGH': '🔴',
    'CRITICAL': '🚨'
  };
  return emojis[level] || '❓';
}

export default ExposureScore;
