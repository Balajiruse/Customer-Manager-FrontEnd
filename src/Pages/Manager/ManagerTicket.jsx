import NavBar from "../../Components/NavBar";
import Ticket from "../../Components/Ticket";

const ManagerTicket = () => {
  // Role Declaration
  const role = "manager";

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screen bg-slate-100 scrollbar-hide">
        <Ticket role={role} />
      </div>
    </div>
  );
};

export default ManagerTicket;