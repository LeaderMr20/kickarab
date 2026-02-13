import { useState } from "react";
import { FEATURED_TEAM, teamNews } from "../lib/newsData";

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
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch via-pitch/40 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="text-xs font-bold bg-brand-500/90 text-white px-3 py-1 rounded-full backdrop-blur-sm">
            {news.category}
          </span>
        </div>

        {/* Date */}
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
          <span className="text-xs font-semibold text-brand-400 group-hover:underline cursor-pointer">
            اقرأ المزيد ←
          </span>
        </div>
      </div>
    </article>
  );
}

export default function TeamSpotlight() {
  const [showAll, setShowAll] = useState(false);
  const visibleNews = showAll ? teamNews : teamNews.slice(0, 4);

  return (
    <section id="team-news" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Header */}
        <div className="glass-card p-5 md:p-8 mb-8 md:mb-12 relative overflow-hidden rounded-2xl">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${FEATURED_TEAM.color} 0%, transparent 50%)`,
            }}
          />

          <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {/* Team Logo Placeholder */}
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

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {visibleNews.map((news, idx) => (
            <div key={news.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <NewsCard news={news} featured={idx === 0} />
            </div>
          ))}
        </div>

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
