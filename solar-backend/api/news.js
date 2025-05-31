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
  const url =
    "https://eventregistry.org/api/v1/article/getArticlesForTopicPage";
  const body = JSON.stringify({
    uri: "240f6a12-b9d8-40a6-b1c6-a220e31d08de",
    infoArticleBodyLen: 300,
    resultType: "articles",
    articlesSortBy: "date",
    articlesSortByAsc: false,
    articlesCount: 3,
    apiKey: apiKey,
  });

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
