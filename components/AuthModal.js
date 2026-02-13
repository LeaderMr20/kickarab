import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const FAVORITE_TEAMS = [
  "الهلال", "النصر", "الأهلي", "الاتحاد", "الشباب", "التعاون",
  "ليفربول", "أرسنال", "مانشستر سيتي", "تشيلسي", "مانشستر يونايتد", "توتنهام",
  "نيوكاسل", "أستون فيلا", "برايتون", "وست هام",
];

export default function AuthModal({ isOpen, onClose }) {
  const { register, login, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState("register"); // register | login
  const [step, setStep] = useState(1); // 1: credentials, 2: profile (register only)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    favoriteTeam: "",
    position: "",
    city: "",
  });

  if (!isOpen) return null;

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  function handleRegisterStep1() {
    if (!form.name.trim()) return setError("الرجاء إدخال الاسم");
    if (!form.username.trim()) return setError("الرجاء إدخال اسم المستخدم");
    if (!form.email.trim()) return setError("الرجاء إدخال البريد الإلكتروني");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("البريد الإلكتروني غير صحيح");
    if (form.password.length < 6) return setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
    if (form.password !== form.confirmPassword) return setError("كلمتا المرور غير متطابقتين");
    setStep(2);
  }

  function handleRegisterStep2() {
    if (!form.favoriteTeam) return setError("اختر فريقك المفضل");

    try {
      register({
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        favoriteTeam: form.favoriteTeam,
        position: form.position,
        city: form.city,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setStep(1);
        setForm({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          favoriteTeam: "",
          position: "",
          city: "",
        });
      }, 2000);
    } catch (err) {
      setError(err.message || "حدث خطأ في التسجيل");
    }
  }

  function handleLogin() {
    if (!form.email.trim()) return setError("الرجاء إدخال البريد الإلكتروني");
    if (!form.password.trim()) return setError("الرجاء إدخال كلمة المرور");

    try {
      login(form.email, form.password);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err) {
      setError(err.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  }

  function handleGoogleSignIn() {
    setIsLoading(true);
    // Simulate Google Sign In (in production, use actual Google OAuth)
    setTimeout(() => {
      const googleData = {
        email: `user${Math.random().toString(36).substr(2, 9)}@gmail.com`,
        name: "Google User",
        picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + Math.random(),
      };

      try {
        loginWithGoogle(googleData);
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 1500);
      } catch (err) {
        setError(err.message || "حدث خطأ في تسجيل الدخول عبر جوجل");
      }
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card p-4 md:p-8 animate-slide-up max-h-[90vh] overflow-y-auto rounded-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 md:top-4 left-3 md:left-4 w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Success State */}
        {success ? (
          <div className="text-center py-8 md:py-10 animate-fade-in">
            <div className="text-5xl md:text-6xl mb-4">🎉</div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-2">
              {mode === "register" ? "أهلاً بك في KickArab!" : "مرحباً بعودتك!"}
            </h3>
            <p className="text-sm md:text-base text-gray-400">
              {mode === "register" ? "تم التسجيل بنجاح" : "تم تسجيل الدخول بنجاح"}
            </p>
          </div>
        ) : (
          <>
            {/* Logo */}
            <div className="text-center mb-4 md:mb-6">
              <div className="w-12 md:w-14 h-12 md:h-14 rounded-2xl bg-brand-500 flex items-center justify-center text-xl md:text-2xl font-black text-white mx-auto mb-2 md:mb-3">
                K
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                {mode === "register"
                  ? step === 1
                    ? "إنشاء حساب جديد"
                    : "أكمل ملفك الشخصي"
                  : "تسجيل الدخول"}
              </h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                {mode === "register"
                  ? step === 1
                    ? "انضم لأكبر مجتمع كرة قدم عربي"
                    : "خطوة أخيرة لإعداد حسابك"
                  : "مرحباً بعودتك"}
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex bg-pitch-card rounded-xl p-1 mb-4 md:mb-6">
              <button
                onClick={() => { setMode("register"); setStep(1); setError(""); }}
                className={`flex-1 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                  mode === "register" ? "bg-brand-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                حساب جديد
              </button>
              <button
                onClick={() => { setMode("login"); setStep(1); setError(""); }}
                className={`flex-1 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                  mode === "login" ? "bg-brand-500 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                تسجيل دخول
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-2 md:p-3 mb-3 md:mb-4 animate-fade-in">
                <p className="text-xs md:text-sm text-red-400 font-semibold">{error}</p>
              </div>
            )}

            {/* Google Sign In Button */}
            {(mode === "login" || step === 1) && (
              <>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-400 text-black font-bold py-2 md:py-3 rounded-xl transition-all flex items-center justify-center gap-2 mb-3 md:mb-4 text-sm md:text-base"
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block animate-spin">⏳</span>
                      جاري الاتصال...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 md:w-5 h-4 md:h-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      تسجيل الدخول عبر جوجل
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <div className="flex-1 h-px bg-gray-700"></div>
                  <span className="text-xs text-gray-400">أو</span>
                  <div className="flex-1 h-px bg-gray-700"></div>
                </div>
              </>
            )}

            {/* Register Step 1 */}
            {mode === "register" && step === 1 && (
              <div className="space-y-3 md:space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">الاسم الكامل</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="أدخل اسمك"
                    className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm placeholder-gray-600 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">اسم المستخدم</label>
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    placeholder="@username"
                    dir="ltr"
                    className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm placeholder-gray-600 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="example@email.com"
                    dir="ltr"
                    className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm placeholder-gray-600 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">كلمة المرور</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="6 أحرف على الأقل"
                    dir="ltr"
                    className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm placeholder-gray-600 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">تأكيد كلمة المرور</label>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    placeholder="أعد إدخال كلمة المرور"
                    dir="ltr"
                    className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm placeholder-gray-600 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <button onClick={handleRegisterStep1} className="btn-primary w-full py-2 md:py-3.5 text-sm md:text-base">
                  التالي
                </button>
              </div>
            )}

            {/* Register Step 2 */}
            {mode === "register" && step === 2 && (
              <div className="space-y-3 md:space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-2">فريقك المفضل</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 max-h-40 overflow-y-auto p-0.5 md:p-1">
                    {FAVORITE_TEAMS.map((team) => (
                      <button
                        key={team}
                        onClick={() => handleChange("favoriteTeam", team)}
                        className={`px-2 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                          form.favoriteTeam === team
                            ? "bg-brand-500 text-white"
                            : "bg-pitch-card text-gray-400 hover:text-white border border-gray-700"
                        }`}
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">مركزك المفضل (اختياري)</label>
                  <select
                    value={form.position}
                    onChange={(e) => handleChange("position", e.target.value)}
                    className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm focus:border-brand-500 focus:outline-none transition-colors"
                  >
                    <option value="">اختر مركزك</option>
                    <option value="حارس مرمى">حارس مرمى</option>
                    <option value="مدافع">مدافع</option>
                    <option value="وسط">لاعب وسط</option>
                    <option value="مهاجم">مهاجم</option>
                    <option value="متابع فقط">متابع فقط</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">المدينة (اختياري)</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="الرياض، جدة، القاهرة..."
                    className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm placeholder-gray-600 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex gap-2 md:gap-3 pt-2 md:pt-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-2 md:py-3 rounded-xl border border-gray-700 text-xs md:text-base text-gray-300 font-bold hover:border-brand-500/50 hover:text-white transition-all"
                  >
                    رجوع
                  </button>
                  <button onClick={handleRegisterStep2} className="btn-primary flex-1 py-2 md:py-3 text-xs md:text-base">
                    أنشئ حسابي
                  </button>
                </div>
              </div>
            )}

            {/* Login */}
            {mode === "login" && (
              <div className="space-y-3 md:space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="example@email.com"
                    dir="ltr"
                    className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm placeholder-gray-600 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">كلمة المرور</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="كلمة المرور"
                    dir="ltr"
                    className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm placeholder-gray-600 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
                <button onClick={handleLogin} className="btn-primary w-full py-2 md:py-3.5 text-sm md:text-base">
                  تسجيل الدخول
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
