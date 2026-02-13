// Fetch REAL football news through our Server API
// Uses RSS feeds from BBC Sport, Sky Sports, ESPN, and Google News

export async function fetchFootballNews() {
  console.log('Fetching REAL news through server...');

  try {
    const response = await fetch('/api/test-news');

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Server returned error');
    }

    console.log(`Got ${data.articles.length} articles from ${data.source}`);
    return formatArticles(data.articles, data.source);

  } catch (error) {
    console.error('Error fetching news:', error.message);
    throw new Error(`تعذر جلب الأخبار: ${error.message}`);
  }
}

// Fetch just headlines for the news ticker
export async function fetchBreakingNews() {
  try {
    const response = await fetch('/api/test-news');

    if (!response.ok) return [];

    const data = await response.json();
    if (!data.success || !data.articles?.length) return [];

    return data.articles.slice(0, 10).map((article, i) => ({
      id: i + 1,
      text: article.title,
      url: article.url,
      urgent: i < 3  // First 3 items marked as urgent
    }));

  } catch {
    return [];
  }
}

function formatArticles(articles, source) {
  const defaultImage = 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=90';

  return articles.slice(0, 15).map((article, index) => ({
    id: `${source}-${index}-${Date.now()}`,
    title: article.title || 'خبر رياضي',
    summary: cleanText(article.description) || '',
    category: detectCategory(article.title, article.description, source),
    date: formatDate(article.publishedAt),
    image: article.image || defaultImage,
    readTime: estimateReadTime(article.description),
    url: article.url || '#',
    source: article.source || source
  }));
}

function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 300);
}

function formatDate(dateStr) {
  if (!dateStr) return new Date().toLocaleDateString('ar-SA');
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffDays < 7) return `منذ ${diffDays} يوم`;
    return date.toLocaleDateString('ar-SA');
  } catch {
    return new Date().toLocaleDateString('ar-SA');
  }
}

function estimateReadTime(text) {
  if (!text) return '2 دقائق';
  const words = text.split(/\s+/).length;
  const mins = Math.max(2, Math.ceil(words / 200));
  return `${mins} دقائق`;
}

function detectCategory(title, description, source) {
  const text = ((title || '') + ' ' + (description || '')).toLowerCase();

  // Premier League
  if (text.match(/premier league|بريميير|الدوري الإنجليزي|epl/)) return 'الدوري الإنجليزي';

  // Champions League
  if (text.match(/champions league|دوري الأبطال|ucl/)) return 'دوري الأبطال';

  // Saudi League
  if (text.match(/saudi|روشن|الهلال|النصر|الاتحاد|الأهلي السعودي|spl/)) return 'دوري روشن';

  // La Liga
  if (text.match(/la liga|barcelona|real madrid|الدوري الإسباني|برشلونة|ريال مدريد/)) return 'الدوري الإسباني';

  // Bundesliga
  if (text.match(/bundesliga|bayern|بوندسليغا|بايرن/)) return 'الدوري الألماني';

  // Serie A
  if (text.match(/serie a|سيري إيه|الدوري الإيطالي/)) return 'الدوري الإيطالي';

  // Ligue 1
  if (text.match(/ligue 1|psg|الدوري الفرنسي|باريس/)) return 'الدوري الفرنسي';

  // Transfer news
  if (text.match(/transfer|sign|deal|انتقال|صفقة|تعاقد/)) return 'انتقالات';

  // World Cup / International
  if (text.match(/world cup|كأس العالم|international|منتخب/)) return 'منتخبات';

  // Specific teams
  if (text.match(/liverpool|ليفربول/)) return 'الدوري الإنجليزي';
  if (text.match(/manchester|مانشستر/)) return 'الدوري الإنجليزي';
  if (text.match(/arsenal|أرسنال/)) return 'الدوري الإنجليزي';
  if (text.match(/chelsea|تشيلسي/)) return 'الدوري الإنجليزي';

  return 'أخبار كرة القدم';
}
