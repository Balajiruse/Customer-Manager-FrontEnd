/* eslint-disable react/prop-types */

import { useState } from "react";

const CreateNotify = ({ setShowAdd, handleNotify }) => {
  // Notification data
  const [notData, setNotData] = useState({
    notificationName: "",
    message: "",
  });

  //  check for empty field
  function checkData(uD) {
    for (let i in uD) {
      if (!uD[i]) {
        alert("Fields are required");
        return true;
      }
    }
  }

  //  Updating user Input
  function handleChange(e) {
    setNotData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Creating new Notification
  function handleClick() {
    let chk = checkData(notData);
    if (chk) return;
    handleNotify(notData);
  }

  return (
    <div className="flex flex-col w-full gap-5 px-3 mx-auto xl:w-2/6 lg:w-3/6 md:w-3/6 sm:w-4/6 xs:w-5/6 xs:max-w-[400px] sm:max-w-none">
      <h1 className="font-bold text-center font-xs">Create a Notification</h1>

      {/* Notification name */}
      <input
        type="text"
        placeholder="Notification Name"
        name="notificationName"
        value={notData.notificationName}
        onChange={(e) => handleChange(e)}
        className="px-3 py-1 rounded shadow-[inset_0px_1px_3px_0.5px_rgba(0,0,0,0.6)] outline-none"
      />

      {/* Notification Message */}
      <textarea
        type="text"
        placeholder="Notification Message"
        name="message"
        value={notData.message}
        onChange={(e) => handleChange(e)}
        className="px-3 py-1 rounded shadow-[inset_0px_1px_3px_0.5px_rgba(0,0,0,0.6)] outline-none"
      ></textarea>

      <div className="flex flex-row items-center justify-center gap-5">
        <button
          onClick={() => {
            setShowAdd(false);
          }}
          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Cancel
        </button>

        <button
          onClick={handleClick}
          className="px-3 py-1 text-white bg-green-400 rounded hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CreateNotify;