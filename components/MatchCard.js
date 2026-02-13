import { useState } from "react";

const LIVE_STATUSES = ["1H", "2H", "HT", "ET", "BT", "P", "LIVE"];

function isLive(status) {
  return LIVE_STATUSES.includes(status);
}

function EventItem({ event }) {
  const icons = {
    "هدف": "⚽",
    "ركلة جزاء": "🎯",
    "هدف عكسي": "🔴",
    "بطاقة صفراء": "🟨",
    "بطاقة حمراء": "🟥",
    "بطاقة صفراء ثانية": "🟨🟥",
    "تبديل": "🔄",
  };

  return (
    <div className={`flex items-center gap-3 py-2 text-sm ${event.teamSide === "home" ? "flex-row" : "flex-row-reverse"}`}>
      <span className="text-gray-500 text-xs w-8 text-center">{event.time}&apos;</span>
      <span>{icons[event.detail] || icons[event.type] || "📋"}</span>
      <span className="text-gray-300">{event.player}</span>
      <span className="text-gray-600 text-xs">{event.detail}</span>
    </div>
  );
}

export default function MatchCard({ match }) {
  const [expanded, setExpanded] = useState(false);
  const live = isLive(match.status.short);
  const upcoming = match.status.short === "NS";

  return (
    <div
      className={`glass-card p-5 transition-all duration-300 cursor-pointer hover:border-brand-500/30 ${
        live ? "border-brand-500/40 animate-pulse-glow" : ""
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* League & Status Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{match.league.icon}</span>
          <span className="text-xs font-semibold text-gray-400">{match.league.nameAr}</span>
        </div>
        <div className="flex items-center gap-2">
          {live && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
            </span>
          )}
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              live
                ? "bg-brand-500/20 text-brand-400"
                : upcoming
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-gray-700/50 text-gray-400"
            }`}
          >
            {match.status.textAr}
          </span>
        </div>
      </div>

      {/* Teams & Score */}
      <div className="flex items-center justify-between gap-4">
        {/* Home Team */}
        <div className="flex-1 text-center">
          {match.homeTeam.logo ? (
            <img
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              className="w-12 h-12 mx-auto mb-2 object-contain"
            />
          ) : (
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-lg font-black text-white">
              {match.homeTeam.name.charAt(0)}
            </div>
          )}
          <p className="text-sm font-bold text-white">{match.homeTeam.name}</p>
        </div>

        {/* Score */}
        <div className="text-center px-4">
          {upcoming ? (
            <div>
              <p className="text-2xl font-black text-gray-500">VS</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(match.date).toLocaleTimeString("ar-SA", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ) : (
            <div className={`flex items-center gap-3 ${live ? "" : ""}`}>
              <span className={`text-3xl font-black ${live ? "gradient-text" : "text-white"}`}>
                {match.score.home}
              </span>
              <span className="text-xl text-gray-600">-</span>
              <span className={`text-3xl font-black ${live ? "gradient-text" : "text-white"}`}>
                {match.score.away}
              </span>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex-1 text-center">
          {match.awayTeam.logo ? (
            <img
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              className="w-12 h-12 mx-auto mb-2 object-contain"
            />
          ) : (
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-lg font-black text-white">
              {match.awayTeam.name.charAt(0)}
            </div>
          )}
          <p className="text-sm font-bold text-white">{match.awayTeam.name}</p>
        </div>
      </div>

      {/* Events (expandable) */}
      {expanded && match.events && match.events.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800 animate-fade-in">
          <p className="text-xs font-bold text-gray-500 mb-2">أحداث المباراة</p>
          <div className="space-y-1">
            {match.events.map((event, idx) => (
              <EventItem key={idx} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Expand hint */}
      {match.events && match.events.length > 0 && (
        <div className="text-center mt-3">
          <span className="text-xs text-gray-600">
            {expanded ? "اضغط للإخفاء" : `${match.events.length} أحداث - اضغط للتفاصيل`}
          </span>
        </div>
      )}
    </div>
  );
}
