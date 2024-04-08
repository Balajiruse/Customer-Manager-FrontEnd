import { useNavigate } from "react-router-dom";
import Signup from "../../Components/Signup";
import { API } from "../../Helpers/Api";
import { useState } from "react";

const ManagerSignup = () => {
  // Role Declaration
  const name = "Manager";
  // Signup API
  const URLSignup = `${API}/manager/signup`;
  // Display message and errors
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/manager");
  }

  // Signup function
  function handleSignup(userData) {
    fetch(URLSignup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((val) => val.json())
      .then((val) => {
        console.log(val);
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
        setErr("Error Logging In");
      });
  }

  return (
    <div className="flex items-center justify-center h-screen custom_bg">
      <Signup
        name={name}
        handleNavigate={handleNavigate}
        handleSignup={handleSignup}
        setMes={setMes}
        setErr={setErr}
        err={err}
        mes={mes}
      />
    </div>
  );
};

export default ManagerSignup;