import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ResponsiveGrid from "./commons/Grid";
import Footer from "./components/Footer";
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;

//Armado de rutas momentaneo

/*
<Route path="/login" element={<Login/>}/>
<Route path="/" element={<Home/>}/>
*/
