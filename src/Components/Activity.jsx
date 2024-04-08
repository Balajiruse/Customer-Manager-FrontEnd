
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { API } from "../Helpers/Api";

/* eslint-disable react/prop-types */
const Activity = ({ role }) => {
  // All activity data
  const [acti, setActi] = useState([]);
  // Initial Loading state
  const [isLoading, setIsLoading] = useState(true);

  // API URL Get Activity Data
  const URL = `${API}/${role}/check`;
  useEffect(() => {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionToken: localStorage.getItem("CRMSes") }),
    })
      .then((val) => val.json())
      .then((val) => {
        if (val.acknowledged) {
          setActi([...val.user.activity]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // Initial Loading Screen
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-3 py-5 sm:gap-6 max-h-[100vh] overflow-y-auto scrollbar-hide">
      {acti.length < 1 ? (
        <div className="px-2 py-1 rounded-md bg-slate-100">
          No Activity found
        </div>
      ) : (
        acti.map((val, idx) => (
          <div key={idx} className="px-5 py-2 rounded-md bg-slate-100">
            <p className="font-semibold">Logged On</p>
            {
              new Date(Number(val))
                .toISOString()
                .replace("T", " ")
                .split(".")[0]
            }
          </div>
        ))
      )}
    </div>
  );
};

export default Activity;
