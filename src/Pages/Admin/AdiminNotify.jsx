import NavBar from "../../Components/NavBar";
import Notification from "../../Components/Notification";

const AdminNotify = () => {
  // Role Declaration
  const role = "admin";

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screen bg-slate-100 scrollbar-hide">
        <Notification role={role} />
      </div>
    </div>
  );
};

export default AdminNotify;