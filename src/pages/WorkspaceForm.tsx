import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppStore } from "../store/app.store";
import type { Workspace } from "../types/news.types";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  primaryKeywords: z.string().min(1, "Primary keywords are required"),
  excludedKeywords: z.string(),
  language: z.string().min(1, "Language is required"),
  dateFrom: z.string().min(1, "Start date is required"),
  dateTo: z.string().min(1, "End date is required"),
}).refine((data) => {
  const primary = data.primaryKeywords.toLowerCase().split(',').map(k => k.trim());
  const excluded = data.excludedKeywords.toLowerCase().split(',').map(k => k.trim());
  return !primary.some(p => excluded.includes(p));
}, {
  message: "Excluded keywords cannot include primary keywords",
  path: ["excludedKeywords"],
}).refine((data) => new Date(data.dateFrom) <= new Date(data.dateTo), {
  message: "Start date must be before or equal to end date",
  path: ["dateFrom"],
});

type FormData = z.infer<typeof schema>;

export default function WorkspaceForm() {
  const navigate = useNavigate();
  const addWorkspace = useAppStore((state) => state.addWorkspace);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const workspace: Workspace = {
      id: crypto.randomUUID(),
      ...data,
    };
    addWorkspace(workspace);
    navigate("/feed");
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-900/70">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-0 rounded-[32px] bg-slate-900/50 shadow-2xl" />
          <div className="relative rounded-[32px] border border-slate-800 bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  New Smart Filter Workspace
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  Create your first workspace
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Define the news stream logic and the app will fetch relevant stories instantly.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
                <input
                  {...register("title")}
                  placeholder="e.g. AI Research Tracker"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                />
                {errors.title && <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Primary Keywords</label>
                <input
                  {...register("primaryKeywords")}
                  placeholder="e.g. artificial intelligence, LLM, neural networks"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                />
                {errors.primaryKeywords && (
                  <p className="mt-2 text-sm text-red-500">{errors.primaryKeywords.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Excluded Keywords</label>
                <input
                  {...register("excludedKeywords")}
                  placeholder="e.g. elections, cricket, celebrities"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                />
                {errors.excludedKeywords && (
                  <p className="mt-2 text-sm text-red-500">{errors.excludedKeywords.message}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Language</label>
                  <select
                    {...register("language")}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                  >
                    <option value="">Choose news language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                  {errors.language && (
                    <p className="mt-2 text-sm text-red-500">{errors.language.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Date Range</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      {...register("dateFrom")}
                      type="date"
                      title="Fetch news starting from this date"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                    />
                    <input
                      {...register("dateTo")}
                      type="date"
                      title="Fetch news up to this date"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
                    />
                  </div>
                  {(errors.dateFrom || errors.dateTo) && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.dateFrom?.message || errors.dateTo?.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
              >
                Create Workspace
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}