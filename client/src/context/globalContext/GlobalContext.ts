import React from "react";

import { Song, playlist, downloads } from "../../types";

interface GlobalContextType {
  query: string;
  setQuery: (query: string) => void;
  qtype: "Playlist" | "Name";
  setQtype: (qtype: "Playlist" | "Name") => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  songs: Song[];
  setSongs: (songs: Song[]) => void;
  playlist: playlist | undefined;
  setPlaylist: (playlist: playlist | undefined) => void;
  // downloads: downloads[];
  // setDownloads: (download: downloads[]) => void;
  setDownloadPath: (e: React.FormEvent | undefined) => Promise<string>;
  downloading: downloads[];
  setDownloading: (download: downloads[]) => void;
  createDownload: (cover: string, name: string, complete: boolean) => void;
}

const GlobalContext = React.createContext(
  <GlobalContextType | undefined>undefined
);
export default GlobalContext;
