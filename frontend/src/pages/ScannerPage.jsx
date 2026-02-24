import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScanInput from '../components/ScanInput';

export const ScannerPage = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (scanResult) => {
    navigate('/results', { state: { scanResult } });
  };

  return (
    <div className="min-h-screen bg-primary text-slate-300 font-sans selection:bg-cyber-blue/30 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="fixed top-1/4 -right-20 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[120px] animate-pulse-glow" />

      {/* Navigation */}
      <nav className="border-b border-slate-800/50 sticky top-0 bg-primary/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group transition-all"
          >
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-sm group-hover:bg-cyber-blue transition-colors">
              <span className="group-hover:text-primary">←</span>
            </div>
            <span className="font-black text-white tracking-tighter">BACK TO SYSTEMS</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">System Status</span>
              <span className="text-[10px] font-black text-cyber-blue uppercase tracking-[0.2em]">Fully Operational</span>
            </div>
            <div className="w-2 h-2 bg-cyber-blue rounded-full animate-ping" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Privacy <span className="text-teal-400">Probe</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Initialize a deep-pulse scan of your digital footprint. Our engine will cross-reference
            billion-row datasets to secure your identity.
          </p>
        </div>

        {/* Scanner Interface */}
        <div className="relative mb-20 animate-fade-in delay-100">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue/20 via-cyber-purple/20 to-cyber-cyan/20 rounded-[2.5rem] blur-xl opacity-50" />

          <div className="relative bg-secondary border border-slate-700/50 rounded-[2rem] p-4 md:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8 px-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-cyber-rose/50" />
                <div className="w-3 h-3 rounded-full bg-moderate/50" />
                <div className="w-3 h-3 rounded-full bg-safe/50" />
              </div>
              <div className="h-[1px] flex-grow bg-slate-800" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Digital-OS/Scanner-v1.0</span>
            </div>

            <ScanInput onScan={handleScan} isLoading={isScanning} />

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
              {[
                { label: 'OSINT Protocol', value: 'v4.2.0' },
                { label: 'Encryption', value: 'AES-256' },
                { label: 'Query Latency', value: '142ms' },
                { label: 'Data Sources', value: 'Verified' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{stat.label}</span>
                  <span className="text-xs font-bold text-slate-300">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Intelligence Quadrants */}
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in delay-200">
          {[
            {
              title: 'Zero-Storage Policy',
              desc: 'Scanner data is processed in-memory and purged immediately after analysis.',
              icon: '🛡️',
              stat: 'SECURE'
            },
            {
              title: 'Elastic Search',
              desc: 'Parallel queries across global breach repositories for sub-second responses.',
              icon: '⚡',
              stat: 'FAST'
            },
            {
              title: 'Actionable Intelligence',
              desc: 'Detailed protocols to patch leaks and decouple linked accounts.',
              icon: '🧠',
              stat: 'SMART'
            }
          ].map((item, i) => (
            <div key={i} className="bg-secondary/50 border border-slate-800 rounded-3xl p-8 hover:bg-secondary transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <div className="text-4xl">{item.icon}</div>
                <span className="text-[10px] font-black text-cyber-blue bg-cyber-blue/10 px-2 py-1 rounded tracking-widest">{item.stat}</span>
              </div>
              <h3 className="font-black text-white text-lg mb-3 group-hover:text-cyber-blue transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Terminal FAQ */}
        <div className="mt-20 border border-slate-800/50 bg-secondary/30 rounded-3xl p-8 md:p-12 animate-fade-in delay-300">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-6 bg-cyber-blue rounded-full" />
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">System FAQ</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              { q: 'How is the risk score calculated?', a: 'Our algorithm weights breach severity, account linkage, and public exposure signals.' },
              { q: 'Will this affect my credit score?', a: 'No. This is a passive OSINT scan. We do not access financial institutions or credit bureaus.' },
              { q: 'Is the data used for training?', a: 'Absolutely not. We advocate for data sovereignty. Your input is your own.' },
              { q: 'Can I delete found accounts?', a: 'We provide links and protocols to facilitate account deletion on most platforms.' }
            ].map((faq, i) => (
              <div key={i}>
                <h3 className="font-bold text-white mb-2 flex gap-3">
                  <span className="text-cyber-blue opacity-50">Q:</span> {faq.q}
                </h3>
                <p className="text-sm text-slate-400 pl-7 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
