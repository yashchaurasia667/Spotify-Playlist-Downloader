import React from "react";

import { Song } from "../../types";

interface GlobalContextType {
  query: string;
  setQuery: (query: string) => void;
  qtype: "Playlist" | "Name";
  setQtype: (qtype: "Playlist" | "Name") => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  songs: Song[];
  setSongs: (songs: Song[]) => void;
  playlist: { cover: string; name: string; link: string };
  setPlaylist: (playlist: {
    cover: string;
    name: string;
    link: string;
  }) => void;
}

const GlobalContext = React.createContext(
  <GlobalContextType | undefined>undefined
);
export default GlobalContext;
