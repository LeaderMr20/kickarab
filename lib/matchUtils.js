// League configuration
export const LEAGUES = {
  EPL: { id: 39, season: 2025, nameAr: "الدوري الإنجليزي الممتاز", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", key: "epl" },
  SPL: { id: 307, season: 2025, nameAr: "دوري روشن السعودي", icon: "🇸🇦", key: "spl" },
};

// Arabic team names - EPL
const EPL_TEAMS = {
  "Liverpool": "ليفربول",
  "Arsenal": "أرسنال",
  "Manchester City": "مانشستر سيتي",
  "Manchester United": "مانشستر يونايتد",
  "Chelsea": "تشيلسي",
  "Tottenham": "توتنهام",
  "Newcastle": "نيوكاسل",
  "Aston Villa": "أستون فيلا",
  "Brighton": "برايتون",
  "West Ham": "وست هام",
  "Fulham": "فولهام",
  "Brentford": "برينتفورد",
  "Crystal Palace": "كريستال بالاس",
  "Wolverhampton": "وولفرهامبتون",
  "Wolves": "وولفز",
  "Bournemouth": "بورنموث",
  "Nottingham Forest": "نوتنغهام فورست",
  "Everton": "إيفرتون",
  "Leicester": "ليستر سيتي",
  "Ipswich": "إيبسويتش",
  "Southampton": "ساوثهامبتون",
};

// Arabic team names - SPL
const SPL_TEAMS = {
  "Al Hilal": "الهلال",
  "Al-Hilal": "الهلال",
  "Al Nassr": "النصر",
  "Al-Nassr": "النصر",
  "Al Ahli": "الأهلي",
  "Al-Ahli": "الأهلي",
  "Al Ittihad": "الاتحاد",
  "Al-Ittihad": "الاتحاد",
  "Al Shabab": "الشباب",
  "Al-Shabab": "الشباب",
  "Al Taawoun": "التعاون",
  "Al-Taawoun": "التعاون",
  "Al Fateh": "الفتح",
  "Al-Fateh": "الفتح",
  "Al Raed": "الرائد",
  "Al-Raed": "الرائد",
  "Al Ettifaq": "الاتفاق",
  "Al-Ettifaq": "الاتفاق",
  "Al Khaleej": "الخليج",
  "Al-Khaleej": "الخليج",
  "Al Riyadh": "الرياض",
  "Al-Riyadh": "الرياض",
  "Al Wehda": "الوحدة",
  "Al-Wehda": "الوحدة",
  "Al Okhdood": "الأخدود",
  "Al-Okhdood": "الأخدود",
  "Damac": "ضمك",
  "Al Fayha": "الفيحاء",
  "Al-Fayha": "الفيحاء",
  "Al Qadisiyah": "القادسية",
  "Al-Qadisiyah": "القادسية",
  "Abha": "أبها",
};

const TEAM_NAMES_AR = { ...EPL_TEAMS, ...SPL_TEAMS };

export function getTeamNameAr(englishName) {
  if (!englishName) return "";
  // Try exact match first
  if (TEAM_NAMES_AR[englishName]) return TEAM_NAMES_AR[englishName];
  // Try partial match
  for (const [key, value] of Object.entries(TEAM_NAMES_AR)) {
    if (englishName.includes(key) || key.includes(englishName)) return value;
  }
  return englishName;
}

// Match status translations
export const MATCH_STATUS_AR = {
  TBD: "لم يُحدد",
  NS: "لم تبدأ",
  "1H": "الشوط الأول",
  HT: "استراحة",
  "2H": "الشوط الثاني",
  ET: "وقت إضافي",
  BT: "استراحة إضافية",
  P: "ركلات ترجيح",
  FT: "انتهت",
  AET: "انتهت (إضافي)",
  PEN: "انتهت (ركلات)",
  PST: "مؤجلة",
  CANC: "ملغاة",
  SUSP: "موقوفة",
  INT: "متوقفة",
  ABD: "أُلغيت",
  AWD: "حُسمت",
  WO: "انسحاب",
  LIVE: "مباشر",
};

export const LIVE_STATUSES = ["1H", "2H", "HT", "ET", "BT", "P", "LIVE"];

export function isMatchLive(statusShort) {
  return LIVE_STATUSES.includes(statusShort);
}

export function getStatusAr(statusShort) {
  return MATCH_STATUS_AR[statusShort] || statusShort;
}

// Event type translations
export const EVENT_TYPES_AR = {
  Goal: "هدف",
  Card: "بطاقة",
  subst: "تبديل",
  Var: "تقنية الفيديو",
};

export const EVENT_DETAIL_AR = {
  "Normal Goal": "هدف",
  "Own Goal": "هدف عكسي",
  Penalty: "ركلة جزاء",
  "Missed Penalty": "ركلة جزاء ضائعة",
  "Yellow Card": "بطاقة صفراء",
  "Red Card": "بطاقة حمراء",
  "Second Yellow card": "بطاقة صفراء ثانية",
  Substitution: "تبديل",
};

export function formatMatchTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
}

export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}
