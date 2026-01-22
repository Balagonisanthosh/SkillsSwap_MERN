import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "./store/authAuthStore";
import MainDashboard from "./components/MainDashboard";

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // ✅ ALWAYS check auth on refresh
  }, [fetchUser]);

  return (
    <>
      <MainDashboard />
      <Outlet />
    </>
  );
}

export default App;
