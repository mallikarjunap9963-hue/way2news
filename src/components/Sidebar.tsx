import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../store/app.store";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { workspaces, activeWorkspaceId, setActiveWorkspace, deleteWorkspace, savedArticles } =
    useAppStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // 🔥 Hide workspaces on First Visit & Workspace Form
  const isInitialScreen =
    location.pathname === "/" || location.pathname === "/workspace/new";

  const handleWorkspaceClick = (workspaceId: string) => {
    setActiveWorkspace(workspaceId);
    navigate("/feed");
  };

  const handleDeleteWorkspace = (workspaceId: string) => {
    deleteWorkspace(workspaceId);
    setDeleteConfirm(null);
    // If the deleted workspace was active, navigate to home
    if (activeWorkspaceId === workspaceId) {
      navigate("/");
    }
  };

  return (
    <aside className="w-64 bg-slate-950 text-white p-5 flex flex-col gap-6 shadow-xl">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold">
          N
        </div>
        <h1 className="text-lg font-semibold">News-OS Aggregator</h1>
      </div>

      {/* Workspaces (hidden on first screens) */}
      {!isInitialScreen && (
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Your Feeds
          </p>

          {workspaces.map((ws) => (
            <div
              key={ws.id}
              className="group relative"
            >
              <button
                onClick={() => handleWorkspaceClick(ws.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${
                  activeWorkspaceId === ws.id
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`}
              >
                <div className="flex-1 truncate">
                  <p className="font-medium truncate">{ws.title}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {ws.primaryKeywords}
                  </p>
                </div>
              </button>

              {/* Delete button on hover */}
              {deleteConfirm === ws.id ? (
                <div className="absolute right-0 top-0 bg-red-600 rounded-lg p-2 text-xs whitespace-nowrap z-10">
                  <p className="mb-2">Delete workspace?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteWorkspace(ws.id)}
                      className="bg-red-700 px-2 py-1 rounded hover:bg-red-800"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="bg-slate-600 px-2 py-1 rounded hover:bg-slate-700"
                    >
                      No
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(ws.id)}
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300"
                  title="Delete workspace"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Saved Articles */}
      <button
        onClick={() => navigate("/read-later")}
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
      >
        ⭐ Saved ({savedArticles.length})
      </button>
    </aside>
  );
}