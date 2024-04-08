/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { API } from "../Helpers/Api";
import CreateNotify from "./CreateNotify";

const Notification = ({ role }) => {
  // Show or Hide Create notification state
  const [showAdd, setShowAdd] = useState(false);
  // All Notification Data
  const [notify, setNotify] = useState([]);
  // Initial loading state
  const [isLoading, setIsLoading] = useState(true);

  // Delete the notification from user database by user
  function handleDelete(id) {
    alert("it will take few seconds Deleting notification ...");

    // Update user Notification field
    const updated = notify.filter((val) => {
      if (val.data._id === id) {
        return false;
      }
      return true;
    });
    setNotify(updated);

    // API URL Delte notification from user database
    const URLGet = `${API}/user/notify/usernotifydelete`;
    fetch(URLGet, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionToken: localStorage.getItem("CRMSes"),
        notifyId: id,
      }),
    })
      .then((val) => val.json())
      .then((val) => {
        if (val.acknowledged) {
          alert("Notification Deleted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Create new notification only for Manager and Admin
  function handleNotify(notData) {
    // API URL Create Notification
    const URLCreate = `${API}/${role}/notify/createnotify`;
    fetch(URLCreate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...notData,
        sessionToken: localStorage.getItem("CRMSes"),
      }),
    })
      .then((val) => val.json())
      .then((val) => {
        if (val.acknowledged) {
          setNotify((prev) => [...prev, val.data]);
          alert("Notification Sent Successfully");
          setShowAdd(false);
        } else {
          alert(val.error);
        }
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }

  // get all the notification from user Database
  useEffect(() => {
    if (role !== "user") {
      // API URL Get All notification
      const URLGet = `${API}/${role}/notify/allnotify`;
      fetch(URLGet, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionToken: localStorage.getItem("CRMSes"),
        }),
      })
        .then((val) => val.json())
        .then((val) => {
          if (val.acknowledged) {
            setNotify([...val.notifications]);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else if (role === "user") {
      // API URL Get All User notification
      const URLGet = `${API}/${role}/notify/usernotify`;
      fetch(URLGet, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionToken: localStorage.getItem("CRMSes"),
        }),
      })
        .then((val) => val.json())
        .then((val) => {
          if (val.acknowledged) {
            setNotify([...val.notifications]);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-3 p-5 sm:gap-6 max-h-[100vh] overflow-y-auto scrollbar-hide">
      {/* Create new notification only for Manager and Admin */}
      <div className={`w-full ${role === "user" ? "hidden" : ""}`}>
        {showAdd ? (
          <div className="w-full">
            <CreateNotify
              handleNotify={handleNotify}
              showAdd={showAdd}
              setShowAdd={setShowAdd}
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-row justify-center px-8">
          {showAdd ? (
            ""
          ) : (
            <button
              onClick={() => {
                setShowAdd(true);
              }}
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Create Notification
            </button>
          )}
        </div>
      </div>

      {/* Show All Notification */}
      <div className="w-full">
        {notify.length < 1 ? (
          <div className="font-semibold">No Notification found</div>
        ) : (
          <div className="mx-5 space-y-2">
            {notify.reverse().map((val, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 p-5 text-white bg-teal-700 rounded-lg group"
                tabIndex="1"
              >
                <div className="flex items-center justify-between cursor-pointer">
                  <span>
                    {" "}
                    {role !== "user"
                      ? val.notificationName
                      : val.data.notificationName}{" "}
                  </span>
                  <div className="flex flex-row gap-12 flex-nowrap">
                    <div
                      onClick={() => handleDelete(val.data._id)}
                      className={`w-3 h-2 transition-all duration-500 group-focus:translate-y-[-5px] ${
                        role !== "user" ? "hidden" : ""
                      } `}
                    >
                      <MdDelete />
                    </div>
                    <div className="w-3 h-2 transition-all duration-500 group-focus:-rotate-180">
                      <IoIosArrowDown />
                    </div>
                  </div>
                </div>
                <div className="items-center invisible h-auto transition-all opacity-0 max-h-0 group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
                  <p>{role !== "user" ? val.message : val.data.message}</p>
                  <p>
                    {role !== "user"
                      ? new Date(val.createdAt)
                          .toISOString()
                          .replace("T", " ")
                          .split(".")[0]
                      : new Date(val.data.createdAt)
                          .toISOString()
                          .replace("T", " ")
                          .split(".")[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;