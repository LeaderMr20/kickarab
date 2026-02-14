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
  // الدوري الألماني
  'Bayer Leverkusen': 'باير ليفركوزن', 'RB Leipzig': 'لايبزيغ',
  'Eintracht Frankfurt': 'آينتراخت فرانكفورت', 'VfB Stuttgart': 'شتوتغارت',
  'SC Freiburg': 'فرايبورغ', 'Mainz 05': 'ماينز', 'Wolfsburg': 'فولفسبورغ',
  'Borussia Monchengladbach': 'مونشنغلادباخ', 'Werder Bremen': 'فيردر بريمن',
  'Union Berlin': 'يونيون برلين', 'FC Augsburg': 'أوغسبورغ',
  'TSG Hoffenheim': 'هوفنهايم', 'VfL Bochum': 'بوخوم',
  'Holstein Kiel': 'هولشتاين كيل', 'FC Heidenheim': 'هايدنهايم', 'FC St. Pauli': 'سانت باولي',
  // الدوري الإيطالي
  'SSC Napoli': 'نابولي', 'Napoli': 'نابولي', 'AS Roma': 'روما', 'Roma': 'روما',
  'Lazio': 'لاتسيو', 'SS Lazio': 'لاتسيو', 'Atalanta': 'أتالانتا',
  'ACF Fiorentina': 'فيورنتينا', 'Fiorentina': 'فيورنتينا',
  'Bologna': 'بولونيا', 'Torino': 'تورينو', 'Udinese': 'أودينيزي',
  'Genoa': 'جنوى', 'Cagliari': 'كالياري', 'Empoli': 'إمبولي',
  'Hellas Verona': 'هيلاس فيرونا', 'Parma': 'بارما', 'Como': 'كومو',
  'Lecce': 'ليتشي', 'Venezia': 'فينيسيا', 'Monza': 'مونزا',
  // الدوري الفرنسي
  'Olympique Marseille': 'مارسيليا', 'Marseille': 'مارسيليا',
  'AS Monaco': 'موناكو', 'Monaco': 'موناكو',
  'Olympique Lyonnais': 'ليون', 'Lyon': 'ليون',
  'LOSC Lille': 'ليل', 'Lille': 'ليل',
  'OGC Nice': 'نيس', 'Nice': 'نيس',
  'Stade Rennais': 'رين', 'Rennes': 'رين',
  'RC Lens': 'لانس', 'Lens': 'لانس',
  'Stade Brestois': 'بريست', 'Brest': 'بريست',
  'RC Strasbourg': 'ستراسبورغ', 'Strasbourg': 'ستراسبورغ',
  // الدوري الإسباني إضافات
  'Athletic Bilbao': 'أتلتيك بيلباو', 'Villarreal': 'فياريال',
  'Real Betis': 'ريال بيتيس', 'Real Sociedad': 'ريال سوسيداد',
  'Girona': 'جيرونا', 'Mallorca': 'مايوركا', 'Osasuna': 'أوساسونا',
  'Celta Vigo': 'سيلتا فيغو', 'Rayo Vallecano': 'رايو فاليكانو',
  'Sevilla': 'إشبيلية', 'Getafe': 'خيتافي', 'Valencia': 'فالنسيا',
  'Espanyol': 'إسبانيول', 'Las Palmas': 'لاس بالماس',
  'Deportivo Alaves': 'ألافيس', 'Leganes': 'ليغانيس', 'Valladolid': 'بلد الوليد',
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
  res.setHeader('Cache-Control', 'public, max-age=10, stale-while-revalidate=5');

  // Support date query: ?date=20260214 (YYYYMMDD format)
  const dateParam = req.query.date || '';
  const dateQuery = dateParam ? `?dates=${dateParam}` : '';

  const leagueKeys = [
    // الدوريات الكبرى
    { key: 'eng.1', id: 39, nameAr: 'الدوري الإنجليزي', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { key: 'sau.1', id: 307, nameAr: 'دوري روشن', icon: '🇸🇦' },
    { key: 'esp.1', id: 140, nameAr: 'الدوري الإسباني', icon: '🇪🇸' },
    { key: 'ita.1', id: 135, nameAr: 'الدوري الإيطالي', icon: '🇮🇹' },
    { key: 'ger.1', id: 78, nameAr: 'الدوري الألماني', icon: '🇩🇪' },
    { key: 'fra.1', id: 61, nameAr: 'الدوري الفرنسي', icon: '🇫🇷' },
    // البطولات الأوروبية
    { key: 'uefa.champions', id: 2, nameAr: 'دوري الأبطال', icon: '🏆' },
    { key: 'uefa.europa', id: 3, nameAr: 'الدوري الأوروبي', icon: '🏆' },
    { key: 'uefa.europa.conf', id: 848, nameAr: 'دوري المؤتمر', icon: '🏆' },
    // الكؤوس المحلية
    { key: 'eng.fa', id: 45, nameAr: 'كأس الاتحاد الإنجليزي', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { key: 'eng.league_cup', id: 48, nameAr: 'كأس الرابطة الإنجليزية', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { key: 'esp.copa_del_rey', id: 143, nameAr: 'كأس ملك إسبانيا', icon: '🇪🇸' },
  ];

  try {
    const allMatches = [];

    const results = await Promise.allSettled(
      leagueKeys.map(async (league) => {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);
          const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/${league.key}/scoreboard${dateQuery}`;
          const response = await fetch(url, { signal: controller.signal });
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
