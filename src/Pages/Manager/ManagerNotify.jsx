import NavBar from "../../Components/NavBar";
import Notification from "../../Components/Notification";

const ManagerNotify = () => {
  // Role Declaration
  const role = "manager";

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screenscrollbar-hide bg-slate-100">
        <Notification role={role} />
      </div>
    </div>
  );
};

export default ManagerNotify;