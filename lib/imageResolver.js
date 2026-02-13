// Smart image resolver - matches news keywords to relevant images

// ESPN team logos (real, high quality)
const teamLogos = {
  // Premier League
  'أرسنال': 'https://a.espncdn.com/i/teamlogos/soccer/500/359.png',
  'arsenal': 'https://a.espncdn.com/i/teamlogos/soccer/500/359.png',
  'ليفربول': 'https://a.espncdn.com/i/teamlogos/soccer/500/364.png',
  'liverpool': 'https://a.espncdn.com/i/teamlogos/soccer/500/364.png',
  'تشيلسي': 'https://a.espncdn.com/i/teamlogos/soccer/500/363.png',
  'chelsea': 'https://a.espncdn.com/i/teamlogos/soccer/500/363.png',
  'مانشستر سيتي': 'https://a.espncdn.com/i/teamlogos/soccer/500/382.png',
  'manchester city': 'https://a.espncdn.com/i/teamlogos/soccer/500/382.png',
  'man city': 'https://a.espncdn.com/i/teamlogos/soccer/500/382.png',
  'مانشستر يونايتد': 'https://a.espncdn.com/i/teamlogos/soccer/500/360.png',
  'manchester united': 'https://a.espncdn.com/i/teamlogos/soccer/500/360.png',
  'man united': 'https://a.espncdn.com/i/teamlogos/soccer/500/360.png',
  'توتنهام': 'https://a.espncdn.com/i/teamlogos/soccer/500/367.png',
  'tottenham': 'https://a.espncdn.com/i/teamlogos/soccer/500/367.png',
  'نيوكاسل': 'https://a.espncdn.com/i/teamlogos/soccer/500/361.png',
  'newcastle': 'https://a.espncdn.com/i/teamlogos/soccer/500/361.png',
  'أستون فيلا': 'https://a.espncdn.com/i/teamlogos/soccer/500/362.png',
  'aston villa': 'https://a.espncdn.com/i/teamlogos/soccer/500/362.png',
  'برايتون': 'https://a.espncdn.com/i/teamlogos/soccer/500/331.png',
  'brighton': 'https://a.espncdn.com/i/teamlogos/soccer/500/331.png',
  'وست هام': 'https://a.espncdn.com/i/teamlogos/soccer/500/371.png',
  'west ham': 'https://a.espncdn.com/i/teamlogos/soccer/500/371.png',
  'برينتفورد': 'https://a.espncdn.com/i/teamlogos/soccer/500/337.png',
  'brentford': 'https://a.espncdn.com/i/teamlogos/soccer/500/337.png',
  'فولهام': 'https://a.espncdn.com/i/teamlogos/soccer/500/370.png',
  'fulham': 'https://a.espncdn.com/i/teamlogos/soccer/500/370.png',
  'بورنموث': 'https://a.espncdn.com/i/teamlogos/soccer/500/349.png',
  'bournemouth': 'https://a.espncdn.com/i/teamlogos/soccer/500/349.png',
  'نوتنغهام': 'https://a.espncdn.com/i/teamlogos/soccer/500/393.png',
  'nottingham': 'https://a.espncdn.com/i/teamlogos/soccer/500/393.png',
  'كريستال بالاس': 'https://a.espncdn.com/i/teamlogos/soccer/500/384.png',
  'crystal palace': 'https://a.espncdn.com/i/teamlogos/soccer/500/384.png',
  'إيفرتون': 'https://a.espncdn.com/i/teamlogos/soccer/500/368.png',
  'everton': 'https://a.espncdn.com/i/teamlogos/soccer/500/368.png',
  'وولفرهامبتون': 'https://a.espncdn.com/i/teamlogos/soccer/500/380.png',
  'wolves': 'https://a.espncdn.com/i/teamlogos/soccer/500/380.png',

  // La Liga
  'ريال مدريد': 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png',
  'real madrid': 'https://a.espncdn.com/i/teamlogos/soccer/500/86.png',
  'برشلونة': 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png',
  'barcelona': 'https://a.espncdn.com/i/teamlogos/soccer/500/83.png',
  'أتلتيكو مدريد': 'https://a.espncdn.com/i/teamlogos/soccer/500/1068.png',
  'atletico madrid': 'https://a.espncdn.com/i/teamlogos/soccer/500/1068.png',
  'إشبيلية': 'https://a.espncdn.com/i/teamlogos/soccer/500/243.png',
  'sevilla': 'https://a.espncdn.com/i/teamlogos/soccer/500/243.png',

  // Bundesliga
  'بايرن': 'https://a.espncdn.com/i/teamlogos/soccer/500/132.png',
  'bayern': 'https://a.espncdn.com/i/teamlogos/soccer/500/132.png',
  'دورتموند': 'https://a.espncdn.com/i/teamlogos/soccer/500/124.png',
  'dortmund': 'https://a.espncdn.com/i/teamlogos/soccer/500/124.png',
  'ليفركوزن': 'https://a.espncdn.com/i/teamlogos/soccer/500/131.png',
  'leverkusen': 'https://a.espncdn.com/i/teamlogos/soccer/500/131.png',

  // Serie A
  'يوفنتوس': 'https://a.espncdn.com/i/teamlogos/soccer/500/111.png',
  'juventus': 'https://a.espncdn.com/i/teamlogos/soccer/500/111.png',
  'إنتر': 'https://a.espncdn.com/i/teamlogos/soccer/500/110.png',
  'inter milan': 'https://a.espncdn.com/i/teamlogos/soccer/500/110.png',
  'ميلان': 'https://a.espncdn.com/i/teamlogos/soccer/500/103.png',
  'ac milan': 'https://a.espncdn.com/i/teamlogos/soccer/500/103.png',

  // Ligue 1
  'باريس': 'https://a.espncdn.com/i/teamlogos/soccer/500/160.png',
  'psg': 'https://a.espncdn.com/i/teamlogos/soccer/500/160.png',

  // Saudi League
  'الهلال': 'https://a.espncdn.com/i/teamlogos/soccer/500/23654.png',
  'al hilal': 'https://a.espncdn.com/i/teamlogos/soccer/500/23654.png',
  'al-hilal': 'https://a.espncdn.com/i/teamlogos/soccer/500/23654.png',
  'النصر': 'https://a.espncdn.com/i/teamlogos/soccer/500/23653.png',
  'al nassr': 'https://a.espncdn.com/i/teamlogos/soccer/500/23653.png',
  'al-nassr': 'https://a.espncdn.com/i/teamlogos/soccer/500/23653.png',
  'الاتحاد': 'https://a.espncdn.com/i/teamlogos/soccer/500/23656.png',
  'al ittihad': 'https://a.espncdn.com/i/teamlogos/soccer/500/23656.png',
  'al-ittihad': 'https://a.espncdn.com/i/teamlogos/soccer/500/23656.png',
  'الأهلي': 'https://a.espncdn.com/i/teamlogos/soccer/500/23655.png',
  'al ahli': 'https://a.espncdn.com/i/teamlogos/soccer/500/23655.png',
  'الشباب': 'https://a.espncdn.com/i/teamlogos/soccer/500/23657.png',
  'الاتفاق': 'https://a.espncdn.com/i/teamlogos/soccer/500/23659.png',
  'التعاون': 'https://a.espncdn.com/i/teamlogos/soccer/500/23660.png',
  'ضمك': 'https://a.espncdn.com/i/teamlogos/soccer/500/24816.png',
  'القادسية': 'https://a.espncdn.com/i/teamlogos/soccer/500/23661.png',
};

// Player headshots from ESPN
const playerImages = {
  'محمد صلاح': 'https://a.espncdn.com/i/headshots/soccer/players/full/152747.png',
  'salah': 'https://a.espncdn.com/i/headshots/soccer/players/full/152747.png',
  'هالاند': 'https://a.espncdn.com/i/headshots/soccer/players/full/262665.png',
  'haaland': 'https://a.espncdn.com/i/headshots/soccer/players/full/262665.png',
  'مبابي': 'https://a.espncdn.com/i/headshots/soccer/players/full/230436.png',
  'mbappe': 'https://a.espncdn.com/i/headshots/soccer/players/full/230436.png',
  'mbappé': 'https://a.espncdn.com/i/headshots/soccer/players/full/230436.png',
  'رونالدو': 'https://a.espncdn.com/i/headshots/soccer/players/full/28668.png',
  'ronaldo': 'https://a.espncdn.com/i/headshots/soccer/players/full/28668.png',
  'ميسي': 'https://a.espncdn.com/i/headshots/soccer/players/full/45843.png',
  'messi': 'https://a.espncdn.com/i/headshots/soccer/players/full/45843.png',
  'بنزيما': 'https://a.espncdn.com/i/headshots/soccer/players/full/40459.png',
  'benzema': 'https://a.espncdn.com/i/headshots/soccer/players/full/40459.png',
  'نيمار': 'https://a.espncdn.com/i/headshots/soccer/players/full/131685.png',
  'neymar': 'https://a.espncdn.com/i/headshots/soccer/players/full/131685.png',
  'بيلينغهام': 'https://a.espncdn.com/i/headshots/soccer/players/full/282289.png',
  'bellingham': 'https://a.espncdn.com/i/headshots/soccer/players/full/282289.png',
  'فينيسيوس': 'https://a.espncdn.com/i/headshots/soccer/players/full/233498.png',
  'vinicius': 'https://a.espncdn.com/i/headshots/soccer/players/full/233498.png',
  'بالمر': 'https://a.espncdn.com/i/headshots/soccer/players/full/284148.png',
  'palmer': 'https://a.espncdn.com/i/headshots/soccer/players/full/284148.png',
  'ساكا': 'https://a.espncdn.com/i/headshots/soccer/players/full/265186.png',
  'saka': 'https://a.espncdn.com/i/headshots/soccer/players/full/265186.png',
  'يامال': 'https://a.espncdn.com/i/headshots/soccer/players/full/312498.png',
  'yamal': 'https://a.espncdn.com/i/headshots/soccer/players/full/312498.png',
  'إيساك': 'https://a.espncdn.com/i/headshots/soccer/players/full/247074.png',
  'isak': 'https://a.espncdn.com/i/headshots/soccer/players/full/247074.png',
  'ليفاندوفسكي': 'https://a.espncdn.com/i/headshots/soccer/players/full/104810.png',
  'lewandowski': 'https://a.espncdn.com/i/headshots/soccer/players/full/104810.png',
  'رافينيا': 'https://a.espncdn.com/i/headshots/soccer/players/full/247207.png',
  'raphinha': 'https://a.espncdn.com/i/headshots/soccer/players/full/247207.png',
  'جيوكيريس': 'https://a.espncdn.com/i/headshots/soccer/players/full/258906.png',
  'gyökeres': 'https://a.espncdn.com/i/headshots/soccer/players/full/258906.png',
  'أرتيتا': 'https://a.espncdn.com/i/headshots/soccer/players/full/22328.png',
  'arteta': 'https://a.espncdn.com/i/headshots/soccer/players/full/22328.png',
  'غوارديولا': 'https://a.espncdn.com/i/headshots/soccer/players/full/7518.png',
  'guardiola': 'https://a.espncdn.com/i/headshots/soccer/players/full/7518.png',
  'كلوب': 'https://a.espncdn.com/i/headshots/soccer/players/full/63568.png',
  'klopp': 'https://a.espncdn.com/i/headshots/soccer/players/full/63568.png',
  'أنشيلوتي': 'https://a.espncdn.com/i/headshots/soccer/players/full/63570.png',
  'ancelotti': 'https://a.espncdn.com/i/headshots/soccer/players/full/63570.png',
  'تن هاج': 'https://a.espncdn.com/i/headshots/soccer/players/full/121992.png',
  'ten hag': 'https://a.espncdn.com/i/headshots/soccer/players/full/121992.png',
  'كانتي': 'https://a.espncdn.com/i/headshots/soccer/players/full/178963.png',
  'kante': 'https://a.espncdn.com/i/headshots/soccer/players/full/178963.png',
  'محرز': 'https://a.espncdn.com/i/headshots/soccer/players/full/178254.png',
  'mahrez': 'https://a.espncdn.com/i/headshots/soccer/players/full/178254.png',
  'ميتروفيتش': 'https://a.espncdn.com/i/headshots/soccer/players/full/177002.png',
  'mitrovic': 'https://a.espncdn.com/i/headshots/soccer/players/full/177002.png',
};

// League / organization logos
const orgImages = {
  'فيفا': 'https://a.espncdn.com/i/leaguelogos/soccer/500/4.png',
  'fifa': 'https://a.espncdn.com/i/leaguelogos/soccer/500/4.png',
  'يويفا': 'https://a.espncdn.com/i/leaguelogos/soccer/500/5.png',
  'uefa': 'https://a.espncdn.com/i/leaguelogos/soccer/500/5.png',
  'الدوري الإنجليزي': 'https://a.espncdn.com/i/leaguelogos/soccer/500/23.png',
  'premier league': 'https://a.espncdn.com/i/leaguelogos/soccer/500/23.png',
  'بريميير': 'https://a.espncdn.com/i/leaguelogos/soccer/500/23.png',
  'دوري أبطال': 'https://a.espncdn.com/i/leaguelogos/soccer/500/2.png',
  'champions league': 'https://a.espncdn.com/i/leaguelogos/soccer/500/2.png',
  'دوري الأمم': 'https://a.espncdn.com/i/leaguelogos/soccer/500/5.png',
  'nations league': 'https://a.espncdn.com/i/leaguelogos/soccer/500/5.png',
  'الدوري الإسباني': 'https://a.espncdn.com/i/leaguelogos/soccer/500/15.png',
  'la liga': 'https://a.espncdn.com/i/leaguelogos/soccer/500/15.png',
  'الدوري الألماني': 'https://a.espncdn.com/i/leaguelogos/soccer/500/10.png',
  'bundesliga': 'https://a.espncdn.com/i/leaguelogos/soccer/500/10.png',
  'بوندسليغا': 'https://a.espncdn.com/i/leaguelogos/soccer/500/10.png',
  'الدوري الإيطالي': 'https://a.espncdn.com/i/leaguelogos/soccer/500/12.png',
  'serie a': 'https://a.espncdn.com/i/leaguelogos/soccer/500/12.png',
  'الدوري الفرنسي': 'https://a.espncdn.com/i/leaguelogos/soccer/500/9.png',
  'ligue 1': 'https://a.espncdn.com/i/leaguelogos/soccer/500/9.png',
  'دوري روشن': 'https://a.espncdn.com/i/leaguelogos/soccer/500/2369.png',
  'روشن': 'https://a.espncdn.com/i/leaguelogos/soccer/500/2369.png',
  'كأس العالم': 'https://a.espncdn.com/i/leaguelogos/soccer/500/4.png',
  'world cup': 'https://a.espncdn.com/i/leaguelogos/soccer/500/4.png',
  'كأس آسيا': 'https://a.espncdn.com/i/leaguelogos/soccer/500/30.png',
  'asian cup': 'https://a.espncdn.com/i/leaguelogos/soccer/500/30.png',
  'كأس أفريقيا': 'https://a.espncdn.com/i/leaguelogos/soccer/500/1457.png',
  'يورو': 'https://a.espncdn.com/i/leaguelogos/soccer/500/5.png',
  'euro': 'https://a.espncdn.com/i/leaguelogos/soccer/500/5.png',
  'الدوري السوبر': 'https://a.espncdn.com/i/leaguelogos/soccer/500/5.png',
  'super league': 'https://a.espncdn.com/i/leaguelogos/soccer/500/5.png',
};

// Varied fallback images for different topics
const topicImages = {
  'انتقال': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  'صفقة': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  'تعاقد': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  'transfer': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  'إصابة': 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=800&q=80',
  'injury': 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=800&q=80',
  'هدف': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
  'goal': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
  'تدريب': 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80',
  'training': 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80',
  'معسكر': 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80',
  'قرعة': 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80',
  'ملعب': 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80',
  'stadium': 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80',
  'حكم': 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
  'referee': 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
  'var': 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
  'تقنية': 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
  'جمهور': 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
  'fans': 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
  'ترتيب': 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80',
  'standings': 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80',
  'كأس': 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80',
  'trophy': 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80',
  'بطولة': 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80',
};

// General football images (varied, never repeating)
const generalImages = [
  'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80',
  'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&q=80',
  'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80',
  'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
  'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80',
  'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80',
  'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
  'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800&q=80',
  'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
];

/**
 * Resolve the best matching image for a news article
 * Priority: article image > player > team > organization > topic > varied fallback
 */
export function resolveImage(title, description, existingImage, index) {
  // If article already has an image, use it
  if (existingImage) return existingImage;

  const text = ((title || '') + ' ' + (description || '')).toLowerCase();

  // 1. Check for player names first (most specific)
  for (const [keyword, url] of Object.entries(playerImages)) {
    if (text.includes(keyword)) return url;
  }

  // 2. Check for team names
  for (const [keyword, url] of Object.entries(teamLogos)) {
    if (text.includes(keyword)) return url;
  }

  // 3. Check for organizations/leagues
  for (const [keyword, url] of Object.entries(orgImages)) {
    if (text.includes(keyword)) return url;
  }

  // 4. Check for topics
  for (const [keyword, url] of Object.entries(topicImages)) {
    if (text.includes(keyword)) return url;
  }

  // 5. Use varied fallback (different image for each article)
  return generalImages[(index || 0) % generalImages.length];
}
