import React, { useEffect, useState } from "react";
import DownloadTile from "./DownloadTile.js";
import { io } from "socket.io-client";

const Downloads = () => {
  const [completion, setCompletion] = useState(0);

  const [progress, setProgress] = useState({
    display: "grid",
    gridTemplateColumns: `${completion}fr ${10 - completion}fr`,
  });

  const setDownloadPath = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await window.api.openDownloadDialog();
      if (res && !res?.canceled) {
        localStorage.setItem("downloadPath", res.filePaths[0]);
        console.log(`Download path set to: ${res.filePaths[0]}`);
      } else console.log("Operation canceled");
    } catch (error) {
      console.error(`Something went wrong opening file dialog: ${error}`);
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      socket.emit("data", { data: "connected" });
    });

    socket.on("data", (data) => {
      console.log(data);
      setCompletion(data.progress);
      setProgress({
        ...progress,
        gridTemplateColumns: `${data.progress}fr ${10 - data.progress}fr`,
      });
    });

    return () => {
      socket.off("data");
    };
  }, []);

  return (
    <div className="px-4 py-10">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl mb-4 text-purple-500">Downloads</h1>
        <button
          className="mr-5 text-[#242424] font-semibold bg-purple-400 rounded-full px-4 py-2 hover:bg-purple-300 hover:scale-105 transition-all"
          onClick={(e) => setDownloadPath(e)}
        >
          Set Download Path
        </button>
      </div>
      <div className="mt-20">
        <DownloadTile title="Test Tile" coverPath="/vite.svg" />
        <div className="bg-gray-800 h-[100px] mt-8 px-12 rounded-[5px] py-10">
          <div style={progress} className="rounded-full overflow-hidden">
            <div className="bg-purple-500 h-[10px]"></div>
            <div className="bg-[#acacac] h-[10px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
