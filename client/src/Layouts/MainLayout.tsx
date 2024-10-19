import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-[100vh] grid grid-cols-[1.3fr_8fr]">
      <Navbar />
      <div>
        <Outlet />
        <ToastContainer
          className={"overflow-clip absolute"}
          position="top-right"
          theme="dark"
          pauseOnHover
          pauseOnFocusLoss
        />
      </div>
    </div>
  );
};

export default MainLayout;
