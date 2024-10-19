import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { FaFolder } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

interface props {
  title: string;
  downloadPath: string;
  coverPath: string;
  complete: boolean;
}

interface style {
  display: "grid";
  gridTemplateColumns: string;
}

const DownloadTile = ({ title, downloadPath, coverPath, complete }: props) => {
  const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"],
  });

  const [downloadComplete, setDownloadComplete] = useState<boolean>(complete);
  const [progress, setProgress] = useState<style>({
    display: "grid",
    gridTemplateColumns: `0fr 10fr`,
  });

  const openPath = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = window.api.openPath(downloadPath);
      console.log(res);
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     socket.off("progress");
  //   };
  // }, []);

  useEffect(() => {
    socket.on("progress", (data) => {
      console.log(data);
      setProgress({
        display: "grid",
        gridTemplateColumns: `${data.progress}fr ${10 - data.progress}fr`,
      });
      if (data.progress == 10) setDownloadComplete(true);
    });

    socket.on("complete", () => {
      console.log("Download complete");
      setDownloadComplete(true);
    });

    return () => {
      socket.off("progress");
      socket.off("complete");
    };
  }, []);

  return (
    <div className="h-[100px] rounded-lg bg-[#242424] px-6 py-4 grid grid-cols-[9fr_1fr] items-center">
      <div className="flex gap-x-8">
        <img src={coverPath} width={60} alt="cover" className="rounded-lg" />
        <div className="flex-grow">
          <p className="text-lg font-semibold">{title}</p>
          {downloadComplete ? (
            ""
          ) : (
            <div
              style={progress}
              className="w-[90%] rounded-full overflow-hidden mt-2"
            >
              <div className="bg-purple-500 h-[5px]"></div>
              <div className="bg-[#acacac] h-[5px]"></div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-x-6">
        <button
          disabled={!downloadComplete}
          className={downloadComplete ? "" : "cursor-not-allowed opacity-50"}
          onClick={(e) => openPath(e)}
        >
          <FaFolder size={25} className="text-purple-300" />
        </button>
        <button>
          <RxCross2 size={25} className="text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default DownloadTile;
