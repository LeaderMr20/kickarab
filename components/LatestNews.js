import { useState, useEffect } from "react";
import { fetchFootballNews } from "../lib/newsApi";

function NewsRow({ news }) {
  return (
    <article className="glass-card overflow-hidden group hover:border-brand-500/30 transition-all duration-300 flex flex-col sm:flex-row">
      {/* Image */}
      <div className="relative overflow-hidden sm:w-48 md:w-64 flex-shrink-0 h-48 sm:h-auto">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=90";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-pitch/80 to-transparent sm:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch/80 to-transparent sm:hidden" />

        {/* Category */}
        <div className="absolute top-3 right-3">
          <span className="text-xs font-bold bg-brand-500/90 text-white px-2.5 py-0.5 rounded-full backdrop-blur-sm">
            {news.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-center flex-1">
        <h3 className="text-lg font-bold text-white mb-2 leading-relaxed group-hover:text-brand-400 transition-colors">
          {news.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
          {news.summary}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-600">{news.date}</span>
          <span className="text-xs text-gray-600">{news.readTime}</span>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-brand-400 group-hover:underline cursor-pointer mr-auto"
          >
            اقرأ المزيد ←
          </a>
        </div>
      </div>
    </article>
  );
}

export default function LatestNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError(null);
        const fetchedNews = await fetchFootballNews();
        
        if (!fetchedNews || fetchedNews.length === 0) {
          setError("لم يتم العثور على أخبار حالياً");
          setNews([]);
        } else {
          setNews(fetchedNews);
        }
      } catch (err) {
        console.error("Error loading news:", err);
        setError("حدث خطأ في تحميل الأخبار: " + err.message);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
    // Auto-refresh news every 45 seconds for faster updates
    const interval = setInterval(loadNews, 45 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="news" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="section-title">
            آخر <span className="gradient-text">الأخبار</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            أحدث أخبار كرة القدم من الدوري الإنجليزي ودوري روشن السعودي
          </p>
        </div>

        {/* News List */}
        <div className="space-y-6">
          {loading && (
            <div className="text-center text-gray-400 py-10">
              <div className="inline-block animate-spin">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="mt-4">جاري تحميل الأخبار...</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-10">
              <p className="text-red-400 text-lg">{error}</p>
              <p className="text-gray-500 text-sm mt-2">يرجى المحاولة مرة أخرى لاحقاً</p>
            </div>
          )}

          {!loading && !error && news.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-400">لا توجد أخبار متاحة حالياً</p>
            </div>
          )}

          {!loading && news.length > 0 && (
            news.map((newsItem, idx) => (
              <div key={newsItem.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <NewsRow news={newsItem} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
