/* eslint-disable react/prop-types */
import { useState } from "react";

const UpdatePassword = ({ mes, err, setErr, setMes, handleUpdate }) => {
  // Getting new password
  const [userData, setUserData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  // Reset Message and Error
  function reset() {
    setErr("");
    setMes("");
  }

  // Updatimg user Input
  function handleChange(e) {
    reset();
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="flex flex-col gap-3 m-auto justify-center items-center px-3 sm:px-5 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] pt-3 pb-5 bg-slate-200 max-w-sm">
      <div className="text-lg font-semibold md:text-xl">{`Forgot Password`}</div>

      {/* New Password */}
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="relative flex flex-col sm:w-72 w-60">
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={userData.newPassword}
            onChange={(e) => handleChange(e)}
            className="relative w-full px-2 pt-4 pb-2 text-sm text-black bg-white border-0 rounded shadow outline-none focus:outline-none focus:ring peer placeholder-shown:py-2 focus:pt-4 focus:pb-2 focus:placeholder:opacity-0"
          />

          <span className="absolute peer-placeholder-shown:top-[7px] left-2  peer-focus:top-[1px] text-[12px] peer-placeholder-shown:hidden z-10 peer-placeholder-shown:z-0 peer-focus:block text-slate-500 ">
            New Password
          </span>
        </div>

        {/* Confirm New password */}
        <div className="relative flex flex-col sm:w-72 w-60">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmNewPassword"
            value={userData.confirmNewPassword}
            onChange={(e) => handleChange(e)}
            className="relative w-full px-2 pt-4 pb-2 text-sm text-black bg-white border-0 rounded shadow outline-none focus:outline-none focus:ring peer placeholder-shown:py-2 focus:pt-4 focus:pb-2 focus:placeholder:opacity-0"
          />

          <span className="absolute peer-placeholder-shown:top-[7px] left-2  peer-focus:top-[1px] text-[12px] peer-placeholder-shown:hidden z-10 peer-placeholder-shown:z-0 peer-focus:block text-slate-500 ">
            Confirm Password
          </span>
        </div>

        {/* Showing Message and Error  */}
        <div className="flex flex-col items-center justify-center gap-2">
          {mes ? (
            <div className="text-xs font-medium text-green-500">{mes}</div>
          ) : err ? (
            <div className="text-xs font-medium text-red-500">{err}</div>
          ) : (
            ""
          )}

          {/* Update button */}
          <button
            onClick={() => {
              reset();
              setMes("Updating Password ...");
              handleUpdate(userData);
            }}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;