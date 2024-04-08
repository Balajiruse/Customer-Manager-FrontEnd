
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./Pages/Users/UserLogin";
import ManagerLogin from "./Pages/Manager/ManageLogin";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserSignup from "./Pages/Users/UserSignup";
import ManagerSignup from "./Pages/Manager/ManagerSignup";
import AdminSignup from "./Pages/Admin/AdminSignup";
import UserForgot from "./Pages/Users/UserForget";
import ManagerForgot from "./Pages/Manager/ManageForget";
import AdminForgot from "./Pages/Admin/AdminForget";
import UserUpdatePassword from "./Pages/Users/UserUpdate";
import ManagerUpdatePassword from "./Pages/Manager/Managerupdate";
import AdminUpdatePassword from "./Pages/Admin/AdminUpade";
import UserDashboard from "./Pages/Users/UserDashboard";
import UserProfile from "./Pages/Users/UserProfile";
import ManagerProfile from "./Pages/Manager/ManagerProfile";
import ManagerDashboard from "./Pages/Manager/ManagerDashboard";
import UserActivity from "./Pages/Users/UserActivity";
import ManagerActivity from "./Pages/Manager/ManagerActivity";
import AdminActivity from "./Pages/Admin/AdminActivity";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminProfile from "./Pages/Admin/AdminProfile";
import NoPage from "./Components/Nopage";
import UserNotify from "./Pages/Users/UserNotify";
import ManagerNotify from "./Pages/Manager/ManagerNotify";
import AdminNotify from "./Pages/Admin/AdiminNotify";
import UserService from "./Pages/Users/UserService";
import UserTicket from "./Pages/Users/UserService";
import ManagerService from "./Pages/Manager/ManagerService";
import ManagerTicket from "./Pages/Manager/ManagerTicket";
import AdminService from "./Pages/Admin/AdminService";
import AdminTicket from "./Pages/Admin/AdminTicket";

function App() {
  return (
    <>
      <Routes>
        {/* User Routes */}
        <Route exact path="/" element={<UserLogin />} />
        <Route exact path="/user" element={<UserLogin />} />
        <Route exact path="/signup" element={<UserSignup />} />
        <Route exact path="/forgot" element={<UserForgot />} />
        <Route exact path="/user/dashboard" element={<UserDashboard />} />
        <Route exact path="/user/profile" element={<UserProfile />} />
        <Route exact path="/user/activity" element={<UserActivity />} />
        <Route exact path="/user/notification" element={<UserNotify />} />
        <Route exact path="/user/service" element={<UserService />} />
        <Route exact path="/user/ticket" element={<UserTicket />} />
        <Route
          exact
          path="/user/update/:id/:token"
          element={<UserUpdatePassword />}
        />

        {/* Manage Routes */}
        <Route exact path="/manager" element={<ManagerLogin />} />
        <Route exact path="/manager/signup" element={<ManagerSignup />} />
        <Route exact path="/manager/forgot" element={<ManagerForgot />} />
        <Route exact path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route exact path="/manager/profile" element={<ManagerProfile />} />
        <Route exact path="/manager/activity" element={<ManagerActivity />} />
        <Route exact path="/manager/notification" element={<ManagerNotify />} />
        <Route exact path="/manager/service" element={<ManagerService />} />
        <Route exact path="/manager/ticket" element={<ManagerTicket />} />
        <Route
          exact
          path="/manager/update/:id/:token"
          element={<ManagerUpdatePassword />}
        />

        {/* Admin Routes */}
        <Route exact path="/admin" element={<AdminLogin />} />
        <Route exact path="/admin/signup" element={<AdminSignup />} />
        <Route exact path="/admin/forgot" element={<AdminForgot />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/admin/profile" element={<AdminProfile />} />
        <Route exact path="/admin/activity" element={<AdminActivity />} />
        <Route exact path="/admin/notification" element={<AdminNotify />} />
        <Route exact path="/admin/service" element={<AdminService />} />
        <Route exact path="/admin/ticket" element={<AdminTicket />} />
        <Route
          exact
          path="/admin/update/:id/:token"
          element={<AdminUpdatePassword />}
        />

        {/* No page Route */}
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
