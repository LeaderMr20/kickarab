import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfileModal({ isOpen, onClose }) {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    favoriteTeam: user?.favoriteTeam || "",
    city: user?.city || "",
    position: user?.position || "",
  });

  if (!isOpen || !user) return null;

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSaveProfile() {
    updateProfile(form);
    setIsEditing(false);
  }

  const FAVORITE_TEAMS = [
    "الهلال", "النصر", "الأهلي", "الاتحاد", "الشباب", "التعاون",
    "ليفربول", "أرسنال", "مانشستر سيتي", "تشيلسي", "مانشستر يونايتد", "توتنهام",
    "نيوكاسل", "أستون فيلا", "برايتون", "وست هام",
  ];

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

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="w-12 md:w-16 h-12 md:h-16 rounded-2xl bg-brand-500 flex items-center justify-center text-2xl md:text-3xl font-black text-white mx-auto mb-2 md:mb-4">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">{user.name}</h2>
          <p className="text-xs md:text-sm text-gray-400 break-all">{user.email}</p>
          {user.authMethod && (
            <p className="text-xs text-brand-400 mt-2">
              ✓ تم التحقق عبر {user.authMethod === "google" ? "جوجل" : "البريد الإلكتروني"}
            </p>
          )}
        </div>

        {/* Profile Info or Edit Form */}
        {!isEditing ? (
          <div className="space-y-3 md:space-y-4">
            <div className="bg-pitch-card rounded-xl p-3 md:p-4">
              <p className="text-xs text-gray-400 mb-1">الفريق المفضل</p>
              <p className="text-white font-semibold text-sm md:text-base">{user.favoriteTeam || "لم يحدد"}</p>
            </div>

            {user.position && (
              <div className="bg-pitch-card rounded-xl p-3 md:p-4">
                <p className="text-xs text-gray-400 mb-1">المركز</p>
                <p className="text-white font-semibold text-sm md:text-base">{user.position}</p>
              </div>
            )}

            {user.city && (
              <div className="bg-pitch-card rounded-xl p-3 md:p-4">
                <p className="text-xs text-gray-400 mb-1">المدينة</p>
                <p className="text-white font-semibold text-sm md:text-base">{user.city}</p>
              </div>
            )}

            {user.bio && (
              <div className="bg-pitch-card rounded-xl p-3 md:p-4">
                <p className="text-xs text-gray-400 mb-1">السيرة الذاتية</p>
                <p className="text-white text-sm md:text-base">{user.bio}</p>
              </div>
            )}

            <div className="flex gap-2 md:gap-3 pt-3 md:pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 md:py-3 rounded-xl transition-all text-sm md:text-base"
              >
                تعديل الملف
              </button>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-2 md:py-3 rounded-xl transition-all border border-red-500/20 text-sm md:text-base"
              >
                خروج
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">الاسم الكامل</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm placeholder-gray-600 focus:border-brand-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">الفريق المفضل</label>
              <select
                value={form.favoriteTeam}
                onChange={(e) => handleChange("favoriteTeam", e.target.value)}
                className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm focus:border-brand-500 focus:outline-none transition-colors"
              >
                <option value="">اختر فريقك</option>
                {FAVORITE_TEAMS.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">المركز (اختياري)</label>
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
                placeholder="الرياض، جدة..."
                className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm placeholder-gray-600 focus:border-brand-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-1 md:mb-1.5">السيرة الذاتية (اختياري)</label>
              <textarea
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="اكتب شيء عنك..."
                rows="3"
                className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm placeholder-gray-600 focus:border-brand-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex gap-2 md:gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 md:py-3 rounded-xl border border-gray-700 text-xs md:text-base text-gray-300 font-bold hover:border-brand-500/50 hover:text-white transition-all"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 md:py-3 rounded-xl transition-all text-xs md:text-base"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
