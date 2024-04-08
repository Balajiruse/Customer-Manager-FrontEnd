import NavBar from "../../Components/NavBar";
import Service from "../../Components/Service";

const ManagerService = () => {
  // Role Declaration
  const role = "manager";

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screen bg-slate-100 scrollbar-hide">
        <Service role={role} />
      </div>
    </div>
  );
};

export default ManagerService;