
import NavBar from "../../Components/NavBar";
import Dashboard from "../../Components/DashBoard";

const AdminDashboard = () => {
  // Role Declaration
  const role = "admin";

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

export default AdminDashboard;
