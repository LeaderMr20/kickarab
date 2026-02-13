import { useState, useEffect, useCallback } from "react";
import { fallbackMatches } from "../lib/fallbackData";
import { fallbackWeeklyStars } from "../lib/fallbackData";

export function useLiveData(url, { refreshInterval = 0, enabled = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err);
      // Fallback to static data on error
      if (url === "/api/matches") {
        setData({ matches: fallbackMatches });
      } else if (url === "/api/weekly-stars") {
        setData({ stars: fallbackWeeklyStars });
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (!enabled) return;

    setLoading(true);
    fetchData();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval, enabled]);

  return { data, loading, error, refetch: fetchData };
}
