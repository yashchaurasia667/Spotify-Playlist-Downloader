import { useContext, useEffect } from "react";

import DownloadTile from "./DownloadTile";

import DownloadsContext from "../context/downloadsContext/DownloadsContext.ts";

const Downloads = () => {
  const downloadContext = useContext(DownloadsContext);

  if (!downloadContext) throw new Error("No Download Context");

  const { downloading, setDownloadPath, downloads, initDownloads } =
    downloadContext;
  useEffect(() => {
    initDownloads();
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
      <div className="mt-20 flex flex-col gap-y-4">
        {downloading.map((title, index) => (
          <DownloadTile key={index} {...title} />
        ))}
        {downloads.map((tile, index) => (
          <DownloadTile key={index} {...tile} />
        ))}
      </div>
    </div>
  );
};

export default Downloads;
