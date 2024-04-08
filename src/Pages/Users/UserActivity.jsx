import Activity from "../../Components/Activity";
import NavBar from "../../Components/NavBar";

const UserActivity = () => {
  //Role declaration
  const role = "user";

  return (
    <div className="flex flex-col w-full max-h-screen md:flex-row scrollbar-hide">
      <div className="md:min-h-screen">
        <NavBar role={role} />
      </div>
      <div className="w-full min-h-screenscrollbar-hide bg-slate-100">
        <Activity role={role} />
      </div>
    </div>
  );
};

export default UserActivity;