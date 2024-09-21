import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FaArrowDown, FaQuestion, FaSearch, FaSpotify } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const pages = {
    search: (
      <div className="flex gap-x-4 items-center">
        <FaSearch size={25} className="" />
        {isHovered ? <p className="text-xl">Search</p> : ""}
      </div>
    ),
    downloads: (
      <div className="flex gap-x-4 items-center">
        <FaArrowDown size={25} className="" />
        {isHovered ? <p className="text-xl">Downloads</p> : ""}
      </div>
    ),
    login: (
      <div className="flex gap-x-4 items-center">
        <CgProfile size={25} className="" />
        {isHovered ? <p className="text-xl">Login</p> : ""}
      </div>
    ),
    help: (
      <div className="flex gap-x-4 items-center">
        <FaQuestion size={25} className="" />
        {isHovered ? <p className="text-xl">Help</p> : ""}
      </div>
    ),
  };

  return (
    <div
      className="pl-4 pr-4 relative my-3 rounded-xl bg-[#242424] flex items-center w-[95px] hover:w-[240px] transition-all overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-y-4 ">
        <FaSpotify size={60} className="absolute top-6 left-[13px]" />
        <NavLink to={"/"} className={"navlink"}>
          {pages.search}
        </NavLink>
        <NavLink to={"/downloads"} className={"navlink"}>
          {pages.downloads}
        </NavLink>
        <NavLink to={"/login"} className={"navlink"}>
          {pages.login}
        </NavLink>
        <NavLink to={"/help"} className={"navlink"}>
          {pages.help}
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
