import { NavLink } from "react-router-dom";

const Options = () => {
  const navStyle =
    "font-semibold bg-purple-400 text-[#121212] rounded-[5px] px-3 py-4 hover:scale-105 hover:bg-purple-300 transition-all";
  return (
    <div className="flex gap-x-4 justify-center">
      <NavLink to={"/"} className={navStyle}>
        Spotify Playlist
      </NavLink>
      <NavLink to={"/name"} className={navStyle}>
        Song Name
      </NavLink>
      <NavLink to={"/reset"} className={navStyle}>
        Initialize
      </NavLink>
    </div>
  );
};

export default Options;
