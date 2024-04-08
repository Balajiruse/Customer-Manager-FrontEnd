import NavBar from "../../Components/NavBar";
import Service from "../../Components/Service";
import { API } from "../../Helpers/Api";

const AdminService = () => {
  // Role Declaration
  const role = "admin";

  // API URL Service delete
  const URLSerDel = `${API}/${role}/service/deleteservice`;

  // Delete Service function
  async function handleSerDel(id) {
    try {
      const data = await fetch(URLSerDel, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionToken: localStorage.getItem("CRMSes"),
          serviceId: id,
        }),
      });
      const val = await data.json();
      if (val.acknowledged) {
        alert(val.message);
        return val.acknowledged;
      } else {
        alert(val.error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="max-h-screen overflow-hidden">
        <NavBar role={role} />
      </div>
      <div className="flex flex-col w-full min-h-screen gap-8  scrollbar-hide">
        <>
          <Service role={role} handleSerDel={handleSerDel} />
        </>
      </div>
    </div>
  );
};

export default AdminService;