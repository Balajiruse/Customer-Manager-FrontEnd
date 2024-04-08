import { useParams } from "react-router-dom";
import UpdatePassword from "../../Components/Update";
import { API } from "../../Helpers/Api";
import { useState } from "react";

const AdminUpdatePassword = () => {
  const { id, token } = useParams();

  // API URL Update password
  const URL = `${API}/admin/update/${id}/${token}`;
  // Display message and errors
  const [err, setErr] = useState("");
  const [mes, setMes] = useState("");

  // Update new password function
  function handleUpdate(userData) {
    // check for empty field
    if (!userData.newPassword) {
      setErr("Fields are required");
      return;
    }

    if (userData.newPassword !== userData.confirmNewPassword) {
      setErr("Password doesn't match");
      return;
    }

    // API update password
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
    <div className="flex items-center justify-center h-screen custom_bg">
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

export default AdminUpdatePassword;