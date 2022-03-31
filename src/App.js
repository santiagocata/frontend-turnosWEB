import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ResponsiveGrid from "./commons/Grid";
import Footer from "./components/Footer";
import AdminView from "./components/AdminView";
import BranchList from "./components/BranchList";
import SingleView from "./commons/SingleView";

import ForgotPassword from "./components/ForgotPassword";
import SetNewPassword from "./components/SetNewPassword";

import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { LogContext } from "./context/UserContext";
import { useContext, useEffect } from "react";

function App() {
  const { togleAuth, user } = useContext(LogContext);

  useEffect(() => {
    axios.get("/user/me").then((data) => togleAuth(data.data));
  }, []);

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
        <Route path="/admin" element={<AdminView />} />
        <Route path="/adminlist" element={<BranchList />} />
        <Route path="/book/:id" element={<SingleView />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<SetNewPassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
