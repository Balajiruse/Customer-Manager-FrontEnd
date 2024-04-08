import Activity from "../../Components/Activity";
import NavBar from "../../Components/NavBar";

const ManagerActivity = () => {
  // Role Declaration
  const role = "manager";

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screen bg-slate-100 scrollbar-hide">
        <Activity role={role} />
      </div>
    </div>
  );
};

export default ManagerActivity;