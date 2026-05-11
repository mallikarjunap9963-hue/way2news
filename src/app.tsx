import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAppStore } from "./store/app.store";
import { fetchWorkspacesFromAPI } from "./api/workspace.api";

function App() {
  const setWorkspaces = useAppStore((state) => state.setWorkspaces);
  const isInitialized = useAppStore((state) => state.isInitialized);
  const setIsInitialized = useAppStore((state) => state.setIsInitialized);

  useEffect(() => {
    if (!isInitialized) {
      fetchWorkspacesFromAPI().then((workspaces) => {
        setWorkspaces(workspaces);
        setIsInitialized(true);
      });
    }
  }, [isInitialized, setWorkspaces, setIsInitialized]);

  return <AppRoutes />;
}

export default App;