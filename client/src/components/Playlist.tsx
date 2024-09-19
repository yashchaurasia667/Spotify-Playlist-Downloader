import { useState } from "react";

const Playlist = () => {
  const [link, setLink] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link }),
      });
      const data = await res.json();
    } catch (error) {
      throw new Error(`Something weent wrong... ${error}`);
    }
  };
  return (
    <div className="p-5 flex flex-col justify-center gap-y-6 mt-32">
      <form
        method="post"
        className="flex lg:flex-row flex-col justify-center items-center gap-x-3 gap-y-6"
      >
        <input
          type="text"
          name="link"
          className="bg-[#242424] w-[90%] md:w-[70%] lg:w-[40%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all"
          placeholder="Link to spotify playlist"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          type="submit"
          className="font-semibold bg-purple-400 text-[#121212] rounded-full px-10 py-4 hover:scale-105 hover:bg-purple-300 transition-all"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Playlist;
