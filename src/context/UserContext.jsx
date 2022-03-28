import axios from "axios";
import React, { createContext, useState } from "react";

const initialState = {
  user: null,
  isAuthenticate: false,
  togleAuth: () => {},
};

export const LogContext = createContext(initialState);

const LogContextProvider = ({ children }) => {
  const [isLoged, setIsLoged] = useState({
    user: null,
    isAuthenticate: false,
  });

  const logOut = () => {
    axios.post("/user/logout").then(() => {
      setIsLoged({ user: null, isAuthenticated: false });
    });
  };

  const togleAuth = (user) => {
    setIsLoged({
      user: user,
      isAuthenticate: !isLoged.isAuthenticate,
    });
  };

  return (
    <LogContext.Provider value={{ ...isLoged, togleAuth, logOut }}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContextProvider;
