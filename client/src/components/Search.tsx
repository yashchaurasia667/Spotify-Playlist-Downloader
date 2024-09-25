import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";

const Search = () => {
  const [query, setQuery] = useState("");
  const [qtype, setQtype] = useState("Playlist");
  const [response, setResponse] = useState("");
  const [result, setResult] = useState([]);

  const fromMilliseconds = (ms) => {
    let min = Math.floor(ms / 60000);
    let sec = ((ms % 60000) / 1000).toFixed(0);
    return min + ":" + (sec < 10 ? "0" : "") + sec;
  };

  const renderResult = () => {
    console.log(response);
    if (response != "loading" && response != "") {
      const newResults = response.map((item, index) => renderElement(item));
      setResult(newResults);
    }
  };

  const renderElement = ({ album, artists, duration, images, index, name }) => {
    return (
      <div className="font-semibold w-[100%] h-[80px] grid grid-cols-[3fr_1fr_1fr_1fr] items-center rounded-lg bg-[#242424] px-6 py-4">
        <div className="flex items-center gap-x-4 overflow-hidden">
          <div>{index}</div>
          <img src={images} width={"50px"} className="rounded-[10px]" />
          <div>
            <p className="text-purple-500">{name}</p>
            <p className="underline text-ellipsis">{artists}</p>
          </div>
        </div>
        <div>{album}</div>
        <div>{fromMilliseconds(duration)}</div>
        <button
          className="text-[#121212] bg-purple-500 hover:bg-purple-400 hover:scale-105 rounded-full px-4 py-2 transition-all"
          onClick={(e) => e.preventDefault()}
        >
          Download
        </button>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setResponse("loading");
      setResult([]);
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, qtype }),
      });
      const data = await res.json();
      if (data.success) {
        setResponse(data.songs);
      }
    } catch (error) {
      throw new Error(`Something weent wrong... ${error}`);
    }
  };

  useEffect(() => {
    console.log(response);
    renderResult();
  }, [response]);

  return (
    <div className="flex flex-col p-5 h-[100vh]">
      <div className="w-[100%] h-[40%] p-5 flex flex-col justify-end gap-y-6">
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
      </div>
      {response === "loading" ? (
        <PacmanLoader
          color="#a855f7"
          size={35}
          className="absolute left-1/3 mt-16"
        />
      ) : (
        ""
      )}
      <div className="mx-auto w-[65%] flex flex-col gap-y-3 mt-8 overflow-auto">
        {result.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default Search;
