import { calculateExposureScore, getExposureLevel, getExposureColor } from '../utils/riskCalculator.js';
import { privacyRisksTemplate, suggestionsTemplate } from '../data/breachData.js';

// Analyze exposure risk with professional recommendations
export const analyzeRisk = (req, res) => {
  try {
    const { scanResult } = req.body;

    console.log('[ANALYSIS] Received scanResult:', {
      input: scanResult?.input,
      breeches: scanResult?.breaches?.length,
      accounts: scanResult?.accountsFound?.length,
      keys: Object.keys(scanResult || {})
    });

    if (!scanResult) {
      console.error('[ANALYSIS] No scanResult provided');
      return res.status(400).json({ error: 'Scan result is required' });
    }

    // Calculate professional exposure score
    const exposureData = calculateExposureScore(scanResult);
    console.log('[ANALYSIS] Calculated exposure:', { score: exposureData.score, level: exposureData.level });

    // Determine applicable privacy risks based on real data
    const applicableRisks = [];
    
    if (scanResult.emailExposed) {
      applicableRisks.push({
        ...privacyRisksTemplate[0],
        websites: scanResult.breaches?.map(b => b.website).slice(0, 3) || []
      });
    }
    if (scanResult.reusedUsername && scanResult.accountsFound?.length > 1) {
      applicableRisks.push({
        ...privacyRisksTemplate[1],
        platforms: scanResult.accountsFound?.map(a => a.platform).slice(0, 3) || []
      });
    }
    if (scanResult.phoneExposed) {
      applicableRisks.push({
        ...privacyRisksTemplate[2],
        websites: scanResult.breaches?.map(b => b.website).slice(0, 2) || []
      });
    }
    if (scanResult.breaches?.length > 0) {
      applicableRisks.push({
        ...privacyRisksTemplate[3],
        breachCount: scanResult.breaches.length
      });
    }
    if (scanResult.accountsFound?.length > 3) {
      applicableRisks.push({
        ...privacyRisksTemplate[4],
        accountCount: scanResult.accountsFound.length
      });
    }

    const responseData = {
      success: true,
      data: {
        score: exposureData.score,
        level: exposureData.level,
        color: getExposureColor(exposureData.level),
        factors: exposureData.factors,
        recommendation: exposureData.recommendation,
        risks: applicableRisks.slice(0, 5),
        generatedAt: new Date(),
        dataSource: 'Real-time API analysis'
      }
    };

    console.log('[ANALYSIS] Sending response:', {
      success: responseData.success,
      score: responseData.data.score,
      risks: responseData.data.risks.length
    });

    res.json(responseData);
  } catch (error) {
    console.error('[ANALYSIS] Error analyzing risk:', error);
    res.status(500).json({ error: 'Failed to analyze risk', details: error.message });
  }
};

// Get personalized suggestions based on real findings
export const getSuggestions = (req, res) => {
  try {
    const { scanResult } = req.body;

    if (!scanResult) {
      return res.status(400).json({ error: 'Scan result is required' });
    }

    const suggestions = [];
    const urgentSuggestions = [];

    // High priority suggestions
    if (scanResult.breaches && scanResult.breaches.length > 0) {
      urgentSuggestions.push({
        ...suggestionsTemplate[0],
        sites: scanResult.breaches.map(b => b.website).slice(0, 5),
        breachCount: scanResult.breaches.length,
        priority: 1
      });
    }

    if (scanResult.accountsFound && scanResult.accountsFound.length > 0) {
      urgentSuggestions.push({
        ...suggestionsTemplate[1],
        platforms: scanResult.accountsFound.map(a => a.platform).slice(0, 5),
        accountCount: scanResult.accountsFound.length,
        priority: 1
      });
    }

    // Medium priority suggestions
    if (scanResult.phoneExposed) {
      suggestions.push({
        ...suggestionsTemplate[2],
        severity: 'critical',
        priority: 2
      });
    }

    if (scanResult.accountsFound && scanResult.accountsFound.length > 5) {
      suggestions.push({
        ...suggestionsTemplate[3],
        count: scanResult.accountsFound.length,
        priority: 2
      });
    }

    // Always recommend these for professional practice
    suggestions.push(suggestionsTemplate[4]); // Privacy settings - priority 2
    suggestions.push(suggestionsTemplate[5]); // Password manager - priority 1

    // Combine and sort by priority
    const allSuggestions = [...urgentSuggestions, ...suggestions];
    const sorted = allSuggestions.sort((a, b) => (a.priority || 2) - (b.priority || 2));

    res.json({
      success: true,
      data: {
        urgent: urgentSuggestions,
        recommended: suggestions,
        all: sorted.slice(0, 8),
        totalSuggestions: sorted.length,
        generatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error getting suggestions:', error);
    res.status(500).json({ error: 'Failed to get suggestions', details: error.message });
  }
};

// Get detailed breach timeline with professional analysis
export const getBreachTimeline = (req, res) => {
  try {
    const { breaches } = req.body;

    if (!breaches || !Array.isArray(breaches)) {
      return res.status(400).json({ error: 'Breaches array is required' });
    }

    if (breaches.length === 0) {
      return res.json({
        success: true,
        data: {
          timeline: [],
          message: 'No breaches detected - Great news!',
          generatedAt: new Date()
        }
      });
    }

    // Sort by year (most recent first) and add analysis
    const currentYear = new Date().getFullYear();
    const timeline = breaches
      .sort((a, b) => b.year - a.year)
      .map((breach, index) => {
        const yearsAgo = currentYear - breach.year;
        const isRecent = yearsAgo <= 2;
        const isSevere = breach.severity === 'critical' || breach.severity === 'high';
        
        return {
          ...breach,
          yearsAgo,
          isRecent,
          isSevere,
          position: index,
          recommendation: getBreachRecommendation(breach, yearsAgo),
          urgency: isRecent ? 'HIGH' : 'MEDIUM'
        };
      });

    res.json({
      success: true,
      data: {
        timeline,
        stats: {
          totalBreaches: timeline.length,
          recentBreaches: timeline.filter(b => b.isRecent).length,
          severeBreaches: timeline.filter(b => b.isSevere).length,
          oldestBreach: Math.max(...timeline.map(b => b.yearsAgo))
        },
        generatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error getting timeline:', error);
    res.status(500).json({ error: 'Failed to get timeline', details: error.message });
  }
};

/**
 * Get specific recommendation based on breach details
 */
function getBreachRecommendation(breach, yearsAgo) {
  if (yearsAgo <= 1) {
    return '⚠️ RECENT BREACH - Change password immediately!';
  } else if (yearsAgo <= 3) {
    return '🔴 Change password now if you haven\'t already. Enable 2FA.';
  } else if (yearsAgo <= 5) {
    return '🟡 If you used same password, change it. Check account for unauthorized access.';
  } else {
    return '🔵 Old breach. Likely password rehashed/expired. Still verify account activity.';
  }
}

