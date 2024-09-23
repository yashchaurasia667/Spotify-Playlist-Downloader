import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Search = () => {
  const [query, setQuery] = useState("");
  const [qtype, setQtype] = useState("Playlist");
  const [result, setResult] = useState("");

  // const renderResult = ({
  //   album,
  //   artists,
  //   duration,
  //   images,
  //   index,
  //   name,
  // }) => {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, qtype }),
      });
      const data = await res.json();
      if (data.success) {
        // data.songs.forEach((song) => {
        //   console.log(song);
        // });
        setResult(data.songs);
      }
    } catch (error) {
      throw new Error(`Something weent wrong... ${error}`);
    }
  };

  return (
    <div className="w-[100%] p-5 flex flex-col justify-center gap-y-6">
      <form
        method="post"
        className="flex lg:flex-row flex-col justify-center items-center gap-x-3 gap-y-6"
        onSubmit={handleSubmit}
      >
        <div className="dropdown">
          <div className="select flex items-center gap-x-2">
            {qtype}
            <FaChevronDown />
          </div>
          <div className="dropdown_content">
            <div onClick={() => setQtype("Playlist")}>Playlist</div>
            <div onClick={() => setQtype("Name")}>Name</div>
          </div>
        </div>

        <input
          type="text"
          name="link"
          className="bg-[#242424] w-[90%] md:w-[70%] lg:w-[40%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all"
          placeholder={
            qtype === "Name"
              ? "Name of the song"
              : "Link to the Spotify playlist"
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          type="submit"
          className="font-semibold bg-purple-400 text-[#121212] rounded-full px-10 py-4 hover:scale-105 hover:bg-purple-300 transition-all"
        >
          Search
        </button>
      </form>
      <div className="mx-auto w-[65%] flex flex-col items-center justify-center gap-y-3">
        <div className="w-[100%] h-[80px] rounded-lg bg-[#242424] px-6 py-4 flex justify-between items-center">
          <div className="flex gap-x-8">
            <img src={"/vite.svg"} alt="cover" className="rounded-lg" />
            <p className="text-lg font-semibold">{"title"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
