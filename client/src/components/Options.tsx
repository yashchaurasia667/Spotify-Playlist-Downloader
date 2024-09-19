import { NavLink } from "react-router-dom";

const Options = () => {
  return (
    <div className="flex gap-x-4 justify-center">
      <NavLink to={"/"} className={"navlink"}>
        Spotify Playlist
      </NavLink>
      <NavLink to={"/name"} className={"navlink"}>
        Song Name
      </NavLink>
      <NavLink to={"/reset"} className={"navlink"}>
        Initialize
      </NavLink>
    </div>
  );
};

export default Options;
