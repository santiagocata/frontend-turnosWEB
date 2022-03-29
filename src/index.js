import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LogContextProvider from "./context/UserContext";
import axios from "axios";
import { LogContext } from "./context/UserContext";
import { useContext, useEffect } from "react";

ReactDOM.render(
  <LogContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LogContextProvider>,
  document.getElementById("root")
);
