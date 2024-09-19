const Playlist = () => {
  return (
    <div className="p-5 flex flex-col justify-center gap-y-6 mt-32">
      <form
        method="post"
        className="flex lg:flex-row flex-col justify-center items-center gap-x-3"
      >
        <input
          type="text"
          name="link"
          className="bg-[#242424] w-[90%] md:w-[70%] lg:w-[40%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all"
          placeholder="Link to spotify playlist"
        />
        <button
          type="submit"
          className="font-semibold bg-purple-400 text-[#121212] rounded-full px-10 py-4 hover:scale-105 hover:bg-purple-300 transition-all"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Playlist;
