import { useState } from "react";
import NavBar from "../../Components/NavBar";
import Profile from "../../Components/Profile";
import { API } from "../../Helpers/Api";

const UserProfile = () => {
  // Role declaring
  const role = "user";

  // URL for profile details update
  const URL = `${API}/${role}/profile/update`;

  // display message and error
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");

  // update profile API
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
    <div className="flex flex-col w-full md:flex-row ">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screen bg-slate-100 ">
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

export default UserProfile;