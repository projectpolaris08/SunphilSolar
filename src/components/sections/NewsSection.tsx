import { useEffect, useState } from "react";

interface NewsArticle {
  id: string;
  title: string;
  url: string;
  body: string;
  date: string;
  image?: string;
}

const backendUrl = "/api/news";

export const NewsSection = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(backendUrl);
        const data = await res.json();
        if (data.articles && data.articles.results) {
          setArticles(
            data.articles.results.map((a: any) => ({
              id: a.id,
              title: a.title,
              url: a.url,
              body: a.body,
              date: a.date,
              image: a.image,
            }))
          );
        } else {
          setError("No articles found.");
        }
      } catch (err) {
        setError("Failed to fetch news articles.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Latest News</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading news...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <a
                href={article.url}
                key={article.id}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 hover:ring-2 hover:ring-blue-400"
              >
                {article.image && (
                  <div className="relative overflow-hidden h-48 bg-gray-200">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2 text-sm text-gray-500">
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.body}
                  </p>
                  <span className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                    Read More
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
