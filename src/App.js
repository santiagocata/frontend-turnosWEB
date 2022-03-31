import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ResponsiveGrid from "./commons/Grid";
import Footer from "./components/Footer";
import AdminView from "./components/AdminView";
import BranchList from "./components/BranchList";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ResponsiveGrid />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/adminlist" element={<BranchList />} />
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
