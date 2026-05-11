import { useEffect, useState } from "react";
import { getTeslaNews } from "../api/news.api";
import type { Article } from "../types/news.types";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    getTeslaNews().then((data) => setNews(data.articles));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Tesla News</h1>

      <div className="grid gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3">
        {news.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;