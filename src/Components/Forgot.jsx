import { useState } from "react";

/* eslint-disable react/prop-types */
const ForgotPassword = ({
  handleNavigate,
  err,
  mes,
  setMes,
  setErr,
  handleForgot,
}) => {
  // User data
  const [email, setEmail] = useState("");

  // Reset message and Errors
  function reset() {
    setErr("");
    setMes("");
  }

  return (
    <div className="flex flex-col gap-3 m-auto justify-center items-center px-3 sm:px-5 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] pt-3 pb-5 bg-slate-200 max-w-sm">
      <div className="text-lg font-semibold md:text-xl">Forgot Password</div>

      <div className="flex flex-col items-center justify-center gap-5">
        {/* Email Field */}
        <div className="relative flex flex-col sm:w-72 w-60">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              reset();
            }}
            className="relative w-full px-2 pt-4 pb-2 text-sm text-black bg-white border-0 rounded shadow outline-none focus:outline-none focus:ring peer placeholder-shown:py-2 focus:pt-4 focus:pb-2 focus:placeholder:opacity-0"
          />
          <span className="absolute peer-placeholder-shown:top-[7px] left-2  peer-focus:top-[1px] text-[12px] peer-placeholder-shown:hidden z-10 peer-placeholder-shown:z-0 peer-focus:block text-slate-500 ">
            Email
          </span>
        </div>

        {/* Show Message and Errors */}
        <div className="flex flex-col items-center justify-center gap-2">
          {mes ? (
            <div className="text-xs font-medium text-green-500">{mes}</div>
          ) : err ? (
            <div className="text-xs font-medium text-red-500">{err}</div>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              reset();
              setMes("Checking Email ...");
              handleForgot(email);
            }}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
          >
            Send
          </button>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center w-full text-center">
        <div className="flex-grow h-px bg-gray-400"></div>
        <div className="mx-2 text-sm">OR</div>
        <div className="flex-grow h-px bg-gray-400"></div>
      </div>

      <p className="text-sm">
        Want to Login
        <button
          onClick={handleNavigate}
          className="ml-1 font-semibold text-sky-600"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default ForgotPassword;