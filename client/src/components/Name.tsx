import { useState } from "react";

const Name = () => {
  const nameClass =
    "bg-[#242424] w-[90%] md:w-[60%] xl:w-[40%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all";
  const [name, setName] = useState("");
  return (
    <div className="p-5 flex flex-col justify-center gap-y-6 mt-32">
      <form
        method="post"
        className="flex lg:flex-row lg:w-auto w-[100%] flex-col justify-center items-center gap-x-3 gap-y-6"
      >
        <input
          type="text"
          name="link"
          className={nameClass}
          placeholder="Song name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="font-semibold w-[90%] md:w-[30%] lg:w-auto bg-purple-400 text-[#121212] rounded-full px-10 py-4 hover:scale-105 hover:bg-purple-300 transition-all"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Name;
