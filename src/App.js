import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

//Armado de rutas momentaneo

/*
<Route path="/login" element={<Login/>}/>
<Route path="/" element={<Home/>}/>
*/
