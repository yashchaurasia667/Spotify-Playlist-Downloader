import { FaSpotify } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Options from "../components/Options";

const MainLayout = () => {
  return (
    <>
      <div className="flex justify-between items-center px-8 pt-8">
        <div className="flex gap-x-4 items-center">
          <FaSpotify className="fill-purple-600" size={60} />
          <h1 className="text-[2rem] font-semibold">
            Download Spotify Playlists
          </h1>
        </div>
        <Options />
      </div>
      <Outlet />
    </>
  );
};

export default MainLayout;
