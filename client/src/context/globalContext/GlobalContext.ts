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
  playlist: { cover: string; name: string; link: string } | undefined;
  setPlaylist: (
    playlist:
      | {
          cover: string;
          name: string;
          link: string;
        }
      | undefined
  ) => void;
  downloads: {
    title: string;
    downloadPath: string;
    coverPath: string;
    complete: boolean;
  }[];
  setDownloadPath: (e: React.FormEvent | undefined) => Promise<string>;
  createDownload: (cover: string, name: string, complete: boolean) => void;
}

const GlobalContext = React.createContext(
  <GlobalContextType | undefined>undefined
);
export default GlobalContext;
