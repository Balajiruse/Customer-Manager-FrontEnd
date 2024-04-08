import { useNavigate } from "react-router-dom";
import ForgotPassword from "../../Components/Forgot";
import { useState } from "react";
import { API, CurrAPI } from "../../Helpers/Api";

const ManagerForgot = () => {
  // API URL for forgot password
  const URLForgot = `${API}/manager/forgot`;
  //Front end link to enter the new password
  const URLUpdate = `${CurrAPI}/manager/update`;

  // Display message and errors
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");

  // Role Declaration
  const name = "Manager";

  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/manager");
  }

  // Sending forgot password message
  function handleForgot(emailId) {
    // Checking empty field
    if (!emailId) {
      setMes("");
      setErr("Fields are required");
      return;
    }

    // API for forgot password
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

export default ManagerForgot;