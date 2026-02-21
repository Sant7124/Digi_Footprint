export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#020617', // Deep Slate
        secondary: '#0f172a',
        accent: '#06b6d4',
        'cyber-blue': '#0ea5e9',
        'cyber-cyan': '#22d3ee',
        'cyber-purple': '#a855f7',
        'cyber-rose': '#f43f5e',
        safe: '#10b981',
        low: '#3b82f6',
        moderate: '#f59e0b',
        high: '#ef4444',
        critical: '#7f1d1d'
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'brightness(1)' },
          '50%': { opacity: '0.4', filter: 'brightness(1.5)' }
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%231e293b' fill-opacity='0.1'/%3E%3C/svg%3E\")",
      }
    }
  },
  plugins: []
};
