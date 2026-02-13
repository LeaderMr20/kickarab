// Weekly Stars categories and sample data
// In production, this would come from an API/database

export const STAR_CATEGORIES = {
  PLAYER_OF_WEEK: "player_of_week",
  TOP_SCORER: "top_scorer",
  BEST_GOAL: "best_goal",
  BEST_GOALKEEPER: "best_goalkeeper",
};

export const categoryLabels = {
  [STAR_CATEGORIES.PLAYER_OF_WEEK]: { title: "لاعب الأسبوع", icon: "⭐" },
  [STAR_CATEGORIES.TOP_SCORER]: { title: "هداف الأسبوع", icon: "⚽" },
  [STAR_CATEGORIES.BEST_GOAL]: { title: "أجمل هدف", icon: "🎯" },
  [STAR_CATEGORIES.BEST_GOALKEEPER]: { title: "أفضل حارس", icon: "🧤" },
};

export const weeklyStarsData = [
  {
    id: 1,
    category: STAR_CATEGORIES.PLAYER_OF_WEEK,
    name: "محمد صلاح",
    team: "ليفربول",
    nationality: "مصر",
    stat: "2 أهداف + 1 أسيست",
    rating: 9.2,
    image: null,
  },
  {
    id: 2,
    category: STAR_CATEGORIES.TOP_SCORER,
    name: "كريم بنزيما",
    team: "الاتحاد",
    nationality: "فرنسا",
    stat: "3 أهداف",
    rating: 8.9,
    image: null,
  },
  {
    id: 3,
    category: STAR_CATEGORIES.BEST_GOAL,
    name: "رياض محرز",
    team: "الأهلي",
    nationality: "الجزائر",
    stat: "هدف من 30 متر",
    rating: 9.5,
    image: null,
  },
  {
    id: 4,
    category: STAR_CATEGORIES.BEST_GOALKEEPER,
    name: "تيبو كورتوا",
    team: "ريال مدريد",
    nationality: "بلجيكا",
    stat: "8 تصديات - شباك نظيفة",
    rating: 9.0,
    image: null,
  },
];

export function getStarsByCategory(category) {
  return weeklyStarsData.filter((star) => star.category === category);
}

export function getPlayerOfTheWeek() {
  return weeklyStarsData.find(
    (star) => star.category === STAR_CATEGORIES.PLAYER_OF_WEEK
  );
}

export function getAllStars() {
  return weeklyStarsData.map((star) => ({
    ...star,
    categoryInfo: categoryLabels[star.category],
  }));
}
