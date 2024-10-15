import React, { useState, ReactNode } from "react";
import GlobalContext from "./GlobalContext";

import { Song } from "../../types";
import DownloadTile from "../../components/DownloadTile";

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

  const createDownload = (cover: string, name: string, path: string) => {
    <DownloadTile title={name} downloadPath={path} coverPath={cover} />;
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
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
