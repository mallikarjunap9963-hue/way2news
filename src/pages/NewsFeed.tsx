import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import Sidebar from "../components/Sidebar";
import NewsCard from "../components/NewsCard";

import { fetchNews } from "../api/news.api";
import { useAppStore } from "../store/app.store";
import type { Article, NewsResponse } from "../types/news.types";

function removeDuplicateTitles(articles: Article[]): Article[] {
  const seen = new Set<string>();
  return articles.filter((a) => {
    if (seen.has(a.title)) return false;
    seen.add(a.title);
    return true;
  });
}

export default function NewsFeed() {
  const navigate = useNavigate();
  const { workspaces, activeWorkspaceId } = useAppStore();

  const activeWorkspace = workspaces.find(
    (ws) => ws.id === activeWorkspaceId
  );

  useEffect(() => {
    if (!activeWorkspace) navigate("/");
  }, [activeWorkspace, navigate]);

  if (!activeWorkspace) return null;

  const newsQuery = useInfiniteQuery<NewsResponse>({
    queryKey: ["news", activeWorkspace.id],
    initialPageParam: 1,
    enabled: !!activeWorkspace,
    queryFn: ({ pageParam }) =>
      fetchNews(activeWorkspace, pageParam as number),
    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.reduce(
        (sum, p) => sum + p.articles.length,
        0
      );
      return loaded < lastPage.totalResults
        ? pages.length + 1
        : undefined;
    },
  });

  const articles = useMemo(() => {
    const all =
      newsQuery.data?.pages.flatMap((p) => p.articles) ?? [];
    return removeDuplicateTitles(all);
  }, [newsQuery.data]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {activeWorkspace.title}
          </h1>
          <p className="text-gray-600">
            {articles.length} articles • Latest news on{" "}
            <span className="font-semibold text-blue-600">
              {activeWorkspace.primaryKeywords.split(",")[0].trim()}
            </span>
          </p>
        </header>

        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newsQuery.isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow animate-pulse"
              >
                <div className="h-52 bg-gray-300" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 w-2/3 rounded" />
                </div>
              </div>
            ))
          ) : articles.length > 0 ? (
            articles.map((article, i) => (
              <NewsCard
                key={`${article.url}-${i}`}
                article={article}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-gray-500 text-lg">
              No articles found. Try adjusting your filters.
            </div>
          )}
        </section>

        {newsQuery.hasNextPage && (
          <div className="text-center mt-12">
            <button
              onClick={() => newsQuery.fetchNextPage()}
              disabled={newsQuery.isFetchingNextPage}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50"
            >
              {newsQuery.isFetchingNextPage
                ? "Loading more..."
                : "Load More Articles"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}