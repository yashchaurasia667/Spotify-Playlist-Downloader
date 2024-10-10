import { useContext } from "react";

const SearchBar = () => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query == "") return;

    setLoading(true);
    setSongs([]);
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, qtype }),
      });

      const data = await res.json();
      if (data.success) {
        if (qtype == "Playlist") {
          setPlaylist({
            cover: data.cover,
            name: data.name,
          });
        } else {
          setPlaylist((prev) => ({
            ...prev,
            name: "",
          }));
        }
        setSongs(data.songs);
      } else throw new Error("Check the playlist link");
    } catch (error) {
      console.error(`Error fetching songs: ${error}`);
    } finally {
      setLoading(false);
    }
  };
  return <div></div>;
};

export default SearchBar;
