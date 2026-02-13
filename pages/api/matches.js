const teamNamesAr = {
  'Arsenal': 'أرسنال', 'Aston Villa': 'أستون فيلا', 'Bournemouth': 'بورنموث',
  'Brentford': 'برينتفورد', 'Brighton': 'برايتون', 'Brighton & Hove Albion': 'برايتون',
  'Chelsea': 'تشيلسي', 'Crystal Palace': 'كريستال بالاس', 'Everton': 'إيفرتون',
  'Fulham': 'فولهام', 'Ipswich Town': 'إيبسويتش', 'Leicester City': 'ليستر سيتي',
  'Liverpool': 'ليفربول', 'Manchester City': 'مانشستر سيتي', 'Manchester United': 'مانشستر يونايتد',
  'Newcastle United': 'نيوكاسل', 'Nottingham Forest': 'نوتنغهام فورست',
  'Southampton': 'ساوثهامبتون', 'Tottenham Hotspur': 'توتنهام', 'West Ham United': 'وست هام',
  'Wolverhampton Wanderers': 'وولفرهامبتون', 'Wolves': 'وولفرهامبتون',
  'Al Hilal': 'الهلال', 'Al-Hilal': 'الهلال', 'Al Nassr': 'النصر', 'Al-Nassr': 'النصر',
  'Al Ittihad': 'الاتحاد', 'Al-Ittihad': 'الاتحاد', 'Al Ahli': 'الأهلي', 'Al-Ahli': 'الأهلي',
  'Al Shabab': 'الشباب', 'Al Fateh': 'الفتح', 'Al Taawoun': 'التعاون',
  'Al Raed': 'الرائد', 'Al Fayha': 'الفيحاء', 'Al Khaleej': 'الخليج',
  'Al Ettifaq': 'الاتفاق', 'Damac': 'ضمك', 'Abha': 'أبها',
  'Al Riyadh': 'الرياض', 'Al Hazem': 'الحزم', 'Al Wehda': 'الوحدة',
  'Al Okhdood': 'الأخدود', 'Al Qadisiyah': 'القادسية',
  'Real Madrid': 'ريال مدريد', 'Barcelona': 'برشلونة', 'Atletico Madrid': 'أتلتيكو مدريد',
  'Bayern Munich': 'بايرن ميونخ', 'Paris Saint-Germain': 'باريس سان جيرمان',
  'Inter Milan': 'إنتر ميلان', 'AC Milan': 'إيه سي ميلان', 'Juventus': 'يوفنتوس',
  'Borussia Dortmund': 'بروسيا دورتموند',
};

const statusAr = {
  'STATUS_FULL_TIME': 'انتهت', 'STATUS_HALFTIME': 'استراحة',
  'STATUS_IN_PROGRESS': 'مباشر', 'STATUS_FIRST_HALF': 'الشوط الأول',
  'STATUS_SECOND_HALF': 'الشوط الثاني', 'STATUS_SCHEDULED': 'لم تبدأ',
  'STATUS_POSTPONED': 'مؤجلة', 'STATUS_CANCELED': 'ملغية',
  'STATUS_FINAL_AET': 'انتهت (و.إ)', 'STATUS_FINAL_PEN': 'انتهت (ركلات)',
};

const statusShortMap = {
  'STATUS_FULL_TIME': 'FT', 'STATUS_HALFTIME': 'HT',
  'STATUS_IN_PROGRESS': 'LIVE', 'STATUS_FIRST_HALF': '1H',
  'STATUS_SECOND_HALF': '2H', 'STATUS_SCHEDULED': 'NS',
  'STATUS_POSTPONED': 'PST', 'STATUS_CANCELED': 'CANC',
  'STATUS_FINAL_AET': 'FT', 'STATUS_FINAL_PEN': 'FT',
};

function getTeamNameAr(name) {
  return teamNamesAr[name] || name;
}

function parseESPNEvent(event, leagueInfo) {
  const comp = event.competitions?.[0];
  if (!comp) return null;

  const homeTeam = comp.competitors?.find(c => c.homeAway === 'home');
  const awayTeam = comp.competitors?.find(c => c.homeAway === 'away');
  if (!homeTeam || !awayTeam) return null;

  const statusName = comp.status?.type?.name || 'STATUS_SCHEDULED';
  const isLive = ['STATUS_IN_PROGRESS', 'STATUS_FIRST_HALF', 'STATUS_SECOND_HALF', 'STATUS_HALFTIME'].includes(statusName);

  const events = (comp.details || [])
    .filter(d => d.scoringPlay || d.redCard || d.yellowCard)
    .map(d => {
      const player = d.athletesInvolved?.[0];
      const isHome = d.team?.id === homeTeam.id;
      let detail = '';
      if (d.scoringPlay) detail = d.penaltyKick ? 'ركلة جزاء' : d.ownGoal ? 'هدف عكسي' : 'هدف';
      else if (d.redCard) detail = 'بطاقة حمراء';
      else if (d.yellowCard) detail = 'بطاقة صفراء';

      return {
        time: d.clock?.displayValue?.replace("'", '') || '',
        type: detail,
        detail,
        player: player?.displayName || '',
        teamSide: isHome ? 'home' : 'away'
      };
    });

  return {
    id: event.id,
    date: event.date,
    league: { id: leagueInfo.id, nameAr: leagueInfo.nameAr, icon: leagueInfo.icon },
    homeTeam: {
      name: getTeamNameAr(homeTeam.team?.displayName || ''),
      logo: homeTeam.team?.logo || null
    },
    awayTeam: {
      name: getTeamNameAr(awayTeam.team?.displayName || ''),
      logo: awayTeam.team?.logo || null
    },
    score: {
      home: parseInt(homeTeam.score) || 0,
      away: parseInt(awayTeam.score) || 0
    },
    status: {
      short: statusShortMap[statusName] || 'NS',
      textAr: isLive
        ? `${comp.status?.displayClock || ''} ${statusAr[statusName] || 'مباشر'}`
        : (statusAr[statusName] || 'لم تبدأ')
    },
    events
  };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=60');

  const leagues = [
    { url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard', id: 39, nameAr: 'الدوري الإنجليزي', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/sau.1/scoreboard', id: 307, nameAr: 'دوري روشن', icon: '🇸🇦' },
    { url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard', id: 2, nameAr: 'دوري الأبطال', icon: '🏆' },
    { url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard', id: 140, nameAr: 'الدوري الإسباني', icon: '🇪🇸' },
  ];

  try {
    const allMatches = [];

    const results = await Promise.allSettled(
      leagues.map(async (league) => {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);
          const response = await fetch(league.url, { signal: controller.signal });
          clearTimeout(timeout);
          if (!response.ok) return [];
          const data = await response.json();
          return (data.events || []).map(e => parseESPNEvent(e, league)).filter(Boolean);
        } catch {
          return [];
        }
      })
    );

    results.forEach(r => {
      if (r.status === 'fulfilled') allMatches.push(...r.value);
    });

    const liveStatuses = ['LIVE', '1H', '2H', 'HT'];
    allMatches.sort((a, b) => {
      const aP = liveStatuses.includes(a.status.short) ? 0 : a.status.short === 'NS' ? 1 : 2;
      const bP = liveStatuses.includes(b.status.short) ? 0 : b.status.short === 'NS' ? 1 : 2;
      return aP - bP;
    });

    return res.status(200).json({
      matches: allMatches,
      hasLive: allMatches.some(m => liveStatuses.includes(m.status.short)),
      updated: new Date().toISOString()
    });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch matches', matches: [] });
  }
}
