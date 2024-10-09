import React, { useEffect, useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SongTile, { Song } from "./SongTile";
import PlaylistTile from "./PlaylistTile";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [qtype, setQtype] = useState<"Playlist" | "Name">("Name");
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState({
    cover: "",
    name: "",
  });

  const toastStyle = {
    backgroundColor: "#232323",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query == "") return;

    setLoading(true);
    setSongs([]);
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
        if (qtype == "Playlist") {
          setPlaylist({
            cover: data.cover,
            name: data.name,
          });
        } else {
          setPlaylist((prev) => ({
            ...prev,
            name: "",
          }));
        }
        setSongs(data.songs);
      } else throw new Error("Check the playlist link");
    } catch (error) {
      console.error(`Error fetching songs: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const renderResult = useMemo(() => {
    return songs.map((song, index) => <SongTile key={index} {...song} />);
  }, [songs]);

  const connectSpotify = async () => {
    const creds = localStorage.getItem("credentials");
    if (creds) {
      console.log(creds);
      try {
        const res = await fetch("/api/connect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: creds,
        });
        const data = await res.json();
        if (data.success) {
          console.log(data);
          toast.success("Successfully connect to Spotify API", {
            style: toastStyle,
          });
        } else {
          toast.error(
            "Couldn't connect to Spotify check your Credentials and internet and try again...",
            {}
          );
          throw new Error("403");
        }
      } catch (error) {
        if (error instanceof Error && error.message == "403")
          toast.error("Check your spotify credentials", {
            style: toastStyle,
          });
        else toast.error("Couldn't connect to Spotify", { style: toastStyle });
      }
    } else console.error("Could not find Credentials in localStorage");
  };

  useEffect(() => {
    connectSpotify();
  }, []);

  return (
    <div className="grid grid-rows-[2fr_5fr] p-5 h-[100vh]">
      <div className="w-[100%] h-[40%] p-5 self-end">
        <ToastContainer
          position="top-right"
          theme="dark"
          pauseOnHover
          pauseOnFocusLoss
        />
        <form
          method="post"
          className="flex md:flex-row flex-col justify-center items-center gap-x-3 gap-y-6"
          onSubmit={handleSubmit}
        >
          <div className="dropdown">
            <div className="select flex items-center gap-x-2">
              {qtype}
              <FaChevronDown />
            </div>
            <div className="dropdown_content">
              <div onClick={() => setQtype("Name")}>Name</div>
              <div onClick={() => setQtype("Playlist")}>Playlist</div>
            </div>
          </div>

          <input
            type="text"
            name="link"
            className="bg-[#242424] w-[90%] md:w-[40%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all"
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
      {loading ? (
        <PacmanLoader
          color="#a855f7"
          size={35}
          className="absolute left-1/3 mt-16"
        />
      ) : (
        <div
          className={`${
            playlist.name == "" ? "" : "bg-[#282828]"
          } rounded-xl w-[90%] px-3 mx-auto mt-8 overflow-auto`}
        >
          <div className={playlist.name == "" ? "hidden" : ""}>
            <PlaylistTile {...playlist} />
          </div>
          <div
            className={`${
              playlist.name == "" ? "mx-auto w-[75%]" : ""
            } mt-5 overflow-auto`}
          >
            {renderResult}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
