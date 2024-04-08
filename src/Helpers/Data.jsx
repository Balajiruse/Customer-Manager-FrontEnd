import { API } from "./Api";

export function CheckSesToken(role) {
  // API URL to get common data for the users
  const URL = `${API}/${role}/check`;
  let first_name;

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(localStorage.getItem("CRMSes")),
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.acknowledged) {
        first_name = data.first_name;
        return first_name;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}