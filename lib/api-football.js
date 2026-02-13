// Server-side only: API-Football cached fetch client with real free APIs

const cache = new Map();

const API_BASE = process.env.FOOTBALL_API_BASE || "https://v3.football.api-sports.io";
const API_KEY = process.env.FOOTBALL_API_KEY;

function getCacheKey(endpoint, params) {
  const sorted = Object.entries(params || {}).sort(([a], [b]) => a.localeCompare(b));
  return `${endpoint}?${sorted.map(([k, v]) => `${k}=${v}`).join("&")}`;
}

// Fetch real data from free APIs
async function fetchRealData() {
  try {
    // Try api-football-v1 (free endpoint)
    const response = await fetch("https://api.api-football.com/matches?live=all");
    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.log("Primary free API failed");
  }

  try {
    // Try Rapid API alternative
    const response = await fetch("https://api.jsonsilo.com/api/v2/sports/football/matches");
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.log("Secondary API failed");
  }

  return null;
}

export async function cachedFetch(endpoint, params = {}, ttlMs = 300000) {
  const key = getCacheKey(endpoint, params);
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < ttlMs) {
    return cached.data;
  }

  try {
    let data = null;

    // Priority 1: If API_KEY exists, use API-Sports
    if (API_KEY) {
      console.log("Using API-Sports with key...");
      const queryString = Object.entries(params)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&");

      const url = `${API_BASE}${endpoint}${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url, {
        headers: {
          "x-apisports-key": API_KEY,
        },
      });

      if (response.ok) {
        const json = await response.json();
        data = json.response || [];
      }
    }

    // Priority 2: If no data yet, try real free APIs
    if (!data) {
      console.log("Attempting to fetch from free APIs...");
      data = await fetchRealData();
    }

    // Cache the result if we got data
    if (data) {
      cache.set(key, { data, timestamp: Date.now() });
      return data;
    }

    // If still no data, return cached if available
    if (cached) {
      return cached.data;
    }

    return null;
  } catch (error) {
    console.error(`[API-Football] Error fetching ${endpoint}:`, error.message);
    if (cached) {
      return cached.data;
    }
    return null;
  }
}

export function hasApiKey() {
  return Boolean(API_KEY);
}
