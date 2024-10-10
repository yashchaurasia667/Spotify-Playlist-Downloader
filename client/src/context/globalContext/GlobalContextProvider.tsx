import { useContext } from "react";
import GlobalContext from "./GlobalContext";

const GlobalContextProvider = () => {
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
