import { useState, useEffect } from "react";

function SkeletonStarCard() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded bg-gray-700/50 skeleton-shimmer" />
        <div className="w-24 h-5 rounded-full bg-gray-700/50 skeleton-shimmer" />
      </div>
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700/50 skeleton-shimmer" />
      <div className="text-center space-y-2">
        <div className="w-28 h-4 mx-auto rounded bg-gray-700/50 skeleton-shimmer" />
        <div className="w-20 h-3 mx-auto rounded bg-gray-700/50 skeleton-shimmer" />
        <div className="w-full h-8 rounded-lg bg-gray-700/50 skeleton-shimmer" />
      </div>
    </div>
  );
}

function StarCard({ star }) {
  const category = star.categoryInfo;

  return (
    <div className="glass-card p-6 hover:border-brand-500/30 transition-all duration-300 group animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{category.icon}</span>
          <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full">
            {category.title}
          </span>
        </div>
        {star.leagueIcon && (
          <span className="text-lg" title={star.league}>{star.leagueIcon}</span>
        )}
      </div>

      {star.photo ? (
        <img
          src={star.photo}
          alt={star.name}
          className="w-20 h-20 mx-auto mb-4 rounded-full object-cover border-2 border-brand-500/30 group-hover:scale-110 transition-transform duration-300 glow-green"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <div
        className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 items-center justify-center text-3xl font-black text-white group-hover:scale-110 transition-transform duration-300 glow-green"
        style={{ display: star.photo ? "none" : "flex" }}
      >
        {star.name.charAt(0)}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-1">{star.name}</h3>
        <p className="text-sm text-gray-400 mb-1">{star.team}</p>
        {star.league && (
          <p className="text-xs text-brand-400/60 mb-1">{star.league}</p>
        )}
        {star.nationality && (
          <p className="text-xs text-gray-500 mb-3">{star.nationality}</p>
        )}

        <div className="bg-pitch/60 rounded-lg py-2 px-3 mb-3">
          <p className="text-sm font-semibold text-brand-300">{star.stat}</p>
        </div>

        <div className="inline-flex items-center gap-1 bg-brand-500/20 rounded-full px-3 py-1">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-sm font-bold text-white">{star.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default function WeeklyStars() {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch('/api/weekly-stars');
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        if (data.stars?.length > 0) {
          setStars(data.stars);
        }
      } catch (err) {
        console.error('Weekly stars fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStars();
    // Refresh every 10 minutes
    const interval = setInterval(fetchStars, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!loading && stars.length === 0) return null;

  return (
    <section id="weekly-stars" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">
            <span className="gradient-text">نجوم</span> الأسبوع
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            أفضل اللاعبين أداءً هذا الأسبوع بناءً على نتائج المباريات الحقيقية
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonStarCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stars.map((star, index) => (
              <div key={star.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <StarCard star={star} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
