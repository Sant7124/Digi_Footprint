import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary text-slate-300 font-sans selection:bg-cyber-blue/30 selection:text-cyber-cyan">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="fixed top-0 -left-4 w-72 h-72 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="fixed bottom-0 -right-4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl animate-pulse-glow" />

      {/* Navigation */}
      <nav className="border-b border-slate-800/50 sticky top-0 bg-primary/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center shadow-lg shadow-cyber-blue/20">
              <span className="text-xl">🔐</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white">
              DIGI_<span className="text-green-400">FOOTPRINT</span>
            </h1>
          </div>
          <button
            onClick={() => navigate('/scanner')}
            className="px-6 py-2 bg-secondary border border-slate-700 hover:border-cyber-blue text-white font-bold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] group"
          >
            <span className="group-hover:text-cyber-blue transition-colors">Launch Scanner</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full text-cyber-blue text-xs font-bold mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-blue"></span>
          </span>
          REAL-TIME PRIVACY INTELLIGENCE
        </div>

        <h2 className="text-6xl md:text-8xl font-black mb-8 text-white tracking-tight animate-fade-in leading-[1.1]">
          See What The <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-purple animate-pulse-glow">
            Web Knows About You
          </span>
        </h2>

        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed">
          Your digital footprint is larger than you think. Our OSINT-powered scanner uncovers
          leaked data, linked accounts, and privacy risks in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <button
            onClick={() => navigate('/scanner')}
            className="px-10 py-5 
            bg-gradient-to-br from-[#5EE7DF] to-[#66DDAA]
            text-slate-900 font-extrabold text-lg
            rounded-2xl
            backdrop-blur-md
            transition-all duration-300
            shadow-[0_10px_30px_rgba(80,255,200,0.35)]
            hover:shadow-[0_15px_40px_rgba(80,255,200,0.55)]
            hover:scale-105 active:scale-95"
          >
            🔍 Start Deep Scan
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-5 bg-slate-800/50 border border-slate-700 text-white font-black text-lg rounded-2xl hover:bg-slate-800 transition-all duration-300"
          >
            Learn Methodology
          </button>
        </div>

        {/* Floating elements for "vibe" */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyber-blue/5 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyber-purple/5 blur-[100px] pointer-events-none" />
      </section>

      {/* Stats / Proof Section */}
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-slate-800/50 bg-secondary/30 backdrop-blur-sm rounded-3xl mb-24">
        {[
          { label: 'Breach Sources', value: '500+' },
          { label: 'Platforms Tracked', value: '1,000+' },
          { label: 'Identity Signals', value: '15+' },
          { label: 'Scan Speed', value: '< 10s' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black text-white mb-4">The Privacy Engine</h3>
          <p className="text-slate-400">Three layers of analysis to secure your digital identity</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Identity Mapping',
              desc: 'We use advanced heuristics to map your username and email across hundreds of known social and professional platforms.',
              icon: '👤',
              color: 'text-cyber-blue'
            },
            {
              step: '02',
              title: 'Breach Intelligence',
              desc: 'Instant cross-referencing against massive data breach archives to identify exactly where your credentials were leaked.',
              icon: '💥',
              color: 'text-cyber-rose'
            },
            {
              step: '03',
              title: 'Risk Scoring',
              desc: 'Our proprietary algorithm calculates your exposure level and provides actionable steps to reclaim your privacy.',
              icon: '🛡️',
              color: 'text-cyber-purple'
            }
          ].map((item, i) => (
            <div key={i} className="group bg-secondary border border-slate-800 rounded-3xl p-10 hover:border-cyber-blue/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-6xl font-black opacity-5 group-hover:opacity-10 transition-opacity">
                {item.step}
              </div>
              <div className="text-5xl mb-8">{item.icon}</div>
              <h4 className="text-2xl font-black text-white mb-4 group-hover:text-cyber-blue transition-colors">
                {item.title}
              </h4>
              <p className="text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-secondary to-primary rounded-[3rem] mb-24 border border-slate-800/50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyber-blue/5 skew-x-12 translate-x-1/2" />

        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-black text-white mb-8 leading-tight">
              Why Your Digital <br />
              <span className="text-teal-400">Footprint Matters</span>
            </h3>
            <div className="space-y-8">
              {[
                { title: 'Credential Stuffing', desc: 'Hackers use old breach data to gain entry into your current active accounts.' },
                { title: 'Identity Linkage', desc: 'Marketing firms and bad actors link your anonymous accounts to your real identity.' },
                { title: 'Social Engineering', desc: 'Public profile data provides the perfect "vibe" for targeted phishing attacks.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-xl border border-slate-700">
                    {i === 0 ? '🔑' : i === 1 ? '🔗' : '🎯'}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary/50 border border-slate-700 rounded-3xl p-8 shadow-2xl animate-float">
            <div className="space-y-4">
              <div className="h-4 w-1/2 bg-slate-800 rounded-full animate-pulse" />
              <div className="h-4 w-3/4 bg-slate-800 rounded-full animate-pulse delay-75" />
              <div className="h-24 w-full bg-cyber-blue/10 border border-cyber-blue/20 rounded-2xl flex items-center justify-center">
                <span className="text-cyber-blue font-mono font-bold">ANALYZING EXPOSURE...</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 bg-slate-800 rounded-xl" />
                <div className="h-12 bg-slate-800 rounded-xl" />
                <div className="h-12 bg-slate-800 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-blue/20 rounded-full blur-[120px] pointer-events-none" />
        <h2 className="text-5xl font-black text-white mb-6 tracking-tight">
          Ready to See the <span className="text-teal-400">Truth</span>?
        </h2>
        <p className="text-xl text-slate-400 mb-12">
          It takes 10 seconds to find what's out there. No account needed.
        </p>
        <button
          onClick={() => navigate('/scanner')}
          className="px-12 py-6
           bg-gradient-to-r from-[#5EE7DF] via-[#66DDAA] to-[#7CF7D4]
           text-slate-900 font-black text-2xl
           rounded-2xl
           transition-all duration-300
           shadow-[0_10px_28px_rgba(80,255,200,0.28)]
           hover:shadow-[0_14px_38px_rgba(80,255,200,0.45)]
           hover:scale-105"
        >
          ✨ Initialize Scan
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-sm">
              <span>🔐</span>
            </div>
            <span className="font-black text-green-400 tracking-tighter">DIGI_FOOTPRINT</span>
          </div>
          <p className="text-slate-500 text-sm max-w-md text-center">
            Open-source privacy tool. We never store search data.
            All intelligence gathered from public OSINT sources.
          </p>
          <div className="flex gap-6 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-cyber-blue transition-colors">Github</a>
            <a href="#" className="hover:text-cyber-blue transition-colors">API Docs</a>
            <a href="#" className="hover:text-cyber-blue transition-colors">Transparency</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
