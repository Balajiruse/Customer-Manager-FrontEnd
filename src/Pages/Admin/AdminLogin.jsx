
import { useNavigate } from "react-router-dom";
import Login from "../../Components/Login";
import { API } from "../../Helpers/Api";
import { useState } from "react";

const AdminLogin = () => {
  // Role Declaration
  const name = "admin";
  const role = "admin";

  // API URL Login
  const URLLogin = `${API}/admin/login`;
  // API URL Resend Confirmatio Email
  const URLResend = `${API}/admin/resendemail`;

  // Display message and errors
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");
  const [resend, setResend] = useState("");

  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/admin/signup");
  }

  // login function
  function handleLogin(userData) {
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

          // setting local storage
          localStorage.setItem("CRMSes", val.sessionToken);

          navigate("/admin/dashboard", { replace: true });
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

  // Resend confirmation email
  function handleResend(userData) {
    setMes("resending Verification email ...");
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

export default AdminLogin;
