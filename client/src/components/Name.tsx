const Name = () => {
  const nameClass =
    "mx-auto bg-[#242424] w-[90%] md:w-[40%] xl:w-[25%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all";
  return (
    <div className="flex p-5 mt-32">
      <input type="text" name="name" placeholder="Song name" className={nameClass} />
    </div>
  );
};

export default Name;
