export default async function handler(req, res) {
  const RAPID_API_KEY = process.env.RAPID_API_KEY;
  const RAPID_API_HOST = "api-football-v1.p.rapidapi.com";

  res.setHeader('Content-Type', 'application/json');

  // تحقق من المفتاح
  if (!RAPID_API_KEY) {
    return res.status(400).json({
      error: "RAPID_API_KEY is not set",
      env_keys: Object.keys(process.env).filter(k => k.includes('API') || k.includes('api'))
    });
  }

  try {
    console.log("Testing API with key:", RAPID_API_KEY.substring(0, 10) + "...");
    
    const response = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all&limit=5", {
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST
      }
    });

    const data = await response.json();

    return res.status(response.status).json({
      status: response.status,
      message: response.ok ? "API works!" : "API returned error",
      data: data,
      response_count: data.response ? data.response.length : 0
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
}
