// Server-side only: API-Football cached fetch client

const cache = new Map();

const API_BASE = process.env.FOOTBALL_API_BASE || "https://v3.football.api-sports.io";
const API_KEY = process.env.FOOTBALL_API_KEY;

function getCacheKey(endpoint, params) {
  const sorted = Object.entries(params || {}).sort(([a], [b]) => a.localeCompare(b));
  return `${endpoint}?${sorted.map(([k, v]) => `${k}=${v}`).join("&")}`;
}

export async function cachedFetch(endpoint, params = {}, ttlMs = 300000) {
  if (!API_KEY) return null;

  const key = getCacheKey(endpoint, params);
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < ttlMs) {
    return cached.data;
  }

  try {
    const queryString = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");

    const url = `${API_BASE}${endpoint}${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      headers: {
        "x-apisports-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const json = await response.json();
    const data = json.response || [];

    cache.set(key, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error(`[API-Football] Error fetching ${endpoint}:`, error.message);
    // Return stale cache if available
    if (cached) {
      return cached.data;
    }
    return null;
  }
}

export function hasApiKey() {
  return Boolean(API_KEY);
}
