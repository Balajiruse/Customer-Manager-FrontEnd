import { useParams } from "react-router-dom";
import UpdatePassword from "../../Components/Update";
import { API } from "../../Helpers/Api";
import { useState } from "react";

const ManagerUpdatePassword = () => {
  const { id, token } = useParams();

  // API URL for updating new password
  const URL = `${API}/manager/update/${id}/${token}`;

  // Message and Error Display
  const [err, setErr] = useState("");
  const [mes, setMes] = useState("");

  // Updating new Password
  function handleUpdate(userData) {
    // Checking for Empty Field
    if (!userData.newPassword) {
      setErr("Fields are required");
      return;
    }

    if (userData.newPassword !== userData.confirmNewPassword) {
      setErr("Password doesn't match");
      return;
    }

    // API for updating new password
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
        name={name}
        mes={mes}
        err={err}
        setErr={setErr}
        setMes={setMes}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default ManagerUpdatePassword;