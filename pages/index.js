import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import NewsTicker from "../components/NewsTicker";
import Footer from "../components/Footer";
import LiveMatches from "../components/LiveMatches";
import WeeklyStars from "../components/WeeklyStars";
import LatestNews from "../components/LatestNews";
import TeamSpotlight from "../components/TeamSpotlight";
import LeagueStandings from "../components/LeagueStandings";
import AuthModal from "../components/AuthModal";

const stats = [
  { value: "500+", label: "لاعب مسجل" },
  { value: "120", label: "مباراة أسبوعياً" },
  { value: "15", label: "دوري نشط" },
  { value: "10K+", label: "متابع" },
];

const features = [
  {
    icon: "⚽",
    title: "نجوم الأسبوع",
    desc: "تقييم أسبوعي لأفضل اللاعبين في كل فئة من هداف وحارس ولاعب الأسبوع",
  },
  {
    icon: "📊",
    title: "إحصائيات مفصلة",
    desc: "تتبع أداء اللاعبين بإحصائيات شاملة ودقيقة لكل مباراة",
  },
  {
    icon: "🏆",
    title: "دوريات وبطولات",
    desc: "نظّم أو انضم لبطولات كرة قدم عربية في منطقتك",
  },
  {
    icon: "📱",
    title: "متابعة مباشرة",
    desc: "نتائج وأحداث المباريات بشكل لحظي مع إشعارات فورية",
  },
];

export default function Home() {
  const [ctaAuthOpen, setCtaAuthOpen] = useState(false);

  return (
    <>
      <Head>
        <title>KickArab - المنصة العربية الأولى لكرة القدم</title>
        <meta
          name="description"
          content="KickArab - المنصة العربية الأولى لكرة القدم. مباريات حية، نجوم الأسبوع، أخبار الهلال، والمزيد."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <NewsTicker />

      <main className="field-pattern">
        {/* Hero Section */}
        <section className="hero-gradient min-h-screen flex items-center justify-center pt-20 md:pt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <div className="animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-3 md:px-5 py-1.5 md:py-2 mb-4 md:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-xs md:text-sm font-semibold text-brand-400">
                  المنصة العربية الأولى لكرة القدم
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-4 md:mb-6 break-words">
                <span className="text-white">ملعبك</span>
                <br />
                <span className="gradient-text">العربي الأول</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-400 max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed px-2">
                تابع نجوم الأسبوع، سجّل إحصائياتك، وانضم لأكبر مجتمع كرة قدم
                عربي. كل ما تحتاجه في مكان واحد.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-16 px-2">
                <button
                  onClick={() => setCtaAuthOpen(true)}
                  className="btn-primary text-sm md:text-lg px-6 md:px-10 py-2.5 md:py-4 animate-pulse-glow w-full sm:w-auto"
                >
                  ابدأ الآن
                </button>
                <a
                  href="#matches"
                  className="px-6 md:px-10 py-2.5 md:py-4 rounded-xl border border-gray-700 text-gray-300 font-bold hover:border-brand-500/50 hover:text-white transition-all duration-300 text-sm md:text-lg w-full sm:w-auto text-center"
                >
                  شاهد المباريات
                </a>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto px-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass-card p-2 md:p-4 rounded-xl">
                    <p className="text-xl md:text-2xl lg:text-3xl font-black gradient-text break-words">
                      {stat.value}
                    </p>
                    <p className="text-[10px] md:text-xs lg:text-sm text-gray-400 mt-0.5 md:mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Today's Matches */}
        <LiveMatches />

        {/* Weekly Stars Section */}
        <WeeklyStars />

        {/* Latest News */}
        <LatestNews />

        {/* League Standings */}
        <LeagueStandings />

        {/* Team Spotlight - Al Hilal */}
        <TeamSpotlight />

        {/* Features Section */}
        <section id="about" className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-14">
              <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
                لماذا <span className="gradient-text">KickArab</span>؟
              </h2>
              <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mt-2 md:mt-3">
                منصة متكاملة صُممت خصيصاً لعشاق كرة القدم العرب
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="glass-card p-4 md:p-6 text-center hover:border-brand-500/30 transition-all duration-300 group animate-slide-up rounded-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 break-words">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-card p-6 md:p-10 lg:p-16 glow-green rounded-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 md:mb-4 break-words">
                جاهز تنضم للملعب؟
              </h2>
              <p className="text-gray-400 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-xl mx-auto">
                سجّل الآن وكن جزءاً من أكبر مجتمع كرة قدم عربي
              </p>
              <button
                onClick={() => setCtaAuthOpen(true)}
                className="btn-primary text-sm md:text-base lg:text-lg px-8 md:px-12 py-2.5 md:py-4"
              >
                سجّل مجاناً
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* CTA Auth Modal */}
      <AuthModal isOpen={ctaAuthOpen} onClose={() => setCtaAuthOpen(false)} />
    </>
  );
}
