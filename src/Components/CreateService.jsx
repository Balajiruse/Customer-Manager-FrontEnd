/* eslint-disable react/prop-types */
import { useState } from "react";

const CreateService = ({ handleService, setShowAdd }) => {
  // Service State
  const [serviceName, setServiceName] = useState("");

  return (
    <div className="flex flex-col w-full gap-5 px-3 mx-auto xl:w-2/6 lg:w-3/6 md:w-3/6 sm:w-4/6 xs:w-5/6 xs:max-w-[400px] sm:max-w-none">
      <h1 className="font-bold text-center font-xs">Create a Service</h1>

      {/* Service Name Field */}
      <input
        type="text"
        placeholder="Service Name"
        name="serviceName"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        className="px-3 py-1 rounded shadow-[inset_0px_1px_3px_0.5px_rgba(0,0,0,0.6)]  outline-none"
      />

      <div className="flex flex-row items-center justify-center gap-5">
        <button
          onClick={() => {
            setShowAdd(false);
          }}
          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 relative top-[-2px]"
        >
          Cancel
        </button>

        <button
          onClick={() => handleService(serviceName)}
          className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700 relative top-[-2px]"
        >
          Add Service
        </button>
      </div>
    </div>
  );
};

export default CreateService;