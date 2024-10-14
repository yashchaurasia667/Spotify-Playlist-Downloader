import { useEffect, useState } from "react";
import DownloadTile from "./DownloadTile.js";

import io from "socket.io-client";

const socket = io("api", {
  transports: ["websocket", "polling"],
});

const Downloads = () => {
  const [completion, setCompletion] = useState({
    complete: 0,
    incomplete: 10,
  });

  console.log(completion);

  useEffect(() => {
    socket.on("progress", (data) => {
      setCompletion({
        complete: data.completion,
        incomplete: 10 - data.completion,
      });
      console.log(data);
    });
    return () => {
      socket.off("progress");
    };
  }, [completion]);

  const startDownload = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/sockets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  };

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
        <div className="bg-[#232323] h-[100px] mt-8 px-[50px] py-[40px] rounded-[10px]">
          <div
            className={`grid grid-cols-[${completion.complete}px_${completion.incomplete}fr] items-center rounded-full overflow-hidden`}
          >
            <div className="complete h-[10px] bg-purple-500"></div>
            <div className="remaining h-[10px] bg-[#acacac]"></div>
          </div>
          <button onClick={startDownload}>start</button>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
