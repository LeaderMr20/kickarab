import { resolveImage } from '../../lib/imageResolver';

function formatArticles(items, source) {
  return items.map((item, i) => {
    const title = item.title || '';
    const description = (item.description || '').replace(/<[^>]*>/g, '').substring(0, 300);
    const existingImage = item.thumbnail || item.enclosure?.thumbnail || null;

    return {
      title,
      description,
      url: item.link,
      image: resolveImage(title, description, existingImage, i),
      publishedAt: item.pubDate,
      source: item.author || source
    };
  });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=120');

  try {
    // Source 1: Arabic football news (priority)
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const rssUrl = encodeURIComponent('https://news.google.com/rss/search?q=كرة+قدم&hl=ar&gl=SA&ceid=SA:ar');
      const response = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=' + rssUrl,
        { signal: controller.signal }
      );
      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'ok' && data.items?.length > 0) {
          return res.status(200).json({
            success: true,
            source: 'أخبار عربية',
            articles: formatArticles(data.items, 'أخبار كرة القدم')
          });
        }
      }
    } catch (e) {
      console.log('Arabic news failed:', e.message);
    }

    // Source 2: Arabic leagues news
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const rssUrl = encodeURIComponent('https://news.google.com/rss/search?q=الدوري+الإنجليزي+OR+دوري+روشن+OR+دوري+أبطال&hl=ar&gl=SA&ceid=SA:ar');
      const response = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=' + rssUrl,
        { signal: controller.signal }
      );
      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'ok' && data.items?.length > 0) {
          return res.status(200).json({
            success: true,
            source: 'أخبار الدوريات',
            articles: formatArticles(data.items, 'أخبار رياضية')
          });
        }
      }
    } catch (e) {
      console.log('Arabic leagues failed:', e.message);
    }

    // Source 3: Arabic transfer/player news
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const rssUrl = encodeURIComponent('https://news.google.com/rss/search?q=صفقات+انتقالات+لاعبين+كرة+القدم&hl=ar&gl=SA&ceid=SA:ar');
      const response = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=' + rssUrl,
        { signal: controller.signal }
      );
      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'ok' && data.items?.length > 0) {
          return res.status(200).json({
            success: true,
            source: 'أخبار انتقالات',
            articles: formatArticles(data.items, 'أخبار انتقالات')
          });
        }
      }
    } catch (e) {
      console.log('Arabic transfers failed:', e.message);
    }

    return res.status(503).json({
      success: false,
      error: 'All news sources unavailable',
      message: 'تعذر جلب الأخبار. يرجى المحاولة لاحقاً.'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
}
