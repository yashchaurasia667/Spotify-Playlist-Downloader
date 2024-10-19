import { useContext, useEffect } from "react";

import { toast } from "react-toastify";
import { io } from "socket.io-client";

import { Song } from "../types";

import GlobalContext from "../context/globalContext/GlobalContext";

const SongTile = ({ index, images, name, artists, album, duration }: Song) => {
  const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"],
  });

  const context = useContext(GlobalContext);
  if (!context) throw new Error("No Global context");

  const { setDownloadPath, createDownload } = context;

  const fromMilliseconds = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = ((ms % 60000) / 1000).toFixed(0);
    return `${min}:${sec.padStart(2, "0")}`;
  };

  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let path = localStorage.getItem("downloadPath");
    if (!path) path = await setDownloadPath(undefined);
    console.log(`Download Path: ${path}`);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song: { name, artists, images },
          path,
          qtype: "name",
        }),
      });

      const data = await res.json();

      if (data.success) toast.success("Download complete");
      else {
        if (data?.status == 409) toast.error("Song already exists");
        else toast.error("Something went wrong...");
      }
    } catch (error) {
      console.error(`Something went wrong while downloading the song ${error}`);
    }
  };

  useEffect(() => {
    socket.on("start", (data) => {
      console.log("data", data.artist);
      console.log("images", images);
      if (data.title == name && data.artist == artists) {
        console.log("download started ", data);
        createDownload(images, name, false);
      }
    });

    return () => {
      socket.off("start");
    };
  }, [artists, images, name, socket, createDownload]);

  return (
    <div className="overflow-hidden font-semibold w-[100%] h-[80px] grid grid-cols-[3fr_2fr_1fr_1fr] gap-x-8 items-center rounded-lg bg-[#242424] mt-3 px-6 py-4">
      <div className="flex items-center gap-x-4 max-h-[80px] overflow-hidden group1">
        <div>{index}</div>
        <img
          src={images}
          width={50}
          className="rounded-[10px]"
          alt={`${name} cover`}
        />
        <div className="min-w-0">
          <p className="text-purple-500 whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </p>
          <p className="underline truncate">{artists}</p>
        </div>
      </div>
      <div className="album truncate">{album}</div>
      <div>{fromMilliseconds(duration)}</div>
      <button
        className="text-[#121212] bg-purple-500 hover:bg-purple-400 hover:scale-105 rounded-full px-4 py-2 transition-all"
        onClick={(e) => handleDownload(e)}
      >
        Download
      </button>
    </div>
  );
};

export default SongTile;
