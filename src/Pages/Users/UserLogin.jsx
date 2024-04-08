import { useNavigate } from "react-router-dom";
import Login from "../../Components/Login";
import { API } from "../../Helpers/Api";
import { useState } from "react";

const UserLogin = () => {
  // login API URL
  const URLLogin = `${API}/user/login`;

  // Resending confirmation email URL API
  const URLResend = `${API}/user/resendemail`;

  // Role declarartion
  const name = "user";
  const role = "user";

  // Display message and error
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");
  const [resend, setResend] = useState("");

  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/signup");
  }

  // Login API
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

          // Setting Local storage
          localStorage.setItem("CRMSes", val.sessionToken);

          // Navigate to dashboard
          navigate("/user/dashboard", { replace: true });
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

  // Resending confirmation Email API
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

export default UserLogin;