import { useState } from "react";
// import { IoHandLeft } from "react-icons/io5";

const Login = () => {
  const inputClass =
    "mb-2 mx-auto bg-[#242424] w-[90%] md:w-[40%] xl:w-[25%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all";
  const buttonClass =
    "mt-2 mx-auto bg-purple-400 text-[#121212] font-semibold w-[90%] md:w-[40%] xl:w-[25%] px-8 py-3 rounded-full transition-all hover:scale-105 hover:bg-purple-300";

  const [id, setId] = useState("");
  const [secret, setSecret] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, secret }),
      });

      const data = await res.json();
      // if (data.success) {
      // }
    } catch (error) {
      throw new Error(`Something went wrong... ${error}`);
    }
  };

  return (
    <div className="w-[100%] flex flex-col justify-center">
      <p className="font-bold text-3xl mx-auto mb-10">Log In</p>
      <form className="flex flex-col w-[100%]">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="CLIENT ID"
          className={inputClass}
        />
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="CLIENT SECRET"
          className={inputClass}
        />
        <button className={buttonClass} onClick={(e) => handleSubmit(e)}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
