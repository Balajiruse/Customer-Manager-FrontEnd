/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CreateTicket from "./CreateTicket";
import { API } from "../Helpers/Api";

const Ticket = ({ role }) => {
  // Show or Hide Create Ticket Component
  const [showAdd, setShowAdd] = useState(false);
  // Show or Hide Resolve Ticket Component
  const [showRes, setShowres] = useState(false);
  // State for Ticket that is resolved
  const [resData, setResData] = useState({
    name: "",
    number: "",
    message: "",
    createdAt: "",
    role: "",
  });

  // Initial Loading Screen
  const [isLoading, setIsLoading] = useState(true);
  // All Tickets Data
  const [ticketData, setTicketData] = useState([]);

  // Message and Error Display
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");

  // API URL to get all Ticket on mounting
  const URLGet = `${API}/${role}/ticket/view`;
  // API URL Tiket Create only for User
  const URLCreate = `${API}/${role}/ticket/create`;
  // API URL Ticket Delete only for Admin
  const URLDel = `${API}/${role}/ticket/delete`;

  // Get all the Ticket at Mounting
  useEffect(() => {
    fetch(URLGet, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionToken: localStorage.getItem("CRMSes") }),
    })
      .then((val) => val.json())
      .then((val) => {
        if (val.acknowledged) {
          setTicketData([...val.tickets]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // Delete a Ticket for Admin only
  function handleDeleteTicket(ticketId) {
    fetch(URLDel, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionToken: localStorage.getItem("CRMSes"),
        ticketId: ticketId,
      }),
    })
      .then((val) => val.json())
      .then((val) => {
        if (val.acknowledged) {
          const updatedTicket = ticketData.filter((data) => {
            return data._id !== ticketId;
          });

          setTicketData(updatedTicket);
          alert(val.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Create a new Ticket User only
  function handleTicket(ticData) {
    fetch(URLCreate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionToken: localStorage.getItem("CRMSes"),
        ticData,
      }),
    })
      .then((val) => val.json())
      .then((val) => {
        if (val.acknowledged) {
          setErr("");
          setMes(val.message);
          setShowAdd(false);

          setTicketData((prev) => [...prev, val.data]);
        } else {
          setMes("");
          setErr(val.error);
        }
      })
      .catch((err) => {
        console.log(err);
        setMes("");
        setErr("Error Creating Ticket");
      });
  }

  // Initial loading screen
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col scrollbar-hide max-h-[100vh] overflow-y-auto items-center justify-start w-full h-full gap-3 p-5 sm:gap-6">
      {/* Show Create Ticket Component if the Role is User */}
      <div className={`w-full ${role != "user" ? "hidden" : ""}`}>
        {showAdd ? (
          <div className="w-full">
            <CreateTicket
              handleTicket={handleTicket}
              showAdd={showAdd}
              setShowAdd={setShowAdd}
              setMes={setMes}
              setErr={setErr}
              mes={mes}
              err={err}
            />
          </div>
        ) : (
          ""
        )}
        {/* Create Ticket Button */}
        <div className="flex flex-row justify-end px-8">
          {showAdd ? (
            ""
          ) : (
            <button
              onClick={() => {
                setShowAdd(true);
              }}
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Create Ticket
            </button>
          )}
        </div>
      </div>
      {/* ---------------------------------------------------------- */}
      <p className="w-full text-xl font-semibold text-start">Tickets</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] items-start justify-start w-full gap-8 py-4 sm:flex-row">
        {ticketData.length < 1 ? (
          <div className="font-semibold text-center">No Tickets Found</div>
        ) : (
          // Create Tickets Card
          ticketData.map((val) => (
            <div
              key={val._id}
              className="sm:min-w-[280px] min-w-270px max-w-[380px] flex flex-col items-start justify-between px-3 py-2 rounded-md  bg-slate-100 h-full"
            >
              <p>
                <span className="font-semibold">Ticket Number: </span>
                <span>{val.ticketNumber}</span>
              </p>
              <p>
                <span className="font-semibold">Name: </span>
                <span>{val.ticketName}</span>
              </p>
              <p>
                <span className="font-semibold">Message: </span>
                <span>{val.ticketMessage}</span>
              </p>
              <p>
                <span className="font-semibold">Created At: </span>
                <span>
                  {
                    new Date(val.createdAt)
                      .toISOString()
                      .replace("T", " ")
                      .split(".")[0]
                  }
                </span>
              </p>
              {/* Show Resolved by and time if the ticket is resolved */}
              {val.resolvedBy ? (
                <>
                  <p>
                    <span className="font-semibold">Resolve At: </span>
                    <span>
                      {
                        new Date(val.resolvedAt)
                          .toISOString()
                          .replace("T", " ")
                          .split(".")[0]
                      }
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Comment: </span>
                    <span>{val.resolveComment}</span>
                  </p>
                </>
              ) : (
                ""
              )}

              <div className="flex flex-row justify-around w-full gap-2">
                {/* Show resolving component only to Manager and Admin */}
                {role !== "user" ? (
                  // Show Clear button if it's already resolved
                  val.resolvedBy ? (
                    <button className="px-3 relative py-1 text-white bg-green-600 rounded hover:bg-green-700 active:top-[-2px]">
                      Cleared
                    </button>
                  ) : (
                    // Resove button
                    <button
                      onClick={() => {
                        setShowres(true);
                        setResData({
                          name: val.ticketName,
                          number: val.ticketNumber,
                          message: val.ticketMessage,
                          createdAt: val.createdAt,
                          _id: val._id,
                        });
                      }}
                      className={`px-3 relative py-1 text-white bg-red-600 rounded hover:bg-green-500 active:top-[-2px] $`}
                    >
                      Resolve
                    </button>
                  )
                ) : (
                  ""
                )}

                {/* Show Delete button only to Admin */}
                {role === "admin" ? (
                  <button
                    onClick={() => {
                      handleDeleteTicket(val._id);
                    }}
                    className={`px-3 relative py-1 text-white  rounded hover:bg-red-800 bg-red-800 active:top-[-2px]`}
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))
        )}

        {/* Show Resolve Ticket Component if the resolve button is clicked*/}
        {showRes ? (
          <Resolve
            setShowres={setShowres}
            resData={resData}
            role={role}
            ticketData={ticketData}
            setTicketData={setTicketData}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

//-----------------------------------------------------------
// Resolving the Ticket
const Resolve = function ({
  resData,
  setShowres,
  role,
  ticketData,
  setTicketData,
}) {
  const [comment, setComment] = useState("");
  // API URL Resolve Ticket
  const URL = `${API}/${role}/ticket/resolve`;

  // Resolve function
  function handlResolve() {
    if (!comment) {
      alert("Fields are required");
      return;
    }

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionToken: localStorage.getItem("CRMSes"),
        ticketId: resData._id,
        comment: comment,
      }),
    })
      .then((val) => val.json())
      .then((val) => {
        if (val.acknowledged) {
          alert(val.message);
          setShowres(false);

          // Update Tickets data
          const updated = ticketData.map((data) => {
            if (data._id === val.ticket._id) {
              return val.ticket;
            }
            return data;
          });

          setTicketData(updated);
        } else {
          alert(val.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="fixed top-0 flex items-center justify-center w-screen h-screen bg-black/25">
      <div className="min-w-[380px] flex flex-col px-4 py-3 bg-slate-300">
        <div>
          <p className="font-semibold ">Ticket Number</p>
          <p>{resData.number}</p>
        </div>
        <div>
          <p className="font-semibold ">Name</p>
          <p>{resData.name}</p>
        </div>
        <div>
          <p className="font-semibold ">Message</p>
          <p>{resData.message}</p>
        </div>
        <div>
          <p className="font-semibold ">CreatedAt</p>
          <p>{new Date(resData.createdAt).toISOString().split("T")[0]}</p>
        </div>

        <textarea
          type="text"
          placeholder="Ticket Message"
          name="ticketMessage"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="px-3 py-1 rounded shadow-[inset_0px_1px_3px_0.5px_rgba(0,0,0,0.6)] outline-none my-2"
        ></textarea>

        <div className="flex flex-row items-center justify-center gap-5">
          <button
            onClick={() => {
              setShowres(false);
            }}
            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Cancel
          </button>

          <button
            onClick={handlResolve}
            className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Resolve
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;