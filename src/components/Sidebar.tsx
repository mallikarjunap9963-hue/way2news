import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../store/app.store";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    workspaces,
    activeWorkspaceId,
    setActiveWorkspace,
    deleteWorkspace,
    savedArticles,
  } = useAppStore();

  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleWorkspaceClick = (workspaceId: string) => {
    setActiveWorkspace(workspaceId);
    navigate("/feed");
  };

  const handleDeleteWorkspace = (workspaceId: string) => {
    deleteWorkspace(workspaceId);
    setDeleteConfirm(null);
    if (activeWorkspaceId === workspaceId) {
      navigate("/");
    }
  };

  return (
    <aside className="w-64 h-screen sticky top-0 bg-slate-950 text-white p-5 flex flex-col gap-6 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold">
          N
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-lg font-semibold text-left hover:opacity-80 transition"
        >
          News-OS Aggregator
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Your Feeds
        </p>

        {workspaces.length === 0 && (
          <p className="text-xs text-gray-500">No workspaces yet</p>
        )}

        {workspaces.map((ws) => (
          <div key={ws.id} className="group relative">
            <button
              onClick={() => handleWorkspaceClick(ws.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${
                location.pathname === "/feed" && activeWorkspaceId === ws.id
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

      <button
        onClick={() => navigate("/read-later")}
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white mt-auto"
      >
        ⭐ Saved ({savedArticles.length})
      </button>
    </aside>
  );
}