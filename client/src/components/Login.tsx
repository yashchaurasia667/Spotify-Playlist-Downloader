import { useState } from "react";

const Login = () => {
  const inputClass =
    "mb-2 mx-auto bg-[#242424] w-[100%] px-8 py-3 rounded-full outline-none border-2 border-[#acacac] hover:border-white focus:border-white focus:border-[3px] transition-all";
  const buttonClass =
    "mt-2 mx-auto bg-purple-400 text-[#121212] font-bold w-[100%] px-8 py-3 rounded-full transition-all hover:scale-105 hover:bg-purple-300";

  const [id, setId] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  // const [remember, setRemember] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      localStorage.setItem("credentials", JSON.stringify({ id, secret }));
      console.log("Credentials set");
    } catch (error) {
      console.error(`Something went wrong while logging in: ${error}`);
    }
  };

  return (
    <div className="w-[100%] flex flex-col justify-center">
      <p className="font-bold text-3xl mx-auto mb-10">Log In</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto w-[90%] md:w-[40%] xl:w-[25%]"
      >
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
        {/* <div
          className={`mt-2 ${
            remember ? "bg-purple-400" : "bg-[#acacac]"
          }  h-[35px] w-[60px] px-7 py-3 rounded-full outline-none border-[#242424] border-2 relative transition-all duration-150`}
          onClick={() => setRemember((prev) => !prev)}
        >
          <div
            className={`absolute top-1/2 -translate-y-1/2 toggle h-[25px] w-[25px] bg-[#242424] rounded-full transition-all ${
              remember ? "translate-x-0" : "-translate-x-full"
            }`}
          ></div>
        </div> */}
        <button type="submit" className={buttonClass}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
