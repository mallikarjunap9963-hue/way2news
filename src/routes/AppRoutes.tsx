import { Routes, Route } from "react-router-dom";
import FirstVisit from "../pages/FirstVisit";
import WorkspaceForm from "../pages/WorkspaceForm";
import NewsFeed from "../pages/NewsFeed";
import ReadLater from "../pages/ReadLater";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FirstVisit />} />
      <Route path="/workspace/new" element={<WorkspaceForm />} />
      <Route path="/feed" element={<NewsFeed />} />
      <Route path="/read-later" element={<ReadLater />} />
    </Routes>
  );
}