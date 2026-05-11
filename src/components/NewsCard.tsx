import { useAppStore } from "../store/app.store";
import type { Article } from "../types/news.types";

export default function NewsCard({ article }: { article: Article }) {
  const { savedArticles, saveArticle, removeArticle } = useAppStore();
  const isSaved = savedArticles.some(a => a.url === article.url);

  const handleSave = () => {
    if (isSaved) {
      removeArticle(article.url);
    } else {
      saveArticle(article);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            📰 No Image
          </div>
        )}

        {/* Source Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {article.source.name.substring(0, 15)}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 text-2xl transition-all duration-200 hover:scale-125"
        >
          {isSaved ? "⭐" : "☆"}
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-bold text-base leading-tight text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {article.description || "No description available"}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-500 font-medium">
            {formatDate(article.publishedAt)}
          </span>

          {/* Read More Link */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            Read <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}