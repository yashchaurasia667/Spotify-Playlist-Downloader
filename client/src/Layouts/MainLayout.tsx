import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-[100vh] grid grid-cols-2">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
