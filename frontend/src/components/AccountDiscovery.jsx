import React from 'react';

export const AccountCard = ({ account }) => {
  return (
    <a
      href={account.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 hover:border-cyan-500 rounded-lg p-4 transition-all group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{account.icon}</span>
          <div>
            <p className="font-bold text-white group-hover:text-cyan-300">{account.platform}</p>
            <p className="text-sm text-slate-400">Profile Found</p>
          </div>
        </div>
        <span className="text-2xl">↗</span>
      </div>
    </a>
  );
};

export const AccountDiscovery = ({ accounts }) => {
  if (!accounts || accounts.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-700 text-center">
        <p className="text-2xl mb-2">🔍</p>
        <p className="text-lg font-bold text-slate-300">No public accounts found</p>
        <p className="text-slate-400 mt-2">This email/username isn't linked to major platforms.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-700">
      <h2 className="text-3xl font-bold text-white mb-2">🌐 Account Discovery</h2>
      <p className="text-slate-400 mb-6">{accounts.length} public account(s) found — click to open verified profiles</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account, idx) => (
          <AccountCard key={idx} account={account} />
        ))}
      </div>
    </div>
  );
};

export default AccountDiscovery;
