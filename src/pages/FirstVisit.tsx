import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router";
import { useAppStore } from "../store/app.store";

const FORCE_FIRST_VISIT = true;

export default function FirstVisit() {
  const navigate = useNavigate();
  const { workspaces } = useAppStore();

  useEffect(() => {
    if (!FORCE_FIRST_VISIT && workspaces.length > 0) {
      navigate("/feed");
    }
  }, [workspaces, navigate]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Create your first Workspace to start your news stream
            </h1>

          </div>

          <button onClick={() => navigate("/workspace/new")} className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition">
            + Add Workspace
          </button>
          
        </div>
      </div>
    </div>

  );
}