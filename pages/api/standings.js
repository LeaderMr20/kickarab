const teamNamesAr = {
  'Arsenal': 'أرسنال', 'Liverpool': 'ليفربول', 'Chelsea': 'تشيلسي',
  'Manchester City': 'مانشستر سيتي', 'Manchester United': 'مانشستر يونايتد',
  'Tottenham Hotspur': 'توتنهام', 'Newcastle United': 'نيوكاسل',
  'Aston Villa': 'أستون فيلا', 'Brighton': 'برايتون', 'Brentford': 'برينتفورد',
  'Nottingham Forest': 'نوتنغهام فورست', 'Bournemouth': 'بورنموث',
  'Fulham': 'فولهام', 'Crystal Palace': 'كريستال بالاس',
  'West Ham United': 'وست هام', 'Wolverhampton Wanderers': 'وولفرهامبتون',
  'Everton': 'إيفرتون', 'Ipswich Town': 'إيبسويتش', 'Leicester City': 'ليستر سيتي',
  'Southampton': 'ساوثهامبتون',
  'Al Hilal': 'الهلال', 'Al-Hilal': 'الهلال', 'Al Nassr': 'النصر', 'Al-Nassr': 'النصر',
  'Al Ittihad': 'الاتحاد', 'Al-Ittihad': 'الاتحاد', 'Al Ahli': 'الأهلي', 'Al-Ahli': 'الأهلي',
  'Al Shabab': 'الشباب', 'Al Fateh': 'الفتح', 'Al Taawoun': 'التعاون',
  'Al Raed': 'الرائد', 'Al Fayha': 'الفيحاء', 'Al Khaleej': 'الخليج',
  'Al Ettifaq': 'الاتفاق', 'Damac': 'ضمك', 'Al Qadisiyah': 'القادسية',
  'Real Madrid': 'ريال مدريد', 'Barcelona': 'برشلونة',
  'Atletico Madrid': 'أتلتيكو مدريد', 'Athletic Bilbao': 'أتلتيك بيلباو',
  'Villarreal': 'فياريال', 'Real Betis': 'ريال بيتيس', 'Real Sociedad': 'ريال سوسيداد',
  'Girona': 'جيرونا', 'Mallorca': 'مايوركا', 'Osasuna': 'أوساسونا',
  'Celta Vigo': 'سيلتا فيغو', 'Rayo Vallecano': 'رايو فاليكانو',
  'Sevilla': 'إشبيلية', 'Getafe': 'خيتافي', 'Valencia': 'فالنسيا',
  'Espanyol': 'إسبانيول', 'Las Palmas': 'لاس بالماس',
  'Deportivo Alaves': 'ألافيس', 'Leganes': 'ليغانيس', 'Valladolid': 'بلد الوليد',
};

function getStat(stats, name) {
  const s = stats?.find(s => s.name === name);
  return s ? s.displayValue : '0';
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=120');

  const leagues = [
    { url: 'https://site.web.api.espn.com/apis/v2/sports/soccer/eng.1/standings', nameAr: 'الدوري الإنجليزي', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { url: 'https://site.web.api.espn.com/apis/v2/sports/soccer/esp.1/standings', nameAr: 'الدوري الإسباني', icon: '🇪🇸' },
    { url: 'https://site.web.api.espn.com/apis/v2/sports/soccer/sau.1/standings', nameAr: 'دوري روشن', icon: '🇸🇦' },
  ];

  try {
    const allStandings = [];

    const results = await Promise.allSettled(
      leagues.map(async ({ url, nameAr, icon }) => {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);
          const response = await fetch(url, { signal: controller.signal });
          clearTimeout(timeout);
          if (!response.ok) return null;

          const data = await response.json();
          const entries = data.children?.[0]?.standings?.entries || [];

          const teams = entries
            .sort((a, b) => {
              const aP = parseInt(getStat(a.stats, 'points')) || 0;
              const bP = parseInt(getStat(b.stats, 'points')) || 0;
              return bP - aP;
            })
            .slice(0, 5)
            .map((entry, i) => ({
              rank: i + 1,
              name: teamNamesAr[entry.team?.displayName] || entry.team?.displayName || '',
              logo: entry.team?.logos?.[0]?.href || null,
              played: getStat(entry.stats, 'gamesPlayed'),
              won: getStat(entry.stats, 'wins'),
              drawn: getStat(entry.stats, 'ties'),
              lost: getStat(entry.stats, 'losses'),
              gd: getStat(entry.stats, 'pointDifferential'),
              points: getStat(entry.stats, 'points'),
            }));

          return { league: nameAr, icon, teams };
        } catch { return null; }
      })
    );

    results.forEach(r => {
      if (r.status === 'fulfilled' && r.value) allStandings.push(r.value);
    });

    return res.status(200).json({
      standings: allStandings,
      updated: new Date().toISOString()
    });

  } catch (error) {
    return res.status(500).json({ error: 'Failed', standings: [] });
  }
}
