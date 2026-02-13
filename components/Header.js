import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import ProfileModal from "./ProfileModal";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "#matches", label: "المباريات" },
  { href: "#weekly-stars", label: "نجوم الأسبوع" },
  { href: "#news", label: "الأخبار" },
  { href: "#team-news", label: "أخبار الهلال" },
  { href: "/discussions", label: "المنتديات" },
  { href: "#about", label: "عن KickArab" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 bg-pitch/80 backdrop-blur-xl border-b border-brand-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-xl font-black text-white group-hover:shadow-lg group-hover:shadow-brand-500/30 transition-all duration-300">
                K
              </div>
              <span className="text-xl font-black">
                <span className="text-white">Kick</span>
                <span className="gradient-text">Arab</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Auth Area */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setProfileOpen(true)}
                    className="flex items-center gap-2 bg-pitch-card rounded-xl px-4 py-2 border border-gray-800 hover:border-brand-500/50 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-xs font-black text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                      <p className="text-[10px] text-gray-500">{user.favoriteTeam}</p>
                    </div>
                  </button>
                </div>
              ) : (
                <button onClick={() => setAuthOpen(true)} className="btn-primary text-sm py-2 px-6">
                  انضم الآن
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-pitch-light/95 backdrop-blur-xl border-t border-brand-500/10 animate-fade-in">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {user ? (
                <div className="flex items-center justify-between px-4 py-3">
                  <button
                    onClick={() => { setMenuOpen(false); setProfileOpen(true); }}
                    className="flex items-center gap-2 flex-1"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-sm font-black text-white">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-white">{user.name}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setMenuOpen(false); setAuthOpen(true); }}
                  className="btn-primary w-full text-sm py-3 mt-2"
                >
                  انضم الآن
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
