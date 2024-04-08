import NavBar from "../../Components/NavBar";
import Ticket from "../../Components/Ticket";

const AdminTicket = () => {
  // Role Declaration
  const role = "admin";

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screen  scrollbar-hide">
        <Ticket role={role} />
      </div>
    </div>
  );
};

export default AdminTicket;