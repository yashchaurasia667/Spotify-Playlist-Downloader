const Reset = () => {
  const initialize = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, secret }),
      });
    } catch (error) {
      throw new Error(`Something went wrong... ${error}`)
    }
  };
  const resetClass =
    "mx-auto bg-[#242424] w-[90%] md:w-[40%] xl:w-[25%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all";
  return (
    <form method="post">
      <div className="flex flex-col gap-y-5 mb-5 mt-28">
        <input
          type="text"
          placeholder="CLIENT ID"
          name="id"
          className={resetClass}
        />
        <input
          type="text"
          placeholder="CLIENT SECRET"
          name="secret"
          className={resetClass}
        />
        <button
          type="submit"
          className="mx-auto bg-purple-400 text-[#121212] font-semibold w-[90%] md:w-[40%] xl:w-[25%] px-8 py-3 rounded-full transition-all hover:scale-105"
          onClick={initialize}
        >
          Set Account
        </button>
      </div>
    </form>
  );
};

export default Reset;
