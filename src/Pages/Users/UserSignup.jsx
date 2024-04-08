import { useNavigate } from "react-router-dom";
import Signup from "../../Components/Signup";
import { API } from "../../Helpers/Api";
import { useState } from "react";

const UserSignup = () => {
  const name = "User";

  // Signup URL
  const URLSignup = `${API}/user/signup`;

  // For message and error display
  const [mes, setMes] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/");
  }

  // signup
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

export default UserSignup;