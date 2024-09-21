import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Search = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Playlist");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      throw new Error(`Something weent wrong... ${error}`);
    }
  };

  return (
    <div className="w-[100%] p-5 flex flex-col justify-center gap-y-6">
      <form
        method="post"
        className="flex lg:flex-row flex-col justify-center items-center gap-x-3 gap-y-6"
      >
        <div className="dropdown">
          <button
            className="flex items-center gap-x-2"
            onClick={(e) => e.preventDefault()}
          >
            {type}
            <FaChevronDown />
          </button>
          <div className="dropdown_content">
            <div onClick={() => setType("Playlist")}>Playlist</div>
            <div onClick={() => setType("Name")}>Name</div>
          </div>
        </div>

        <input
          type="text"
          name="link"
          className="bg-[#242424] w-[90%] md:w-[70%] lg:w-[40%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all"
          placeholder={
            type === "Name"
              ? "Name of the song"
              : "Link to the Spotify playlist"
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          type="submit"
          className="font-semibold bg-purple-400 text-[#121212] rounded-full px-10 py-4 hover:scale-105 hover:bg-purple-300 transition-all"
          onClick={(e) => handleSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
