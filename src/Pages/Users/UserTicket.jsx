import NavBar from "../../Components/NavBar";
import Ticket from "../../Components/Ticket";

const UserTicket = () => {
  // Declaring role
  const role = "user";

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screen scrollbar-hide bg-slate-100">
        <Ticket role={role} />
      </div>
    </div>
  );
};

export default UserTicket;