import React, { useEffect } from "react";
import { toast } from "react-toastify";

import SearchBar from "../components/SearchBar";
import SongBlock from "../components/SongBlock";

import "react-toastify/dist/ReactToastify.css";

const Search: React.FC = () => {
  useEffect(() => {
    const toastStyle = {
      backgroundColor: "#232323",
    };

    const connectSpotify = async () => {
      const creds = localStorage.getItem("credentials");
      if (creds) {
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
            toast.success("Connected to Spotify", {
              style: toastStyle,
            });
          } else throw new Error("403");
        } catch (error) {
          toast.error("Couldn't connect to Spotify", { style: toastStyle });
        }
      } else console.error("Could not find Credentials in localStorage");
    };

    connectSpotify();
  }, []);

  return (
    <div className="grid grid-rows-[3fr_5fr] p-5 h-[100vh]">
      <SearchBar />
      <SongBlock />
    </div>
  );
};

export default Search;
