// مثال على الاستخدام

// ============================================
// 1. استخدام AuthContext (المصادقة)
// ============================================

import { useAuth } from "../context/AuthContext";

export function MyComponent() {
  const { user, login, register, loginWithGoogle, logout } = useAuth();

  // التحقق من وجود مستخدم
  if (!user) {
    return <div>الرجاء تسجيل الدخول</div>;
  }

  // الوصول لبيانات المستخدم
  console.log("اسم المستخدم:", user.name);
  console.log("الفريق المفضل:", user.favoriteTeam);

  return (
    <div>
      <p>مرحباً {user.name}</p>
      <button onClick={logout}>خروج</button>
    </div>
  );
}

// ============================================
// 2. التسجيل الجديد
// ============================================

const { register } = useAuth();

try {
  const newUser = register({
    name: "أحمد علي",
    username: "ahmed_ali",
    email: "ahmed@example.com",
    password: "secure123",
    favoriteTeam: "الهلال",
    position: "مهاجم",
    city: "الرياض",
  });
  console.log("تم التسجيل:", newUser);
} catch (error) {
  console.error("خطأ:", error.message);
}

// ============================================
// 3. تسجيل الدخول
// ============================================

const { login } = useAuth();

try {
  const user = login("ahmed@example.com", "secure123");
  console.log("تم الدخول:", user);
} catch (error) {
  console.error("خطأ:", error.message);
}

// ============================================
// 4. تسجيل الدخول عبر جوجل
// ============================================

const { loginWithGoogle } = useAuth();

const googleData = {
  email: "user@gmail.com",
  name: "Google User",
  picture: "https://example.com/avatar.jpg",
};

try {
  const user = loginWithGoogle(googleData);
  console.log("تم الدخول عبر جوجل:", user);
} catch (error) {
  console.error("خطأ:", error.message);
}

// ============================================
// 5. تحديث ملف المستخدم
// ============================================

const { updateProfile } = useAuth();

const updatedUser = updateProfile({
  name: "أحمد محمد علي",
  bio: "محب كرة القدم والهلال",
  city: "جدة",
});

console.log("تم التحديث:", updatedUser);

// ============================================
// 6. الوصول للمنتديات (localStorage)
// ============================================

// الحصول على جميع النقاشات
const discussions = JSON.parse(
  localStorage.getItem("kickarab_discussions") || "[]"
);

// البحث عن نقاش
const discussion = discussions.find((d) => d.id === 1);

// إضافة نقاش جديد
const newDiscussion = {
  id: discussions.length + 1,
  title: "ما أفضل تشكيلة للهلال؟",
  content: "أشاركوا آرائكم...",
  category: "tactics",
  author: "أحمد علي",
  replies: [],
  likes: 0,
  views: 0,
  timestamp: new Date().toISOString(),
};

discussions.push(newDiscussion);
localStorage.setItem("kickarab_discussions", JSON.stringify(discussions));

// ============================================
// 7. استخدام ProfileModal
// ============================================

import ProfileModal from "../components/ProfileModal";
import { useState } from "react";

export function ProfileExample() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <button onClick={() => setProfileOpen(true)}>
        عرض الملف الشخصي
      </button>
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}

// ============================================
// 8. استخدام AuthModal
// ============================================

import AuthModal from "../components/AuthModal";

export function LoginExample() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <button onClick={() => setAuthOpen(true)}>
        تسجيل الدخول/التسجيل
      </button>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

// ============================================
// 9. مثال: مكون يعرض بيانات المستخدم
// ============================================

import { useAuth } from "../context/AuthContext";

export function UserCard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>جاري التحميل...</div>;
  }

  if (!user) {
    return <div>لم يتم تسجيل الدخول</div>;
  }

  return (
    <div className="card">
      <div className="avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>الفريق: {user.favoriteTeam}</p>
      <p>المركز: {user.position}</p>
      <p>المدينة: {user.city}</p>
      <p>نوع المصادقة: {user.authMethod}</p>
    </div>
  );
}

// ============================================
// 10. أفضل الممارسات
// ============================================

/*
✅ افعل:
- استخدم useAuth() فقط داخل AuthProvider
- تحقق من وجود user قبل الوصول لبيانات
- اعتمد على error messages الواضحة
- استخدم try-catch للعمليات الحرجة
- احفظ البيانات المحدثة في localStorage

❌ لا تفعل:
- لا تخزن كلمات المرور في الـ state
- لا تخزن tokens في localStorage بدون تشفير
- لا تثق بالبيانات من العميل
- لا تستخدم hash بسيط للإنتاج (استخدم bcrypt)
- لا تنسى التحقق من صحة البيانات
*/

// ============================================
// 11. معالجة الأخطاء
// ============================================

import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export function SafeAuthComponent() {
  const { register } = useAuth();
  const [error, setError] = useState("");

  async function handleRegister(data) {
    setError("");
    try {
      const user = register(data);
      console.log("تم التسجيل بنجاح:", user);
    } catch (err) {
      setError(err.message);
      console.error("خطأ في التسجيل:", err);
    }
  }

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {/* النموذج هنا */}
    </div>
  );
}

// ============================================
// 12. التحقق من الجلسة
// ============================================

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function ProtectedComponent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // إعادة توجيه للرئيسية
    }
  }, [user, loading, router]);

  if (loading) return <div>جاري التحميل...</div>;
  if (!user) return null;

  return <div>محتوى محمي</div>;
}

export default MyComponent;
