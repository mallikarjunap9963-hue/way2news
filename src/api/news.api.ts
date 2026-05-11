import axios from "axios";
import type { Workspace, NewsResponse } from "../types/news.types";

const API_KEY = "d2759195754548639d11d677ab137684";

axios.interceptors.request.use((config) => {
  config.params = { ...config.params, apiKey: API_KEY };
  return config;
});

export const fetchNews = async (workspace: Workspace, page: number = 1): Promise<NewsResponse> => {
  const query = workspace.primaryKeywords;
  const excluded = workspace.excludedKeywords.split(',').map(k => `-${k.trim()}`).join(' ');
  const fullQuery = `${query} ${excluded}`.trim();

  const params = {
    q: fullQuery,
    language: workspace.language,
    from: workspace.dateFrom,
    to: workspace.dateTo,
    sortBy: 'publishedAt',
    page,
    pageSize: 20,
  };

  const res = await axios.get<NewsResponse>('https://newsapi.org/v2/everything', { params });
  return res.data;
};

export const getTeslaNews = async (): Promise<NewsResponse> => {
  const params = {
    q: 'tesla',
    language: 'en',
    sortBy: 'publishedAt',
    page: 1,
    pageSize: 20,
  };

  const res = await axios.get<NewsResponse>('https://newsapi.org/v2/everything', { params });
  return res.data;
};