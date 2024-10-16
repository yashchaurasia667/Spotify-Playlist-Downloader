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
  const [playlist, setPlaylist] = useState<playlist>({
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

  const createDownload = (
    cover: string,
    name: string,
    path: string,
    complete: boolean
  ) => {
    const newDownload = {
      title: name,
      downloadPath: path,
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
    createDownload,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
