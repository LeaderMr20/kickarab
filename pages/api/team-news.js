import { resolveImage } from '../../lib/imageResolver';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=120');

  const team = req.query.team || 'Al Hilal';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const rssUrl = encodeURIComponent(`https://news.google.com/rss/search?q=${team}+football&hl=en&gl=US&ceid=US:en`);
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
          team,
          articles: data.items.map((item, i) => {
            const title = item.title || '';
            const description = (item.description || '').replace(/<[^>]*>/g, '').substring(0, 300);
            const existingImage = item.thumbnail || item.enclosure?.thumbnail || null;

            return {
              title,
              description,
              url: item.link,
              image: resolveImage(title, description, existingImage, i),
              publishedAt: item.pubDate,
              source: item.author || 'Google News'
            };
          })
        });
      }
    }

    return res.status(503).json({
      success: false,
      error: 'No team news found',
      message: `تعذر جلب أخبار ${team}`
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
}
