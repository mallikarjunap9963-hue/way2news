import type { Workspace } from "../types/news.types";

// Mock API - in production this would be a real backend
export const fetchWorkspacesFromAPI = async (): Promise<Workspace[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: "1",
      title: "Technology News",
      primaryKeywords: "AI, technology, innovation",
      excludedKeywords: "spam",
      language: "en",
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dateTo: new Date().toISOString().split('T')[0],
    },
    {
      id: "2",
      title: "Business & Finance",
      primaryKeywords: "business, stock market, economy",
      excludedKeywords: "rumor",
      language: "en",
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dateTo: new Date().toISOString().split('T')[0],
    },
    {
      id: "3",
      title: "Science & Space",
      primaryKeywords: "science, space, NASA, discovery",
      excludedKeywords: "fake news",
      language: "en",
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dateTo: new Date().toISOString().split('T')[0],
    },
    {
      id: "4",
      title: "Sports",
      primaryKeywords: "sports, football, basketball, games",
      excludedKeywords: "rumors",
      language: "en",
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dateTo: new Date().toISOString().split('T')[0],
    },
  ];
};