
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./Navbar";
import ResponsiveGrid from "./Grid";
import Footer from "./Footer";

function App() {
  return (
    <>
    <Navbar />
      <ResponsiveGrid />

      <Routes>
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
