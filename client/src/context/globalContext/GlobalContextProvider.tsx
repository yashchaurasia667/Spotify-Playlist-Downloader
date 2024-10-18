import React, { useState, ReactNode } from "react";
import GlobalContext from "./GlobalContext";

import { Song } from "../../types";

interface GlobalContextProviderProps {
  children: ReactNode;
}

interface playlist {
  cover: string;
  name: string;
  link: string;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>("");
  const [qtype, setQtype] = useState<"Playlist" | "Name">("Name");
  const [loading, setLoading] = useState<boolean>(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState<playlist | undefined>({
    cover: "",
    name: "",
    link: "",
  });

  const [downloads, setDownloads] = useState<
    {
      title: string;
      downloadPath: string;
      coverPath: string;
      complete: boolean;
    }[]
  >([]);

  const setDownloadPath = async (e: React.FormEvent | undefined) => {
    if (e) e.preventDefault();
    try {
      const res = await window.api.openDownloadDialog();
      if (res && !res?.canceled) {
        const path = res.filePaths[0];
        localStorage.setItem("downloadPath", path);
        console.log(`Download path set to: ${path}`);
        return path;
      } else console.log("Operation canceled");
    } catch (error) {
      console.error(`Something went wrong opening file dialog: ${error}`);
    }
    return "";
  };

  const createDownload = (cover: string, name: string, complete: boolean) => {
    let path = localStorage.getItem("downloadPath");
    if (!path) setDownloadPath(undefined);
    path = localStorage.getItem("downloadPath");
    const newDownload = {
      title: name,
      downloadPath: path || "c:/",
      coverPath: cover,
      complete: complete,
    };
    setDownloads((prevDownloads) => [...prevDownloads, newDownload]);
  };

  const value = {
    query,
    setQuery,
    qtype,
    setQtype,
    loading,
    setLoading,
    songs,
    setSongs,
    playlist,
    setPlaylist,
    downloads,
    setDownloadPath,
    createDownload,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
