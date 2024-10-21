import React from "react";

import { downloads } from "../../types";

interface DownloadsContext {
  downloads: downloads[];
  setDownloads: (download: downloads[]) => void;
  downloading: downloads[];
  setDownloading: (download: downloads[]) => void;
  initDownloads: () => void;
  setDownloadPath: (e: React.FormEvent | undefined) => Promise<string>;
  createDownload: (
    cover: string,
    name: string,
    id: string,
    complete: boolean
  ) => void;
}

const DownloadsContext = React.createContext(
  <DownloadsContext | undefined>undefined
);
export default DownloadsContext;
