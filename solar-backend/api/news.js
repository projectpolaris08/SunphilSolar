const fetch = require("node-fetch");

module.exports = async function handler(req, res) {
  const apiKey = process.env.NEWSAPI_KEY;
  const url = `https://eventregistry.org/api/v1/article/getArticles?apiKey=${apiKey}&resultType=articles&articlesPage=1&articlesCount=3&articlesSortBy=date&articlesSortByAsc=false&articleBodyLen=300&lang=eng`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
