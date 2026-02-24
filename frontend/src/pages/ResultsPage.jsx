import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { analysisAPI } from '../utils/api';
import ExposureScore from '../components/ExposureScore';
import BreachList from '../components/BreachList';
import AccountDiscovery from '../components/AccountDiscovery';
import PrivacyRisks from '../components/PrivacyRisks';
import FixSuggestions from '../components/FixSuggestions';

export const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scanResult = location.state?.scanResult;

  const [riskAnalysis, setRiskAnalysis] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(false);

  useEffect(() => {
    if (!scanResult) {
      console.log('No scan result, redirecting to scanner');
      navigate('/scanner');
      return;
    }

    // Fetch admin config to know if HIBP key is present (for UI badges)
    (async () => {
      try {
        const cfg = await fetch('/api/admin/config').then(r => r.json());
        if (cfg?.success) {
          // attach to scanResult for UI
          scanResult._admin = cfg.data;
        }
      } catch (err) {
        // ignore
      }
    })();

    console.log('Scan result received:', scanResult);

    const loadAnalysis = async () => {
      try {
        console.log('Fetching risk analysis...');
        const [riskRes, suggestionsRes] = await Promise.all([
          analysisAPI.risk(scanResult),
          analysisAPI.suggestions(scanResult)
        ]);

        console.log('Risk response:', riskRes.data);
        console.log('Suggestions response:', suggestionsRes.data);

        if (riskRes.data?.success) {
          console.log('Setting risk analysis:', riskRes.data.data);
          setRiskAnalysis(riskRes.data.data);
        } else {
          console.error('Risk analysis failed:', riskRes.data);
          setError('Failed to analyze risk: ' + (riskRes.data?.error || 'Unknown error'));
        }

        if (suggestionsRes.data?.success) {
          console.log('Setting suggestions:', suggestionsRes.data.data);
          setSuggestions(suggestionsRes.data.data);
        } else {
          console.error('Suggestions failed:', suggestionsRes.data);
          setError('Failed to load suggestions: ' + (suggestionsRes.data?.error || 'Unknown error'));
        }

        // Load timeline if breaches exist
        if (scanResult.breaches && scanResult.breaches.length > 0) {
          console.log('Fetching timeline for breaches:', scanResult.breaches);
          const timelineRes = await analysisAPI.timeline(scanResult.breaches);
          console.log('Timeline response:', timelineRes.data);
          if (timelineRes.data?.success) {
            setTimeline(timelineRes.data.data);
          }
        }
      } catch (error) {
        console.error('Error loading analysis:', error);
        console.error('Error response:', error.response?.data);
        setError('Error: ' + (error.response?.data?.error || error.message || 'Failed to load analysis'));
      } finally {
        setLoading(false);
      }
    };

    loadAnalysis();
  }, [scanResult, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block text-6xl mb-4 animate-spin">⟳</div>
          <p className="text-2xl font-bold text-white">Analyzing your exposure...</p>
          <p className="text-slate-400 mt-2">This takes just a few seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-red-900/30 border-2 border-red-500 rounded-xl p-8 text-center">
          <p className="text-2xl font-bold text-red-400 mb-4">❌ Error</p>
          <p className="text-white mb-6">{error}</p>
          <button
            onClick={() => navigate('/scanner')}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-lg transition"
          >
            Try Another Scan
          </button>
        </div>
      </div>
    );
  }


  if (!scanResult) {
    return null;
  }

  // Enable HIBP modal
  const EnableModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => setShowEnableModal(false)} />
      <div className="relative bg-slate-900 rounded-xl p-6 w-11/12 max-w-xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-2">Enable Real Email Breach Checking</h3>
        <p className="text-slate-400 mb-4">HIBP now requires a paid API key. Two options:</p>
        <ol className="text-slate-300 list-decimal ml-5 mb-4">
          <li>Get your own HIBP API key (recommended for production).</li>
          <li>Use our premium plan (contact us) to run HIBP on your behalf.</li>
        </ol>
        <div className="mb-4">
          <label className="block text-slate-300 text-sm mb-2">Paste HIBP API Key (optional)</label>
          <input type="text" placeholder="paste key here" id="hibpKeyInput" className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white" />
        </div>
        <div className="flex gap-3 justify-end">
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded" onClick={() => setShowEnableModal(false)}>Close</button>
          <button
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded text-black font-bold"
            onClick={async () => {
              const key = document.getElementById('hibpKeyInput').value.trim();
              if (!key) return alert('Please paste a key or Close.');
              try {
                const res = await fetch('/api/admin/hibp-key', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ key })
                });
                const j = await res.json();
                if (j.success) {
                  alert('Key saved to backend/.env. Restart backend for full effect.');
                  setShowEnableModal(false);
                } else {
                  alert('Failed: ' + (j.error || 'unknown'));
                }
              } catch (err) {
                alert('Error saving key: ' + err.message);
              }
            }}
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );

  // Main results page
  return (
    <div className="min-h-screen bg-primary text-slate-300 font-sans selection:bg-cyber-blue/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-cyan z-[100]" />

      {/* Navigation */}
      <nav className="border-b border-slate-800/50 sticky top-0 bg-primary/80 backdrop-blur-xl z-[90]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/scanner')}
            className="flex items-center gap-2 group transition-all"
          >
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-sm group-hover:bg-cyber-blue transition-colors">
              <span className="group-hover:text-primary">←</span>
            </div>
            <span className="font-black text-white tracking-tighter">NEW SCAN</span>
          </button>

          <div className="hidden md:flex items-center gap-10">
            <div className="text-center">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Target Identity</p>
              <p className="text-green-400 font-black truncate max-w-xs text-sm">{scanResult.input}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 border border-slate-700 hover:border-cyber-blue rounded-xl text-xs font-black uppercase tracking-widest transition-all"
          >
            TERMINATE SESSION
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">

        {/* Report Header */}
        <div className="mb-16 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-block px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full text-[10px] font-black text-cyber-blue uppercase tracking-widest mb-4">
                Classified: Intelligence Report
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-2">Exposure <span className="text-teal-400">Matrix</span></h1>
              <p className="text-slate-400 font-medium">Detailed protocol for <span className="text-white font-bold">{scanResult.input}</span></p>
            </div>

            <div className="flex items-center gap-4 bg-secondary/50 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm">
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Confidence Index</p>
                <p className="text-lg font-black text-white">{scanResult.confidenceScore || 0}%</p>
              </div>
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center border border-slate-700">
                <div className="w-8 h-8 rounded-full border-4 border-cyber-blue" />
              </div>
            </div>
          </div>
        </div>


        {/* Grid Engine */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Core Metrics */}
          <div className="lg:col-span-12 space-y-8 animate-fade-in delay-100">
            {riskAnalysis ? (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 rounded-[2.5rem] blur-xl opacity-25 group-hover:opacity-40 transition-opacity" />
                <ExposureScore
                  score={riskAnalysis.score}
                  level={riskAnalysis.level}
                  factors={riskAnalysis.factors}
                  recommendation={riskAnalysis.recommendation}
                />
              </div>
            ) : (
              <div className="bg-secondary rounded-[2.5rem] p-12 border border-slate-800 text-center animate-pulse">
                <p className="font-black text-slate-500 uppercase tracking-widest">Recomputing Risk Vectors...</p>
              </div>
            )}
          </div>

          {/* Breaches & Accounts */}
          <div className="lg:col-span-8 space-y-8 animate-fade-in delay-150">
            <section className="bg-secondary/40 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-cyber-rose/20 rounded-xl flex items-center justify-center text-xl">🔒</div>
                  <h2 className="text-2xl font-black text-white tracking-tight underline decoration-cyber-rose/30 decoration-4 underline-offset-8">Infiltration Points</h2>
                </div>
                <span className="text-[10px] font-black text-slate-500 bg-slate-800 px-3 py-1 rounded-full">{scanResult.breaches?.length || 0} Breaches</span>
              </div>
              <BreachList breaches={scanResult.breaches} onTimeline={() => setShowTimeline(!showTimeline)} />
            </section>

            <section className="bg-secondary/40 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-cyber-blue/20 rounded-xl flex items-center justify-center text-xl">📱</div>
                <h2 className="text-2xl font-black text-white tracking-tight underline decoration-cyber-blue/30 decoration-4 underline-offset-8">Identity Nodes</h2>
              </div>
              <AccountDiscovery accounts={scanResult.accountsFound} />
            </section>
          </div>

          {/* Right Column: Intelligence & Fixes */}
          <div className="lg:col-span-4 space-y-8 animate-fade-in delay-200">
            {riskAnalysis && riskAnalysis.risks && (
              <div className="bg-primary/50 border border-slate-800 rounded-[2rem] p-8">
                <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6">Risk Archetypes</h3>
                <PrivacyRisks risks={riskAnalysis.risks} />
              </div>
            )}

            {suggestions && (
              <div className="bg-gradient-to-br from-secondary to-primary border border-slate-700/50 rounded-[2rem] p-8 shadow-2xl">
                <h3 className="text-sm font-black text-teal-400 uppercase tracking-widest mb-6">Recovery Protocols</h3>
                <FixSuggestions
                  urgent={suggestions.urgent}
                  recommended={suggestions.recommended}
                />
              </div>
            )}
          </div>
        </div>

        {/* Global Actions */}
        <div className="mt-20 flex flex-col items-center gap-8 animate-fade-in delay-300">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                const reportContent = `
DIGITAL FOOTPRINT INTELLIGENCE REPORT
Target: ${scanResult.input}
Risk Score: ${riskAnalysis?.score}/100
Risk Level: ${riskAnalysis?.level}
Confidence Index: ${scanResult.confidenceScore}%

BREACHES DETECTED (${scanResult.breaches?.length || 0}):
${scanResult.breaches?.map(b => `- ${b.website} (${b.year}): ${b.severity} severity`).join('\n')}

IDENTITY NODES FOUND (${scanResult.accountsFound?.length || 0}):
${scanResult.accountsFound?.map(a => `- ${a.platform}: ${a.url}`).join('\n')}

RECOMMENDATIONS:
${riskAnalysis?.recommendation}
                `.trim();

                const blob = new Blob([reportContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `DigiFootprint_Report_${scanResult.input.replace(/[^a-z0-9]/gi, '_')}.txt`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
              className="px-10 py-5 bg-white text-primary font-black text-sm uppercase tracking-[0.15em] rounded-2xl hover:scale-105 transition-all shadow-xl"
            >
              📥 Download Full Intel
            </button>

            <button
              onClick={() => navigate('/scanner')}
              className="px-10 py-5 bg-secondary border border-slate-700 text-white font-black text-sm uppercase tracking-[0.15em] rounded-2xl hover:bg-slate-800 transition-all"
            >
              🔄 Refresh Probe
            </button>
          </div>

          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Generated by DigitalFootprint OSINT Engine v1.0.4.52
          </p>
        </div>
      </div>

      {showEnableModal && <EnableModal />}
    </div>
  );
};

export default ResultsPage;