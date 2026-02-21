import React from 'react';

export const SuggestionCard = ({ suggestion, index }) => {
  const priorityColor = suggestion.priority === 1 ? 'border-red-500' : 'border-yellow-500';
  const priorityBg = suggestion.priority === 1 ? 'bg-red-600/20' : 'bg-yellow-600/20';

  return (
    <div className={`bg-slate-700 border-2 ${priorityColor} ${priorityBg} rounded-lg p-5 transition-all hover:shadow-lg`}>
      <div className="flex items-start gap-4">
        <span className="text-4xl">{suggestion.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-white">{suggestion.title}</h3>
            {suggestion.priority === 1 && (
              <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                URGENT
              </span>
            )}
          </div>
          <p className="text-slate-300 text-sm mb-3">{suggestion.description}</p>

          {suggestion.sites && suggestion.sites.length > 0 && (
            <div className="text-xs text-slate-400 bg-slate-800/50 p-2 rounded">
              <strong>Affected sites:</strong> {suggestion.sites.join(', ')}
            </div>
          )}
          {suggestion.platforms && suggestion.platforms.length > 0 && (
            <div className="text-xs text-slate-400 bg-slate-800/50 p-2 rounded">
              <strong>Platforms:</strong> {suggestion.platforms.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const FixSuggestions = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  // Separate urgent and normal suggestions
  const urgent = suggestions.filter(s => s.priority === 1);
  const normal = suggestions.filter(s => s.priority !== 1);

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-700">
      <h2 className="text-3xl font-bold text-white mb-2">💡 Fix Suggestions</h2>
      <p className="text-slate-400 mb-6">Steps to improve your online privacy</p>

      {urgent.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-red-400 mb-4">🔴 Do This NOW</h3>
          <div className="space-y-3">
            {urgent.map((suggestion, idx) => (
              <SuggestionCard key={idx} suggestion={suggestion} index={idx} />
            ))}
          </div>
        </div>
      )}

      {normal.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-yellow-400 mb-4">⚡ Also Consider</h3>
          <div className="space-y-3">
            {normal.map((suggestion, idx) => (
              <SuggestionCard key={idx} suggestion={suggestion} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FixSuggestions;
