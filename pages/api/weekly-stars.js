const playerNamesAr = {
  'Mohamed Salah': 'محمد صلاح', 'Erling Haaland': 'إيرلينغ هالاند',
  'Viktor Gyökeres': 'فيكتور جيوكيريس', 'Bukayo Saka': 'بوكايو ساكا',
  'Cole Palmer': 'كول بالمر', 'Alexander Isak': 'ألكسندر إيساك',
  'Bruno Fernandes': 'برونو فيرنانديز', 'Son Heung-Min': 'سون هيونغ مين',
  'Phil Foden': 'فيل فودين', 'Ollie Watkins': 'أولي واتكينز',
  'Cristiano Ronaldo': 'كريستيانو رونالدو', 'Karim Benzema': 'كريم بنزيما',
  'Neymar': 'نيمار', 'Aleksandar Mitrović': 'ألكسندر ميتروفيتش',
  'Riyad Mahrez': 'رياض محرز', 'Roberto Firmino': 'روبيرتو فيرمينو',
  'Robert Lewandowski': 'روبرت ليفاندوفسكي', 'Kylian Mbappé': 'كيليان مبابي',
  'Vinicius Junior': 'فينيسيوس جونيور', 'Jude Bellingham': 'جود بيلينغهام',
  'Lamine Yamal': 'لامين يامال', 'Raphinha': 'رافينيا',
  'Noni Madueke': 'نوني مادويكي', 'Keane Lewis-Potter': 'كيان لويس بوتر',
};

const teamNamesAr = {
  'Arsenal': 'أرسنال', 'Liverpool': 'ليفربول', 'Chelsea': 'تشيلسي',
  'Manchester City': 'مانشستر سيتي', 'Manchester United': 'مانشستر يونايتد',
  'Tottenham Hotspur': 'توتنهام', 'Newcastle United': 'نيوكاسل',
  'Aston Villa': 'أستون فيلا', 'Brentford': 'برينتفورد',
  'Nottingham Forest': 'نوتنغهام فورست', 'Bournemouth': 'بورنموث',
  'Fulham': 'فولهام', 'Crystal Palace': 'كريستال بالاس',
  'West Ham United': 'وست هام', 'Brighton': 'برايتون',
  'Al Hilal': 'الهلال', 'Al Nassr': 'النصر', 'Al Ittihad': 'الاتحاد',
  'Al Ahli': 'الأهلي', 'Real Madrid': 'ريال مدريد', 'Barcelona': 'برشلونة',
};

const categories = [
  { key: 'player_of_week', title: 'لاعب الأسبوع', icon: '⭐' },
  { key: 'top_scorer', title: 'هداف الأسبوع', icon: '⚽' },
  { key: 'best_goal', title: 'أجمل هدف', icon: '🎯' },
  { key: 'best_goalkeeper', title: 'أفضل حارس', icon: '🧤' },
];

function getName(n) { return playerNamesAr[n] || n; }
function getTeam(n) { return teamNamesAr[n] || n; }

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=600');

  const leagues = [
    { url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard', league: 'الدوري الإنجليزي', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/sau.1/scoreboard', league: 'دوري روشن', icon: '🇸🇦' },
    { url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard', league: 'الدوري الإسباني', icon: '🇪🇸' },
  ];

  try {
    const allScorers = [];

    const results = await Promise.allSettled(
      leagues.map(async ({ url, league, icon }) => {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);
          const response = await fetch(url, { signal: controller.signal });
          clearTimeout(timeout);
          if (!response.ok) return [];
          const data = await response.json();
          const players = [];

          (data.events || []).forEach(event => {
            const comp = event.competitions?.[0];
            if (!comp?.details) return;
            comp.details.forEach(detail => {
              if (!detail.scoringPlay) return;
              const athlete = detail.athletesInvolved?.[0];
              if (!athlete) return;
              const teamComp = comp.competitors?.find(c => c.team?.id === detail.team?.id);
              players.push({
                name: athlete.displayName,
                team: teamComp?.team?.displayName || '',
                photo: athlete.headshot || null,
                league, leagueIcon: icon,
                isOwnGoal: detail.ownGoal || false,
              });
            });
          });
          return players;
        } catch { return []; }
      })
    );

    results.forEach(r => {
      if (r.status === 'fulfilled') allScorers.push(...r.value);
    });

    // Count goals per player (exclude own goals)
    const playerMap = {};
    allScorers.filter(s => !s.isOwnGoal).forEach(s => {
      if (!playerMap[s.name]) playerMap[s.name] = { ...s, goals: 0 };
      playerMap[s.name].goals++;
    });

    const sorted = Object.values(playerMap).sort((a, b) => b.goals - a.goals);

    if (sorted.length === 0) {
      return res.status(200).json({ stars: [] });
    }

    const stars = [];
    for (let i = 0; i < Math.min(4, sorted.length); i++) {
      const p = sorted[i];
      stars.push({
        id: i + 1,
        category: categories[i].key,
        categoryInfo: categories[i],
        name: getName(p.name),
        team: getTeam(p.team),
        nationality: '',
        league: p.league,
        leagueIcon: p.leagueIcon,
        stat: `${p.goals} ${p.goals > 1 ? 'أهداف' : 'هدف'}`,
        rating: Math.min(10, 7.5 + p.goals * 0.5).toFixed(1),
        photo: p.photo,
      });
    }

    return res.status(200).json({ stars });

  } catch (error) {
    return res.status(500).json({ error: 'Failed', stars: [] });
  }
}
