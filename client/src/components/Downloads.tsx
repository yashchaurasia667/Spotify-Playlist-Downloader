import React, { useContext } from "react";

import GlobalContext from "../context/globalContext/GlobalContext";

const Downloads = () => {
  const context = useContext(GlobalContext);

  if (!context) return;

  const { downloads } = context;

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
        {/* <DownloadTile
          title="Test Tile"
          coverPath="/vite.svg"
          downloadPath="C:/Users/yashc/Downloads"
          complete={true}
        /> */}
        {
          downloads.map((tile, index)=>  )
        }
      </div>
    </div>
  );
};

export default Downloads;
