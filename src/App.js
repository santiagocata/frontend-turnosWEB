import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ResponsiveGrid from "./commons/Grid";
import AdminView from "./components/AdminView";
import BranchList from "./components/BranchList";
import PickTurn from "./components/PickTurn";
import NotFound from "./commons/NotFound";
import GridTurns from "./components/GridTurns";
import ForgotPassword from "./components/ForgotPassword";
import SetNewPassword from "./components/SetNewPassword";
import ChangePassword from "./components/ChangePassword";
import SingleTurn from "./components/SingleTurn";
import ChangeTurn from "./components/ChangeTurn";
import Footer from "./components/Footer";
import StastSuc from "./components/StastSuc";
import { Navigate, Route, Routes } from "react-router";
import axios from "axios";
import { LogContext } from "./context/UserContext";
import { useContext, useEffect, useState } from "react";

function App() {
  if (process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = "https://turnos-web-backend.herokuapp.com/";
    axios.defaults.withCredentials = true;
  }

  const { togleAuth, user } = useContext(LogContext);

  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    try {
      const user = await axios.get("/user/me");
      togleAuth(user.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  if (loading) return null;

  return (
    <>
      {user?.role !== undefined && <Navbar />}
      <Routes>
        {user?.role === undefined && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset/:token" element={<SetNewPassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </>
        )}

        {user?.role === "client" && (
          <>
            <Route path="/" element={<ResponsiveGrid />} />
            <Route path="/book/:id" element={<PickTurn />} />
            <Route path="/myturn" element={<SingleTurn />} />
            <Route path="/changeturn/:id" element={<ChangeTurn />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Route path="/" element={<BranchList />} />
            <Route path="/admin" element={<AdminView type={"add"} />} />
            <Route path="/adminlist" element={<BranchList />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </>
        )}

        {user?.role === "operator" && (
          <>
            <Route path="/" element={<GridTurns />} />
            <Route path="/turn" element={<GridTurns />} />
            <Route path="/stats" element={<StastSuc />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </>
        )}

        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Routes>
      {/*  <Footer /> */}
    </>
  );
}

export default App;
