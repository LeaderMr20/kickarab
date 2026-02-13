import { useState, useEffect, useMemo } from "react";
import MatchCard from "./MatchCard";

const LEAGUE_FILTERS = [
  { key: "all", label: "الكل" },
  { key: "epl", label: "الدوري الإنجليزي", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { key: "spl", label: "الدوري السعودي", icon: "🇸🇦" },
  { key: "ucl", label: "دوري الأبطال", icon: "🏆" },
  { key: "laliga", label: "الدوري الإسباني", icon: "🇪🇸" },
];

const leagueIdMap = { epl: 39, spl: 307, ucl: 2, laliga: 140 };

function SkeletonCard() {
  return (
    <div className="glass-card p-5 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-32 bg-gray-700/50 rounded skeleton-shimmer" />
        <div className="h-5 w-16 bg-gray-700/50 rounded-full skeleton-shimmer" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-700/50 skeleton-shimmer" />
          <div className="h-3 w-16 mx-auto bg-gray-700/50 rounded skeleton-shimmer" />
        </div>
        <div className="h-8 w-20 bg-gray-700/50 rounded skeleton-shimmer" />
        <div className="flex-1 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-700/50 skeleton-shimmer" />
          <div className="h-3 w-16 mx-auto bg-gray-700/50 rounded skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function LiveMatches() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [allMatches, setAllMatches] = useState([]);
  const [hasLive, setHasLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch('/api/matches');
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setAllMatches(data.matches || []);
        setHasLive(data.hasLive || false);
      } catch (err) {
        console.error('Matches fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
    // Auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  const matches = useMemo(() => {
    if (activeFilter === "all") return allMatches;
    const leagueId = leagueIdMap[activeFilter];
    return allMatches.filter((m) => m.league.id === leagueId);
  }, [allMatches, activeFilter]);

  return (
    <section id="matches" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">
            <span className="gradient-text">مباريات</span> اليوم
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            تابع نتائج وأحداث المباريات لحظة بلحظة
          </p>
        </div>

        {/* League Toggle */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {LEAGUE_FILTERS.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                  : "bg-pitch-card text-gray-400 hover:text-white hover:bg-pitch-card/80 border border-gray-800"
              }`}
            >
              {filter.icon && <span className="ml-1">{filter.icon}</span>}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Matches Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div key={match.id} className="animate-slide-up">
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚽</div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              لا توجد مباريات اليوم
            </h3>
            <p className="text-gray-600">
              ترقب مباريات الجولة القادمة!
            </p>
          </div>
        )}

        {/* Live indicator */}
        {hasLive && (
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <span className="text-xs font-semibold text-brand-400">
                يتم التحديث تلقائياً كل دقيقة
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
