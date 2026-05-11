import { useState } from "react";
import Sidebar from "../components/Sidebar";
import NewsCard from "../components/NewsCard";
import { useAppStore } from "../store/app.store";

export default function ReadLater() {
  const { savedArticles } = useAppStore();
  const [search, setSearch] = useState("");

  const filteredArticles = savedArticles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) ||
    article.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">⭐ Saved Articles</h1>
          <p className="text-gray-600">
            {filteredArticles.length} of {savedArticles.length} articles saved
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Search saved articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, i) => (
              <NewsCard key={`${article.url}-${i}`} article={article} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-lg">
                {savedArticles.length === 0
                  ? "📭 No saved articles yet. Start saving your favorite news!"
                  : "🔍 No articles match your search."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}