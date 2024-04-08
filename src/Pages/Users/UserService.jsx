import NavBar from "../../Components/NavBar";
import Service from "../../Components/Service";

const UserService = () => {
  // role declaring
  const role = "user";

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screen  scrollbar-hide bg-slate-100">
        <Service role={role} />
      </div>
    </div>
  );
};

export default UserService;