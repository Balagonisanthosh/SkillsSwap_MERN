import { Outlet } from "react-router-dom";
import MainDashboard from "./components/MainDashboard";

function App() {
  return (
    <>
      <MainDashboard />
      <Outlet />   
    </>
  );
}

export default App;
