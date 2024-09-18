import { FaSpotify } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex gap-x-4 items-center p-5 pt-8">
        <FaSpotify className="fill-purple-600" size={60} />
        <h1 className="text-[2rem] font-semibold">
          Download Spotify Playlists
        </h1>
      </div>
      <div className="p-5 flex flex-col justify-center gap-y-6 mt-32">
        <input
          type="text"
          name="link"
          className="mx-auto bg-[#242424] w-[90%] md:w-[70%] lg:w-[40%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all"
        />
        <div className="flex gap-x-4 justify-center">
          <NavLink
            to={"/spotify"}
            className={
              "font-semibold bg-purple-400 text-[#121212] rounded-[5px] px-3 py-4 hover:scale-105 hover:bg-purple-300 transition-all"
            }
          >
            Spotify Playlist
          </NavLink>
          <NavLink
            to={"/name"}
            className={
              "font-semibold bg-purple-400 text-[#121212] rounded-[5px] px-3 py-4 hover:scale-105 hover:bg-purple-300 transition-all"
            }
          >
            Song Name
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
