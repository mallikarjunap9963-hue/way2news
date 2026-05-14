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
    <div className="min-h-screen flex bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-950">
      <Sidebar />

      <div className="flex-1 flex items-center justify-center px-6 relative overflow-hidden">

        <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full"></div>

        <div className="w-full max-w-3xl relative z-10">

          <div className="bg-white/5 backdrop-blur-xl border border-emerald-400/10 rounded-3xl shadow-2xl p-12 text-center">

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Build your personal{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                News Workspace
              </span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10">
              Organize breaking news, trending topics, and personalized feeds
              into one powerful workspace experience.
            </p>

            <button
              onClick={() => navigate("/workspace/new")}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-emerald-500/30"
            >
              + Add Workspace
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}