import { EventRegistry } from "eventregistry";

export default async function handler(req, res) {
  const er = new EventRegistry({
    apiKey: process.env.NEWSAPI_KEY,
  });

  try {
    // Fetch latest 3 English articles
    const response = await er.getJson("eventRegistry", {
      action: "getArticles",
      articlesPage: 1,
      articlesCount: 3,
      articlesSortBy: "date",
      articlesSortByAsc: false,
      articlesArticleBodyLen: 300,
      articlesLang: "eng",
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
