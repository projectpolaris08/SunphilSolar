module.exports = async function handler(req, res) {
  // Allow requests from your frontend domain
  res.setHeader("Access-Control-Allow-Origin", "https://sunphilsolar.com");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const apiKey = process.env.NEWSAPI_KEY;
  const url = `https://eventregistry.org/api/v1/article/getArticles?apiKey=${apiKey}&resultType=articles&articlesPage=1&articlesCount=3&articlesSortBy=date&articlesSortByAsc=false&articleBodyLen=300&lang=eng`;

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
