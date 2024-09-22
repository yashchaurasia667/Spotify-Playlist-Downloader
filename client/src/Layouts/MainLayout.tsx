import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-[100vh] grid grid-cols-[1.3fr_8fr]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
