import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const Login = ({
  name,
  handleNavigate,
  handleLogin,
  setMes,
  setErr,
  mes,
  resend,
  setResend,
  handleResend,
  err,
  role,
}) => {
  // User Data
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // For Redirection links
  const RoleWise = ["user", "manager", "admin"];

  // Reset message and Errors
  function reset() {
    setMes("");
    setErr("");
    setResend(false);
  }

  // Check for empty field
  function checkData(uD) {
    for (let i in uD) {
      if (!uD[i]) {
        setErr("Fields are required");
        return true;
      }
    }
  }

  // Update user Input
  function handleChange(e) {
    reset();
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Login Function
  function handleClick() {
    reset();
    let chk = checkData(userData);
    if (chk) return;
    setMes("Logging In ...");
    handleLogin(userData);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 m-5 p-5 ">
    <div>
      <img
        src="https://sm-s.in/assets/images/user/login.gif"
        alt="Login"
        className="h-full"
      />
    </div>
    <div className="flex flex-col gap-3 m-auto justify-center items-center px-3 sm:px-5 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] pt-3 pb-5 bg-slate-200 max-w-[320px]">
      <div className="text-lg font-bold text-blue-700 capitalize md:text-xl">{`${name} Login`}</div>
      <div className="flex flex-col items-center justify-center gap-5">
        {/* Email Field */}
        <div className="relative flex flex-col sm:w-72 w-60">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={(e) => handleChange(e)}
            className="relative w-full px-2 pt-4 pb-2 text-sm text-black bg-white border-0 rounded shadow outline-none focus:outline-none focus:ring peer placeholder-shown:py-2 focus:pt-4 focus:pb-2 focus:placeholder:opacity-0"
          />
          <span className="absolute peer-placeholder-shown:top-[7px] left-2  peer-focus:top-[1px] text-[12px] peer-placeholder-shown:hidden z-10 peer-placeholder-shown:z-0 peer-focus:block text-slate-500 ">
            Email
          </span>
        </div>

        {/* Password Field */}
        <div className="relative flex flex-col sm:w-72 w-60">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={(e) => handleChange(e)}
            className="relative w-full px-2 pt-4 pb-2 text-sm text-black bg-white border-0 rounded shadow outline-none focus:outline-none focus:ring peer placeholder-shown:py-2 focus:pt-4 focus:pb-2 focus:placeholder:opacity-0"
          />
          <span className="absolute peer-placeholder-shown:top-[7px] left-2  peer-focus:top-[1px] text-[12px] peer-placeholder-shown:hidden z-10 peer-placeholder-shown:z-0 peer-focus:block text-slate-500 ">
            Password
          </span>
        </div>
        {/* Show messages and Errors */}
        <div className="flex flex-col items-center justify-center gap-2">
          {mes ? (
            <div className="text-xs font-medium text-black-500">{mes}</div>
          ) : resend ? (
            <div className="text-xs font-medium text-center text-red-500">
              <p>
                Account is not verified check your Email or
                <button
                  onClick={() => handleResend(userData)}
                  className="text-xs font-medium text-blue-600 underline "
                >
                  Resend Mail
                </button>
              </p>
            </div>
          ) : err ? (
            <div className="text-xs font-medium text-black-500">{err}</div>
          ) : (
            ""
          )}

          <button
            onClick={handleClick}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
          >
            Login
          </button>
        </div>
      </div>

      <button
        onClick={() => {
          if (name === "user") {
            navigate("/forgot");
          } else {
            navigate(`/${name}/forgot`);
          }
        }}
        className="text-xs"
      >
        Forgot Password?
      </button>
      <div className="flex flex-row items-center justify-center w-full text-center">
        <div className="flex-grow h-px bg-gray-400"></div>
        <div className="mx-2 text-sm">OR</div>
        <div className="flex-grow h-px bg-gray-400"></div>
      </div>
      <p className="text-sm">
        Don&apos;t have an account?
        <button
          onClick={handleNavigate}
          className="ml-1 font-semibold text-sky-600"
        >
          Sign up
        </button>
      </p>

      {/* Navigate to Other Roles Login Pages */}
      <div className="flex flex-row justify-around w-full flex-nowrap">
        {RoleWise.filter((data) => {
          return role !== data;
        }).map((val, idx) => (
          <p
            onClick={() => {
              navigate(`/${val}`);
            }}
            key={idx}
            className="text-sm font-semibold capitalize cursor-pointer text-sky-600 hover:scale-110"
          >
            {val} <span>Login</span>
          </p>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default Login;