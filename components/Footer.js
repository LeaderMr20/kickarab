export default function Footer() {
  return (
    <footer className="bg-pitch border-t border-brand-500/10 mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-xl font-black text-white">
                K
              </div>
              <span className="text-lg md:text-xl font-black">
                <span className="text-white">Kick</span>
                <span className="gradient-text">Arab</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              المنصة العربية الأولى لكرة القدم. تابع نجوم الأسبوع، الإحصائيات، والمباريات الحية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base md:text-lg mb-3 md:mb-4">روابط سريعة</h3>
            <ul className="space-y-1 md:space-y-2">
              {["الرئيسية", "نجوم الأسبوع", "المباريات", "الإحصائيات", "عن KickArab"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-brand-400 text-xs md:text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-white font-bold text-base md:text-lg mb-3 md:mb-4">تابعنا</h3>
            <div className="flex gap-2 md:gap-3">
              {[
                { name: "تويتر", icon: "𝕏" },
                { name: "يوتيوب", icon: "▶" },
                { name: "انستقرام", icon: "📷" },
                { name: "تيليجرام", icon: "✈" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-9 md:w-10 h-9 md:h-10 rounded-lg bg-pitch-card border border-brand-500/10 flex items-center justify-center text-xs md:text-base text-gray-400 hover:text-brand-400 hover:border-brand-500/30 transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4 md:mt-6 break-all">
              contact@kickarab.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 md:mt-10 pt-4 md:pt-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} KickArab. جميع الحقوق محفوظة.
          </p>
          <p className="text-gray-600 text-xs text-center">
            برمجة <span className="text-brand-400 font-semibold">m-abualabbas</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
