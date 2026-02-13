import { useState, useEffect } from "react";

const breakingNews = [
  { id: 1, text: "عاجل: محمد صلاح يسجل هاتريك ويقود ليفربول لصدارة الدوري الإنجليزي", urgent: true },
  { id: 2, text: "الهلال يتعاقد مع نجم جديد لدعم صفوف الفريق في الموسم الحالي", urgent: false },
  { id: 3, text: "رونالدو يصل للهدف رقم 920 في مسيرته مع النصر السعودي", urgent: true },
  { id: 4, text: "مانشستر سيتي يعلن عن تجديد عقد هالاند حتى 2030", urgent: false },
  { id: 5, text: "الاتحاد السعودي يعلن مواعيد الجولة القادمة من دوري روشن", urgent: false },
  { id: 6, text: "أرسنال يقترب من ضم جناح برشلونة في صفقة انتقال شتوية", urgent: true },
  { id: 7, text: "نيمار يعود للتدريبات الجماعية مع الهلال بعد غياب طويل", urgent: false },
  { id: 8, text: "الفيفا يعلن عن تعديلات جديدة في قوانين كرة القدم لموسم 2026", urgent: false },
];

export default function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = breakingNews[currentIndex];

  return (
    <div className="fixed top-16 right-0 left-0 z-40 bg-pitch-light/95 backdrop-blur-md border-b border-brand-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-8 md:h-10 gap-2 md:gap-3 overflow-hidden">
          {/* Badge */}
          <div className="flex-shrink-0 flex items-center gap-1 md:gap-2">
            {current.urgent && (
              <span className="relative flex h-1.5 md:h-2 w-1.5 md:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 md:h-2 w-1.5 md:w-2 bg-red-500"></span>
              </span>
            )}
            <span className="text-[10px] md:text-xs font-black bg-brand-500 text-white px-2 md:px-3 py-0.5 rounded-full whitespace-nowrap">
              {current.urgent ? "عاجل" : "أخبار"}
            </span>
          </div>

          {/* News Text */}
          <div className="flex-1 overflow-hidden">
            <p
              className={`text-xs md:text-sm font-semibold text-gray-300 whitespace-nowrap transition-all duration-500 ${
                isAnimating
                  ? "opacity-0 -translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {current.text}
            </p>
          </div>

          {/* Counter */}
          <div className="flex-shrink-0 flex items-center gap-1">
            {breakingNews.map((_, idx) => (
              <span
                key={idx}
                className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-brand-500 w-3 md:w-4" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
