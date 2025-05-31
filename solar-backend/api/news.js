const EventRegistry = require("eventregistry");

module.exports = async function handler(req, res) {
  const er = new EventRegistry({ apiKey: process.env.NEWSAPI_KEY });

  try {
    const q = er.queryArticles();
    q.setRequestedResult(er.RequestedResultArticlesInfo);
    q.setArticlesPage(1);
    q.setArticlesCount(3);
    q.setSortBy("date");
    q.setSortByAsc(false);
    q.setArticleBodyLen(300);
    q.setLang("eng");

    const response = await er.execQuery(q);
    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
