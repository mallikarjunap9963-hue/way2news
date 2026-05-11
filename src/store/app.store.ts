import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Article, Workspace } from '../types/news.types';

interface AppState {
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
  savedArticles: Article[];
  isInitialized: boolean;
  articles: Article[];

  addWorkspace: (workspace: Workspace) => void;
  setActiveWorkspace: (id: string) => void;
  deleteWorkspace: (id: string) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;

  saveArticle: (article: Article) => void;
  removeArticle: (url: string) => void;

  setIsInitialized: (value: boolean) => void;

  setArticles: (articles: Article[]) => void;
  clearArticles: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      workspaces: [],
      activeWorkspaceId: null,
      savedArticles: [],
      isInitialized: false,
      articles: [],

      addWorkspace: (workspace) =>
        set((state) => ({
          workspaces: [...state.workspaces, workspace],
          activeWorkspaceId: workspace.id,
        })),

      setActiveWorkspace: (id) =>
        set(() => ({ activeWorkspaceId: id })),

      deleteWorkspace: (id) =>
        set((state) => {
          const updatedWorkspaces = state.workspaces.filter(ws => ws.id !== id);
          const newActiveId =
            state.activeWorkspaceId === id
              ? updatedWorkspaces[0]?.id || null
              : state.activeWorkspaceId;

          return {
            workspaces: updatedWorkspaces,
            activeWorkspaceId: newActiveId,
          };
        }),

      setWorkspaces: (workspaces) =>
        set(() => ({
          workspaces,
          activeWorkspaceId: workspaces[0]?.id || null,
        })),

      saveArticle: (article) =>
        set((state) => ({
          savedArticles: state.savedArticles.some(a => a.url === article.url)
            ? state.savedArticles
            : [...state.savedArticles, article],
        })),

      removeArticle: (url) =>
        set((state) => ({
          savedArticles: state.savedArticles.filter(a => a.url !== url),
        })),

      setIsInitialized: (value) =>
        set(() => ({ isInitialized: value })),

      setArticles: (articles) =>
        set(() => ({ articles })),

      clearArticles: () =>
        set(() => ({ articles: [] })),
    }),
    {
      name: 'news-app-storage',
    }
  )
);