import { useState } from "react";
import NavBar from "../../Components/NavBar";
import Profile from "../../Components/Profile";
import { API } from "../../Helpers/Api";

const ManagerProfile = () => {
  // Role Declaration
  const role = "manager";

  // Profile update API
  const URL = `${API}/${role}/profile/update`;

  // Display message and errors
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");

  // Update profile function
  function updateProfile(userData) {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        sessionToken: localStorage.getItem("CRMSes"),
      }),
    })
      .then((val) => val.json())
      .then((val) => {
        if (val.acknowledged) {
          setErr("");
          setMes(val.message);
        } else {
          setMes("");
          setErr(val.error);
        }
      })
      .catch((err) => {
        console.log(err);
        setMes("");
        setErr("Error Sending Email");
      });
  }

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screen scrollbar-hide bg-slate-100">
        <Profile
          updateProfile={updateProfile}
          mes={mes}
          err={err}
          setErr={setErr}
          setMes={setMes}
          role={role}
        />
      </div>
    </div>
  );
};

export default ManagerProfile;