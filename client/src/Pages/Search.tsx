import React, { useContext, useMemo } from "react";

import { PacmanLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import SongTile from "../components/SongTile";
import PlaylistTile from "../components/PlaylistTile";
import SearchBar from "../components/SearchBar";

import GlobalContext from "../context/globalContext/GlobalContext";

const Search: React.FC = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("No GlobalContext");
  }

  const { songs, loading, playlist } = context;

  const toastStyle = {
    backgroundColor: "#232323",
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
        } else throw new Error("403");
      } catch (error) {
        toast.error("Couldn't connect to Spotify", { style: toastStyle });
      }
    } else console.error("Could not find Credentials in localStorage");
  };

  connectSpotify();

  return (
    <div className="grid grid-rows-[2fr_5fr] p-5 h-[100vh]">
      <ToastContainer
        position="top-right"
        theme="dark"
        pauseOnHover
        pauseOnFocusLoss
      />
      <SearchBar />
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
