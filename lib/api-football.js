// Server-side only: API-Football cached fetch client with free APIs (no key needed)

const cache = new Map();

function getCacheKey(endpoint, params) {
  const sorted = Object.entries(params || {}).sort(([a], [b]) => a.localeCompare(b));
  return `${endpoint}?${sorted.map(([k, v]) => `${k}=${v}`).join("&")}`;
}

// Fetch real data from free APIs (no authentication required)
async function fetchRealData() {
  // Try SofaScore API (free, no auth)
  try {
    console.log("Fetching from SofaScore API...");
    const response = await fetch("https://api.sofascore.com/api/v1/sport/football/events/last");
    if (response.ok) {
      const data = await response.json();
      if (data && data.events && data.events.length > 0) {
        console.log(`SofaScore: Found ${data.events.length} events`);
        return data.events.slice(0, 20).map(event => ({
          id: event.id,
          fixture: {
            id: event.id,
            homeTeam: { id: event.homeTeam?.id, name: event.homeTeam?.name },
            awayTeam: { id: event.awayTeam?.id, name: event.awayTeam?.name },
            status: { short: event.status?.type || "NS", textAr: event.statusDescription }
          },
          goals: { home: event.homeScore?.current || 0, away: event.awayScore?.current || 0 }
        }));
      }
    }
  } catch (err) {
    console.log("SofaScore failed:", err.message);
  }

  // Try FlashScore / SofaScore alternative
  try {
    console.log("Fetching from alternative source...");
    const response = await fetch("https://api.sofascore.com/api/v1/sport/football/events/today");
    if (response.ok) {
      const data = await response.json();
      if (data && data.events && data.events.length > 0) {
        console.log(`Alternative: Found ${data.events.length} events`);
        return data.events.slice(0, 20);
      }
    }
  } catch (err) {
    console.log("Alternative source failed:", err.message);
  }

  // Try ESPN API
  try {
    console.log("Fetching from ESPN API...");
    const response = await fetch("https://site.api.espn.com/v2/site/en/sport/soccer/matches");
    if (response.ok) {
      const data = await response.json();
      if (data && data.leagues && data.leagues.length > 0) {
        console.log("ESPN: Found matches");
        const matches = [];
        data.leagues.forEach(league => {
          if (league.events) {
            matches.push(...league.events);
          }
        });
        return matches.slice(0, 20);
      }
    }
  } catch (err) {
    console.log("ESPN failed:", err.message);
  }

  console.log("All APIs failed, returning null");
  return null;
}

export async function cachedFetch(endpoint, params = {}, ttlMs = 300000) {
  const key = getCacheKey(endpoint, params);
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < ttlMs) {
    console.log(`Using cached data for ${endpoint}`);
    return cached.data;
  }

  try {
    console.log("Fetching from free APIs...");
    const data = await fetchRealData();

    if (data) {
      cache.set(key, { data, timestamp: Date.now() });
      return data;
    }

    if (cached) {
      console.log("Using stale cached data");
      return cached.data;
    }

    return null;
  } catch (error) {
    console.error(`[API] Error fetching ${endpoint}:`, error.message);
    if (cached) {
      return cached.data;
    }
    return null;
  }
}

export function hasApiKey() {
  return true; // Always return true since we use free APIs
}
