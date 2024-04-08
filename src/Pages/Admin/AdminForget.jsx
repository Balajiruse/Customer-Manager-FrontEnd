
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../../Components/Forgot";
import { API, CurrAPI } from "../../Helpers/Api";
import { useState } from "react";

const AdminForgot = () => {
  // Role Declaration
  const name = "Admin";

  // API URL Forgot
  const URLForgot = `${API}/admin/forgot`;
  // Link for new password entering
  const URLUpdate = `${CurrAPI}/admin/update`;

  // Display message and errors
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/admin");
  }

  // forgot flow function
  function handleForgot(emailId) {
    // checking empty field
    if (!emailId) {
      setMes("");
      setErr("Fields are required");
      return;
    }

    // API Forgot flow
    fetch(URLForgot, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailId, link: URLUpdate }),
    })
      .then((val) => val.json())
      .then((val) => {
        if (val.acknowledged) {
          setMes(val.message);
        } else {
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
    <div className="flex items-center justify-center h-screen custom_bg">
      <ForgotPassword
        name={name}
        handleNavigate={handleNavigate}
        mes={mes}
        err={err}
        setErr={setErr}
        setMes={setMes}
        handleForgot={handleForgot}
      />
    </div>
  );
};

export default AdminForgot;
