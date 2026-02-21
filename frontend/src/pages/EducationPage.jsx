import React from 'react';
import { useNavigate } from 'react-router-dom';

export const EducationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 sticky top-0 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-cyber-blue flex items-center gap-2 hover:text-cyan-400 transition-all"
          >
            ← DigitalFootprint
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold text-white mb-4">Privacy & Security Guide</h1>
        <p className="text-xl text-slate-400 mb-12">Everything you need to know about protecting your online identity</p>

        {/* Core Sections */}
        <div className="space-y-12">
          {/* Section 1: Understanding Your Risk */}
          <section className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">📊 Understanding Your Exposure Score</h2>
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="font-bold text-green-400 text-lg mb-2">✅ SAFE (0-10)</h3>
                <p>Your online presence is minimal and well-protected. Keep up the good work!</p>
              </div>
              <div>
                <h3 className="font-bold text-blue-400 text-lg mb-2">🟦 LOW (11-25)</h3>
                <p>You have some accounts but they're not heavily exposed. Minor improvements recommended.</p>
              </div>
              <div>
                <h3 className="font-bold text-yellow-400 text-lg mb-2">🟧 MODERATE (26-50)</h3>
                <p>Your information exists in multiple places. Follow our suggestions to reduce risk.</p>
              </div>
              <div>
                <h3 className="font-bold text-orange-400 text-lg mb-2">🔴 HIGH (51-75)</h3>
                <p>Significant exposure detected. Act now on the urgent recommendations.</p>
              </div>
              <div>
                <h3 className="font-bold text-red-600 text-lg mb-2">🟥 CRITICAL (76-100)</h3>
                <p>Your data is highly exposed. Immediate action is required for your safety.</p>
              </div>
            </div>
          </section>

          {/* Section 2: Common Threats */}
          <section className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">⚠️ Common Online Threats</h2>
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">🔓 Data Breaches</h3>
                <p className="text-slate-300">When companies get hacked, attackers steal user data including emails, passwords, and personal info.</p>
                <p className="text-xs text-slate-400 mt-2">💡 Tip: Use unique passwords for each account. A breach of one site won't compromise others.</p>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">📞 Phishing & Social Engineering</h3>
                <p className="text-slate-300">Attackers pretend to be legitimate companies via email, SMS, or calls to trick you into revealing information.</p>
                <p className="text-xs text-slate-400 mt-2">💡 Tip: Never click links in unsolicited emails. Verify requests by contacting companies directly.</p>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">🎯 Identity Theft</h3>
                <p className="text-slate-300">With your personal info, criminals can open accounts, apply for loans, or commit fraud in your name.</p>
                <p className="text-xs text-slate-400 mt-2">💡 Tip: Monitor your credit report and set fraud alerts with credit bureaus.</p>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">📱 Spam & Scams</h3>
                <p className="text-slate-300">Leaked phone numbers and emails make you a target for scams, spam calls, and fraudulent messages.</p>
                <p className="text-xs text-slate-400 mt-2">💡 Tip: Don't answer calls from unknown numbers. Report spam and block numbers.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Best Practices */}
          <section className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">🛡️ Essential Security Practices</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-3 text-lg">1. Strong, Unique Passwords</h3>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>✓ Use 12+ characters with uppercase, lowercase, numbers, symbols</li>
                  <li>✓ Never reuse passwords across sites</li>
                  <li>✓ Use a password manager (1Password, Bitwarden, LastPass)</li>
                  <li>✗ Don't use your name, birthday, or common words</li>
                </ul>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-3 text-lg">2. Two-Factor Authentication (2FA)</h3>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>✓ Enables on all important accounts</li>
                  <li>✓ Prefer authenticator apps over SMS when possible</li>
                  <li>✓ Save backup codes in a secure location</li>
                  <li>✗ Don't rely only on SMS (vulnerable to SIM swap attacks)</li>
                </ul>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-3 text-lg">3. Public Profile Management</h3>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>✓ Limit what's visible on social platforms</li>
                  <li>✓ Remove sensitive info (phone, address, birthdate)</li>
                  <li>✓ Delete accounts you no longer use</li>
                  <li>✗ Don't post personal info publicly</li>
                </ul>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-3 text-lg">4. Monitor Your Accounts</h3>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>✓ Regularly check account login history</li>
                  <li>✓ Monitor credit reports (annualcreditreport.com)</li>
                  <li>✓ Enable security alerts</li>
                  <li>✗ Don't ignore suspicious activity</li>
                </ul>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-3 text-lg">5. Safe Browsing Habits</h3>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>✓ Use HTTPS websites (look for 🔒 icon)</li>
                  <li>✓ Avoid public Wi-Fi for sensitive activities</li>
                  <li>✓ Keep software updated</li>
                  <li>✗ Don't click suspicious links or download files from untrusted sources</li>
                </ul>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-3 text-lg">6. Regular Scans & Updates</h3>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>✓ Scan periodically (use this tool!)</li>
                  <li>✓ Keep OS, browser, and apps updated</li>
                  <li>✓ Use antivirus software</li>
                  <li>✗ Don't ignore security update notifications</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: If You've Been Breached */}
          <section className="bg-slate-800 border-2 border-red-700 rounded-2xl p-8 bg-red-900/10">
            <h2 className="text-3xl font-bold text-white mb-4">🚨 What to Do If You've Been Breached</h2>
            <ol className="space-y-3 text-slate-300 list-decimal list-inside">
              <li><strong>Change Your Password</strong> - Use a strong, unique password for that account immediately</li>
              <li><strong>Check Other Accounts</strong> - If you used the same password elsewhere, change it on all those sites</li>
              <li><strong>Enable 2FA</strong> - Add two-factor authentication to prevent unauthorized access</li>
              <li><strong>Monitor Credit</strong> - Watch for identity theft signs. Place a fraud alert if needed</li>
              <li><strong>Contact the Company</strong> - If personal info like address or SSN was exposed, file reports</li>
              <li><strong>Consider Credit Lock</strong> - Freezing your credit prevents new accounts opened in your name</li>
              <li><strong>Keep Records</strong> - Document the breach and any fraud for legal purposes</li>
            </ol>
          </section>

          {/* Section 5: Resources */}
          <section className="bg-slate-800 border-2 border-slate-700 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">📚 Helpful Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">🔐 Security Tools</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Bitwarden - Free password manager</li>
                  <li>• Authy - 2FA authentication app</li>
                  <li>• Have I Been Pwned - Check if your email was breached</li>
                  <li>• Mozilla Firefox - Privacy-focused browser</li>
                </ul>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">📖 Learning Resources</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• CISA Cybersecurity Tips</li>
                  <li>• OWASP Top 10</li>
                  <li>• Privacy International</li>
                  <li>• Electronic Frontier Foundation (EFF)</li>
                </ul>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">🔍 Monitoring Services</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Annual Credit Report (free credit check)</li>
                  <li>• Credit Karma (free credit monitoring)</li>
                  <li>• DigitalFootprint Scanner</li>
                  <li>• Have I Been Pwned alerts</li>
                </ul>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">⚠️ If You Need Help</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• FTC Identity Theft Help</li>
                  <li>• FBI IC3 (Internet Crime Complaint)</li>
                  <li>• Local Law Enforcement</li>
                  <li>• Identity Theft Protection Services</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 border-2 border-cyber-blue rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to check your exposure?</h2>
          <button
            onClick={() => navigate('/scanner')}
            className="px-8 py-3 bg-cyber-blue hover:bg-cyan-400 text-black font-bold rounded-lg transition-all glow"
          >
            🔍 Start Privacy Scan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
