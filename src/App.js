import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ResponsiveGrid from "./commons/Grid";
import Footer from "./components/Footer";
import AdminView from "./components/AdminView";
import SingleView from "./commons/SingleView";
import NotFound from "./commons/NotFound";
import GridTurns from "./components/GridTurns";

import { Navigate, Route, Routes } from "react-router";
import axios from "axios";
import { LogContext } from "./context/UserContext";
import { useContext, useEffect } from "react";

function App() {
  const { togleAuth, user } = useContext(LogContext);

  useEffect(() => {
    axios.get("/user/me").then((data) => togleAuth(data.data));
  }, []);
  console.log(user);

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
          <Route path="/book/:id" element={<SingleView />} />
        )}

        <Route path="/admin" element={<AdminView />} />
        <Route path="/turn" element={<GridTurns />} />

        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
