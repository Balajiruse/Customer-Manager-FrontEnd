import { useState } from "react";
import UpdatePassword from "../../Components/Update";
import { API } from "../../Helpers/Api";
import { useParams } from "react-router-dom";

const UserUpdatePassword = () => {
  const { id, token } = useParams();

  // API URL for updating new Password for user
  const URL = `${API}/user/update/${id}/${token}`;

  // Display message and Error on click
  const [err, setErr] = useState("");
  const [mes, setMes] = useState("");

  // Updaing New Password for user
  function handleUpdate(userData) {
    // Check for empty field
    if (!userData.newPassword) {
      setErr("Fields are required");
      return;
    }

    if (userData.newPassword !== userData.confirmNewPassword) {
      setErr("Password doesn't match");
      return;
    }

    // API Request
    fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
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
        setErr("Error updating password");
      });
  }

  return (
    <div className="flex items-center justify-center bg-slate-100 h-screen custom_bg">
      <UpdatePassword
        mes={mes}
        err={err}
        setErr={setErr}
        setMes={setMes}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default UserUpdatePassword;