import Dashboard from "../../Components/DashBoard";
import NavBar from "../../Components/NavBar";

const UserDashboard = () => {
  //Role declaration
  const role = "user";

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screen bg-slate-100 scrollbar-hide">
        <Dashboard role={role} />
      </div>
    </div>
  );
};

export default UserDashboard;