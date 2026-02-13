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
            articles: data.items.map(item => ({
              title: item.title,
              description: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 300),
              url: item.link,
              image: item.thumbnail || item.enclosure?.thumbnail || null,
              publishedAt: item.pubDate,
              source: item.author || 'أخبار كرة القدم'
            }))
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
            articles: data.items.map(item => ({
              title: item.title,
              description: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 300),
              url: item.link,
              image: item.thumbnail || item.enclosure?.thumbnail || null,
              publishedAt: item.pubDate,
              source: item.author || 'أخبار رياضية'
            }))
          });
        }
      }
    } catch (e) {
      console.log('Arabic leagues failed:', e.message);
    }

    // Source 3: BBC Sport Football RSS
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/sport/football/rss.xml',
        { signal: controller.signal }
      );
      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'ok' && data.items?.length > 0) {
          return res.status(200).json({
            success: true,
            source: 'BBC Sport',
            articles: data.items.map(item => ({
              title: item.title,
              description: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 300),
              url: item.link,
              image: item.thumbnail || item.enclosure?.thumbnail || null,
              publishedAt: item.pubDate,
              source: 'BBC Sport'
            }))
          });
        }
      }
    } catch (e) {
      console.log('BBC Sport failed:', e.message);
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
