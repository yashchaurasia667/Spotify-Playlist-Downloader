const Reset = () => {
  const resetClass =
    "mx-auto bg-[#242424] w-[90%] md:w-[40%] xl:w-[25%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all";
  return (
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
    </div>
  );
};

export default Reset;
