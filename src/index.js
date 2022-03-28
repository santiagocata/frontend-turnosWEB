import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LogContextProvider from "./context/LogContext";

ReactDOM.render(
  <LogContextProvider>
    <App />
  </LogContextProvider>,
  document.getElementById("root")
);
