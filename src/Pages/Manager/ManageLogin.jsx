import { useNavigate } from "react-router-dom";
import Login from "../../Components/Login";
import { API } from "../../Helpers/Api";
import { useState } from "react";

const ManagerLogin = () => {
  // Role Declaration
  const role = "manager";
  const name = "manager";

  // Login API
  const URLLogin = `${API}/manager/login`;
  //Resend Confirmation Email API
  const URLResend = `${API}/manager/resendemail`;

  // Display message and errors
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");
  const [resend, setResend] = useState("");

  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/manager/signup");
  }

  // Login function
  function handleLogin(userData) {
    //Login API
    fetch(URLLogin, {
      method: "POST",
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
          // Local storage
          localStorage.setItem("CRMSes", val.sessionToken);
          navigate("/manager/dashboard", { replace: true });
        } else {
          if (val.active) {
            setResend(true);
          }
          setMes("");
          setErr(val.error);
        }
      })
      .catch((err) => {
        console.log(err);
        setMes("");
        setErr("Error Logging In");
      });
  }

  // resend Confirmation email
  function handleResend(userData) {
    setMes("resending Verification email ...");
    //API confirmation email Resend
    fetch(URLResend, {
      method: "POST",
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
        setErr("Error Sending Mail");
      });
  }

  return (
    <div className="flex items-center justify-center h-screen custom_bg">
      <Login
        name={name}
        handleNavigate={handleNavigate}
        handleLogin={handleLogin}
        handleResend={handleResend}
        setMes={setMes}
        setErr={setErr}
        mes={mes}
        setResend={setResend}
        resend={resend}
        err={err}
        role={role}
      />
    </div>
  );
};

export default ManagerLogin;