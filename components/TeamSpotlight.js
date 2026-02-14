import { useState, useEffect } from "react";

const FEATURED_TEAM = {
  name: "الهلال",
  nameEn: "Al Hilal",
  color: "#1E3A8A",
  league: "دوري روشن السعودي",
  leagueIcon: "🇸🇦",
  founded: "1957",
  stadium: "استاد الملك فهد",
  description: "نادي الهلال السعودي - أكثر الأندية تتويجاً في آسيا"
};

function NewsCard({ news, featured = false }) {
  return (
    <article
      className={`glass-card overflow-hidden group hover:border-brand-500/30 transition-all duration-300 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-64 md:h-80" : "h-48"}`}>
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=90";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch via-pitch/40 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="text-xs font-bold bg-brand-500/90 text-white px-3 py-1 rounded-full backdrop-blur-sm">
            {news.category}
          </span>
        </div>

        {/* Read Time */}
        <div className="absolute top-4 left-4">
          <span className="text-xs text-gray-300 bg-pitch/70 px-2 py-1 rounded-lg backdrop-blur-sm">
            {news.readTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className={`font-bold text-white mb-2 leading-relaxed group-hover:text-brand-400 transition-colors ${
            featured ? "text-xl md:text-2xl" : "text-base"
          }`}
        >
          {news.title}
        </h3>
        <p className={`text-gray-400 leading-relaxed ${featured ? "text-sm md:text-base" : "text-sm line-clamp-2"}`}>
          {news.summary}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-600">{news.date}</span>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-brand-400 group-hover:underline cursor-pointer"
          >
            اقرأ المزيد ←
          </a>
        </div>
      </div>
    </article>
  );
}

export default function TeamSpotlight() {
  const [teamNews, setTeamNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function loadTeamNews() {
      try {
        setLoading(true);
        const response = await fetch(`/api/team-news?team=${encodeURIComponent(FEATURED_TEAM.nameEn)}`);
        const data = await response.json();

        if (data.success && data.articles?.length > 0) {
          const defaultImage = 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=90';
          const formatted = data.articles.map((article, i) => ({
            id: `team-${i}`,
            title: article.title,
            summary: article.description || '',
            category: FEATURED_TEAM.league,
            date: formatDate(article.publishedAt),
            image: article.image || defaultImage,
            readTime: '3 دقائق',
            url: article.url || '#',
            source: article.source
          }));
          setTeamNews(formatted);
        }
      } catch (err) {
        console.error("Failed to load team news:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTeamNews();
    // Auto-refresh team news every 60 seconds
    const interval = setInterval(loadTeamNews, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const visibleNews = showAll ? teamNews : teamNews.slice(0, 4);

  // Don't render if no news and not loading
  if (!loading && teamNews.length === 0) {
    return null;
  }

  return (
    <section id="team-news" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Header */}
        <div className="glass-card p-5 md:p-8 mb-8 md:mb-12 relative overflow-hidden rounded-2xl">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${FEATURED_TEAM.color} 0%, transparent 50%)`,
            }}
          />

          <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div
              className="w-20 md:w-24 h-20 md:h-24 rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-black text-white shadow-xl flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${FEATURED_TEAM.color}, #3B82F6)` }}
            >
              {FEATURED_TEAM.name.charAt(0)}
            </div>

            <div className="text-center md:text-right flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white break-words">
                  أخبار {FEATURED_TEAM.name}
                </h2>
                <span className="text-xl md:text-2xl flex-shrink-0">{FEATURED_TEAM.leagueIcon}</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm lg:text-base max-w-2xl">
                {FEATURED_TEAM.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 mt-2 md:mt-3">
                <span className="text-xs text-gray-500 bg-pitch-card px-2 md:px-3 py-0.5 md:py-1 rounded-lg whitespace-nowrap">
                  تأسس {FEATURED_TEAM.founded}
                </span>
                <span className="text-xs text-gray-500 bg-pitch-card px-2 md:px-3 py-0.5 md:py-1 rounded-lg whitespace-nowrap">
                  {FEATURED_TEAM.stadium}
                </span>
                <span className="text-xs text-gray-500 bg-pitch-card px-2 md:px-3 py-0.5 md:py-1 rounded-lg whitespace-nowrap">
                  {FEATURED_TEAM.league}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-400 py-10">
            <div className="inline-block animate-spin">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <p className="mt-4">جاري تحميل أخبار {FEATURED_TEAM.name}...</p>
          </div>
        )}

        {/* News Grid */}
        {!loading && visibleNews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {visibleNews.map((news, idx) => (
              <div key={news.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <NewsCard news={news} featured={idx === 0} />
              </div>
            ))}
          </div>
        )}

        {/* Show More */}
        {teamNews.length > 4 && (
          <div className="text-center mt-6 md:mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 md:px-8 py-2 md:py-3 rounded-xl border border-gray-700 text-xs md:text-base text-gray-300 font-bold hover:border-brand-500/50 hover:text-white transition-all duration-300"
            >
              {showAll ? "عرض أقل" : `عرض كل الأخبار (${teamNews.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return new Date().toLocaleDateString('ar-SA');
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.floor((now - date) / 3600000);
    if (diffHours < 1) return 'الآن';
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `منذ ${diffDays} يوم`;
    return date.toLocaleDateString('ar-SA');
  } catch {
    return new Date().toLocaleDateString('ar-SA');
  }
}
