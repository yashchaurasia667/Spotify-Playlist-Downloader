import React, { useState, ReactNode } from "react";
import GlobalContext from "./GlobalContext";

import { Song } from "../../types";

interface GlobalContextProviderProps {
  children: ReactNode;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>("");
  const [qtype, setQtype] = useState<"Playlist" | "Name">("Name");
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState({
    cover: "",
    name: "",
  });
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
