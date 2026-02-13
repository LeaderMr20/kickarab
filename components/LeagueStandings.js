import { useState, useEffect } from "react";

function StandingsTable({ league }) {
  return (
    <div className="glass-card overflow-hidden">
      {/* League Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-800">
        <span className="text-2xl">{league.icon}</span>
        <h3 className="text-lg font-bold text-white">{league.league}</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-800/50">
              <th className="py-3 px-3 text-right w-8">#</th>
              <th className="py-3 px-2 text-right">الفريق</th>
              <th className="py-3 px-2 text-center">لعب</th>
              <th className="py-3 px-2 text-center">ف</th>
              <th className="py-3 px-2 text-center">ت</th>
              <th className="py-3 px-2 text-center">خ</th>
              <th className="py-3 px-2 text-center">+/-</th>
              <th className="py-3 px-3 text-center font-bold">نقاط</th>
            </tr>
          </thead>
          <tbody>
            {league.teams.map((team, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-800/30 hover:bg-brand-500/5 transition-colors ${
                  idx === 0 ? "bg-brand-500/10" : ""
                }`}
              >
                <td className="py-3 px-3 text-right">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    idx === 0 ? "bg-brand-500 text-white" :
                    idx < 4 ? "bg-brand-500/20 text-brand-400" :
                    "text-gray-500"
                  }`}>
                    {team.rank}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    {team.logo && (
                      <img src={team.logo} alt="" className="w-6 h-6 object-contain" />
                    )}
                    <span className="font-semibold text-white text-xs sm:text-sm">{team.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center text-gray-400">{team.played}</td>
                <td className="py-3 px-2 text-center text-green-400">{team.won}</td>
                <td className="py-3 px-2 text-center text-yellow-400">{team.drawn}</td>
                <td className="py-3 px-2 text-center text-red-400">{team.lost}</td>
                <td className="py-3 px-2 text-center text-gray-400">{team.gd}</td>
                <td className="py-3 px-3 text-center">
                  <span className="font-black text-white">{team.points}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="glass-card p-4 animate-pulse">
      <div className="h-6 w-40 bg-gray-700/50 rounded mb-4 skeleton-shimmer" />
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="flex items-center gap-3 py-3">
          <div className="w-6 h-6 rounded-full bg-gray-700/50 skeleton-shimmer" />
          <div className="w-6 h-6 rounded-full bg-gray-700/50 skeleton-shimmer" />
          <div className="h-4 flex-1 bg-gray-700/50 rounded skeleton-shimmer" />
          <div className="h-4 w-8 bg-gray-700/50 rounded skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
}

export default function LeagueStandings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStandings() {
      try {
        const res = await fetch('/api/standings');
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        if (data.standings?.length > 0) {
          setStandings(data.standings);
        }
      } catch (err) {
        console.error('Standings fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStandings();
    // Refresh every 60 seconds
    const interval = setInterval(fetchStandings, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!loading && standings.length === 0) return null;

  return (
    <section id="standings" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">
            ترتيب <span className="gradient-text">الدوريات</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            ترتيب أفضل 5 فرق - يتحدث تلقائياً مع نهاية كل مباراة
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <SkeletonTable key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standings.map((league, idx) => (
              <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                <StandingsTable league={league} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
