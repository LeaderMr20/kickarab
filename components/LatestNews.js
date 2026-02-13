import { latestNews } from "../lib/newsData";

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
          <span className="text-xs font-semibold text-brand-400 group-hover:underline cursor-pointer mr-auto">
            اقرأ المزيد ←
          </span>
        </div>
      </div>
    </article>
  );
}

export default function LatestNews() {
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
          {latestNews.map((news, idx) => (
            <div key={news.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <NewsRow news={news} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
