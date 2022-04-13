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
import SimpleMap from "./components/Map";
import StastSuc from "./components/StastSuc";

import { Navigate, Route, Routes } from "react-router";
import axios from "axios";
import { LogContext } from "./context/UserContext";
import { useContext, useEffect, useState } from "react";
function App() {
  //comment this line when the app is running locally
  axios.defaults.baseURL = "https://turnos-web-backend.herokuapp.com/";
  axios.defaults.withCredentials = true;

  const { togleAuth, user } = useContext(LogContext);

  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    try {
      const data = await axios.get("/user/me");
      togleAuth(data.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  if (loading) return null;

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user?.id ? <ResponsiveGrid /> : <Login /> || <Register />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {user?.role === "client" && (
          <Route path="/book/:id" element={<PickTurn />} />
        )}

        {user?.role === "admin" && (
          <>
            <Route path="/admin" element={<AdminView />} />
            <Route path="/adminlist" element={<BranchList />} />
          </>
        )}

        {user?.role === "operator" && (
          <>
            <Route path="/turn" element={<GridTurns />} />
            <Route path="/stats" element={<StastSuc />} />
          </>
        )}

        <Route path="/myturn" element={<SingleTurn />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/changeturn/:id" element={<ChangeTurn />} />

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<SetNewPassword />} />
        <Route path="/map" element={<SimpleMap />} />

        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Routes>
      {/*  <Footer /> */}
    </>
  );
}

export default App;
