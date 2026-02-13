import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsTicker from "../components/NewsTicker";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const DISCUSSION_CATEGORIES = [
  { id: "general", name: "نقاش عام", icon: "💬", color: "bg-blue-500/10" },
  { id: "tactics", name: "التكتيك والفن", icon: "📋", color: "bg-purple-500/10" },
  { id: "mercato", name: "السوق والانتقالات", icon: "🔄", color: "bg-green-500/10" },
  { id: "leagues", name: "الدوريات", icon: "🏆", color: "bg-yellow-500/10" },
  { id: "players", name: "اللاعبون", icon: "⭐", color: "bg-pink-500/10" },
  { id: "teams", name: "الأندية", icon: "🏟️", color: "bg-orange-500/10" },
];

export default function Discussions() {
  const { user } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: "general",
  });
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [newReply, setNewReply] = useState("");

  // Load discussions from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("kickarab_discussions");
      if (stored) {
        setDiscussions(JSON.parse(stored));
      } else {
        // Initialize with sample discussions
        const sampleDiscussions = [
          {
            id: 1,
            title: "ما أفضل تشكيلة للهلال هذا الموسم؟",
            category: "tactics",
            author: "محمد الرياضي",
            content: "أعتقد أن تشكيلة 4-3-3 ستكون مثالية للهلال هذا الموسم",
            replies: [
              { id: 1, author: "سارة", content: "أنا أتفق معك تماماً", likes: 5, timestamp: "قبل ساعة" },
              { id: 2, author: "علي", content: "أنا أفضل 4-2-3-1", likes: 3, timestamp: "قبل 30 دقيقة" },
            ],
            likes: 15,
            views: 142,
            timestamp: "قبل يومين",
          },
          {
            id: 2,
            title: "أخبار الانتقالات الساخنة",
            category: "mercato",
            author: "كريم الناقل",
            content: "اسمعتم عن خبر الانتقال الجديد؟ يقال أن...",
            replies: [
              { id: 1, author: "فاطمة", content: "هل هذا صحيح فعلاً؟", likes: 2, timestamp: "قبل ساعتين" },
            ],
            likes: 28,
            views: 234,
            timestamp: "قبل ساعة",
          },
        ];
        setDiscussions(sampleDiscussions);
        localStorage.setItem("kickarab_discussions", JSON.stringify(sampleDiscussions));
      }
    } catch (error) {
      console.error("Error loading discussions:", error);
    }
  }, []);

  function handleCreateDiscussion() {
    if (!user) {
      alert("يجب عليك تسجيل الدخول أولاً");
      return;
    }

    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      alert("الرجاء ملء جميع الحقول");
      return;
    }

    const discussion = {
      id: Math.max(...discussions.map(d => d.id), 0) + 1,
      title: newDiscussion.title,
      category: newDiscussion.category,
      author: user.name,
      content: newDiscussion.content,
      replies: [],
      likes: 0,
      views: 0,
      timestamp: "الآن",
      userId: user.id,
    };

    const updated = [discussion, ...discussions];
    setDiscussions(updated);
    localStorage.setItem("kickarab_discussions", JSON.stringify(updated));
    setNewDiscussion({ title: "", content: "", category: "general" });
    setShowNewDiscussion(false);
  }

  function handleAddReply() {
    if (!user) {
      alert("يجب عليك تسجيل الدخول أولاً");
      return;
    }

    if (!newReply.trim()) return;

    const updated = discussions.map(d => {
      if (d.id === selectedDiscussion.id) {
        const reply = {
          id: (d.replies?.length || 0) + 1,
          author: user.name,
          content: newReply,
          likes: 0,
          timestamp: "الآن",
          userId: user.id,
        };
        return {
          ...d,
          replies: [...(d.replies || []), reply],
        };
      }
      return d;
    });

    setDiscussions(updated);
    localStorage.setItem("kickarab_discussions", JSON.stringify(updated));
    setSelectedDiscussion(updated.find(d => d.id === selectedDiscussion.id));
    setNewReply("");
  }

  function handleLikeDiscussion(id) {
    const updated = discussions.map(d => {
      if (d.id === id) {
        return { ...d, likes: d.likes + 1 };
      }
      return d;
    });
    setDiscussions(updated);
    localStorage.setItem("kickarab_discussions", JSON.stringify(updated));
  }

  const filteredDiscussions = discussions.filter(
    d => selectedCategory === "all" || d.category === selectedCategory
  );

  return (
    <>
      <Head>
        <title>المنتديات - KickArab</title>
        <meta name="description" content="انضم لمنتديات KickArab للنقاش حول كرة القدم العربية" />
      </Head>

      <Header />
      <NewsTicker />

      <main className="field-pattern min-h-screen pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">المنتديات</h1>
            <p className="text-xl text-gray-400">انضم للحوار الساخن مع أكبر مجتمع كرة قدم عربي</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {/* Sidebar - Hidden on Mobile, Visible on md+ */}
            <div className="hidden md:block lg:col-span-1 md:col-span-1">
              {/* Categories */}
              <div className="glass-card p-4 md:p-6 rounded-2xl mb-6 sticky top-32">
                <h3 className="text-lg font-black text-white mb-4">الفئات</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-right px-4 py-2 md:py-3 rounded-xl transition-all font-semibold text-sm md:text-base ${
                      selectedCategory === "all"
                        ? "bg-brand-500 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    جميع المنشورات
                  </button>
                  {DISCUSSION_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-right px-4 py-2 md:py-3 rounded-xl transition-all font-semibold text-sm md:text-base flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? "bg-brand-500 text-white"
                          : "text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-base md:text-lg">{cat.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* User Stats - Hidden on Mobile */}
              {user && (
                <div className="hidden md:block glass-card p-4 md:p-6 rounded-2xl">
                  <h3 className="text-lg font-black text-white mb-4">ملفك</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-400">الاسم:</span>
                      <p className="text-white font-semibold text-xs md:text-sm">{user.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">الفريق:</span>
                      <p className="text-white font-semibold text-xs md:text-sm">{user.favoriteTeam || "لم يحدد"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              {/* New Discussion Button */}
              <div className="mb-6 md:mb-8">
                {user ? (
                  <button
                    onClick={() => setShowNewDiscussion(!showNewDiscussion)}
                    className="btn-primary py-2 md:py-3 px-4 md:px-6 text-sm md:text-lg w-full"
                  >
                    {showNewDiscussion ? "إلغاء" : "✏️ ابدأ نقاش جديد"}
                  </button>
                ) : (
                  <div className="glass-card p-4 md:p-6 rounded-2xl text-center">
                    <p className="text-gray-300 mb-4 text-sm md:text-base">قم بتسجيل الدخول للمشاركة في النقاشات</p>
                    <Link href="/">
                      <a className="btn-primary py-2 md:py-3 px-4 md:px-6 inline-block text-xs md:text-sm">تسجيل الدخول</a>
                    </Link>
                  </div>
                )}
              </div>

              {/* New Discussion Form */}
              {showNewDiscussion && user && (
                <div className="glass-card p-4 md:p-8 rounded-2xl mb-6 md:mb-8 animate-fade-in">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4 md:mb-6">نقاش جديد</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">الفئة</label>
                      <select
                        value={newDiscussion.category}
                        onChange={(e) =>
                          setNewDiscussion({ ...newDiscussion, category: e.target.value })
                        }
                        className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm focus:border-brand-500 focus:outline-none transition-colors"
                      >
                        {DISCUSSION_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">العنوان</label>
                      <input
                        type="text"
                        value={newDiscussion.title}
                        onChange={(e) =>
                          setNewDiscussion({ ...newDiscussion, title: e.target.value })
                        }
                        placeholder="اكتب عنوان النقاش..."
                        className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-600 text-xs md:text-sm focus:border-brand-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-semibold text-gray-300 mb-2">المحتوى</label>
                      <textarea
                        value={newDiscussion.content}
                        onChange={(e) =>
                          setNewDiscussion({ ...newDiscussion, content: e.target.value })
                        }
                        placeholder="شارك رأيك وأفكارك..."
                        rows="4"
                        className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-600 text-xs md:text-sm focus:border-brand-500 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      onClick={handleCreateDiscussion}
                      className="btn-primary w-full py-2 md:py-3 text-xs md:text-base"
                    >
                      نشر النقاش
                    </button>
                  </div>
                </div>
              )}

              {/* Discussions List or Detail View */}
              {selectedDiscussion ? (
                <div className="animate-fade-in">
                  <button
                    onClick={() => setSelectedDiscussion(null)}
                    className="text-brand-400 hover:text-brand-300 font-semibold mb-4 md:mb-6 flex items-center gap-2 text-xs md:text-base"
                  >
                    ← العودة للنقاشات
                  </button>

                  {/* Discussion Detail */}
                  <div className="glass-card p-4 md:p-8 rounded-2xl mb-6">
                    <div className="flex flex-col md:flex-row items-start justify-between mb-4 md:mb-6 gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl md:text-3xl font-black text-white mb-2 break-words">
                          {selectedDiscussion.title}
                        </h2>
                        <p className="text-xs md:text-sm text-gray-400">
                          بقلم <span className="text-brand-400 font-semibold">{selectedDiscussion.author}</span>{" "}
                          • {selectedDiscussion.timestamp}
                        </p>
                      </div>
                      <button
                        onClick={() => handleLikeDiscussion(selectedDiscussion.id)}
                        className="bg-gray-800 hover:bg-brand-500 rounded-xl px-3 md:px-4 py-2 text-white font-bold transition-all text-xs md:text-sm whitespace-nowrap"
                      >
                        👍 {selectedDiscussion.likes}
                      </button>
                    </div>

                    <div className="bg-pitch-card rounded-xl p-3 md:p-6 mb-6 text-gray-200 leading-relaxed text-xs md:text-base break-words">
                      {selectedDiscussion.content}
                    </div>

                    <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-gray-400 pt-4 md:pt-6 border-t border-gray-700">
                      <span>👁️ {selectedDiscussion.views} مشاهدة</span>
                      <span>💬 {selectedDiscussion.replies?.length || 0} رد</span>
                    </div>
                  </div>

                  {/* Replies */}
                  <div className="mb-8">
                    <h3 className="text-lg md:text-2xl font-black text-white mb-4 md:mb-6">
                      الردود ({selectedDiscussion.replies?.length || 0})
                    </h3>

                    {selectedDiscussion.replies?.length > 0 ? (
                      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                        {selectedDiscussion.replies.map(reply => (
                          <div key={reply.id} className="glass-card p-3 md:p-6 rounded-xl">
                            <div className="flex items-start justify-between mb-2 md:mb-3 gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-white text-sm md:text-base break-words">{reply.author}</p>
                                <p className="text-xs md:text-sm text-gray-400">{reply.timestamp}</p>
                              </div>
                              <button className="text-gray-400 hover:text-brand-400 text-xs md:text-base whitespace-nowrap">
                                👍 {reply.likes}
                              </button>
                            </div>
                            <p className="text-gray-200 text-xs md:text-base break-words">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center py-8 text-xs md:text-base">لا توجد ردود حتى الآن</p>
                    )}
                  </div>

                  {/* Add Reply */}
                  {user ? (
                    <div className="glass-card p-4 md:p-6 rounded-2xl">
                      <h3 className="text-base md:text-lg font-black text-white mb-4">أضف ردك</h3>
                      <div className="space-y-4">
                        <textarea
                          value={newReply}
                          onChange={(e) => setNewReply(e.target.value)}
                          placeholder="اكتب ردك هنا..."
                          rows="3"
                          className="w-full bg-pitch-card border border-gray-700 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-gray-600 text-xs md:text-sm focus:border-brand-500 focus:outline-none transition-colors resize-none"
                        />
                        <button
                          onClick={handleAddReply}
                          className="btn-primary w-full py-2 md:py-3 text-xs md:text-base"
                        >
                          إرسال الرد
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card p-4 md:p-6 rounded-2xl text-center">
                      <p className="text-gray-300 mb-4 text-xs md:text-base">قم بتسجيل الدخول للرد على هذا النقاش</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {filteredDiscussions.length > 0 ? (
                    filteredDiscussions.map(discussion => (
                      <button
                        key={discussion.id}
                        onClick={() => setSelectedDiscussion(discussion)}
                        className="glass-card p-4 md:p-6 rounded-2xl w-full text-right hover:border-brand-500/50 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-2 md:mb-3 gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm md:text-xl font-black text-white group-hover:text-brand-400 transition-colors text-right mb-1 break-words">
                              {discussion.title}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-400">
                              بقلم <span className="text-brand-400 font-semibold">{discussion.author}</span>
                              {" "} • {discussion.timestamp}
                            </p>
                          </div>
                          <div className="text-xl md:text-2xl ml-2">
                            {
                              DISCUSSION_CATEGORIES.find(
                                c => c.id === discussion.category
                              )?.icon
                            }
                          </div>
                        </div>
                        <p className="text-gray-300 mb-2 md:mb-3 text-right line-clamp-2 text-xs md:text-base break-words">
                          {discussion.content}
                        </p>
                        <div className="flex gap-3 md:gap-4 text-xs text-gray-400 text-right">
                          <span>💬 {discussion.replies?.length || 0}</span>
                          <span>👁️ {discussion.views}</span>
                          <span>👍 {discussion.likes}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="glass-card p-8 md:p-12 rounded-2xl text-center">
                      <p className="text-gray-400 text-base md:text-lg">لا توجد نقاشات في هذه الفئة</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
