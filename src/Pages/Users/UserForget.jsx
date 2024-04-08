import { useNavigate } from "react-router-dom";
import ForgotPassword from "../../Components/Forgot";
import { API, CurrAPI } from "../../Helpers/Api";
import { useState } from "react";

const UserForgot = () => {
  //Role declaration
  const name = "User";

  // URL API for Forgot Password flow
  const URLForgot = `${API}/user/forgot`;

  // link to enter the new password Client side URL
  const URLUpdate = `${CurrAPI}/user/update`;

  // Message and Error display
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/");
  }

  // Forgot password flow
  function handleForgot(emailId) {
    // Checking Empty field
    if (!emailId) {
      setMes("");
      setErr("Fields are required");
      return;
    }

    // API for Forgot flow
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
          setErr("");
          setMes(`${val.message} and ${val.valid}`);
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

export default UserForgot;