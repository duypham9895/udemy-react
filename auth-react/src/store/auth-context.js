import React, { useCallback, useEffect, useState } from "react";

let loggerTimer = null;

const convertSecondsToMilliseconds = (seconds) => seconds * 1000;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const calculateRemainingTime = (expiresInMilliseconds) =>
  expiresInMilliseconds - new Date().getTime();

const retrieveStoredToken = () => {
  const token = localStorage.getItem("token");
  const expiresInMilliseconds = localStorage.getItem("expiresInMilliseconds");

  const remainingTime = calculateRemainingTime(expiresInMilliseconds);
  const oneMinuteInMilliseconds = convertSecondsToMilliseconds(60);
  if (remainingTime <= oneMinuteInMilliseconds) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresInMilliseconds");
    return null;
  }
  return { token, remainingTime };
};

export const AuthContextProvider = ({ children }) => {
  const initialState = retrieveStoredToken();
  const { token: storeToken, remainingTime } = initialState || {};
  const [token, setToken] = useState(storeToken);

  const isLoggedIn = Boolean(token);

  const loginHandler = (token, expiresInMilliseconds) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expiresInMilliseconds", expiresInMilliseconds);

    const remainingTime = calculateRemainingTime(expiresInMilliseconds);
    loggerTimer = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiresInMilliseconds");
    loggerTimer && clearTimeout(loggerTimer);
  }, []);

  useEffect(() => {
    if (storeToken) {
      console.log({ remainingTime });
      loggerTimer = setTimeout(logoutHandler, remainingTime);
    }
  }, [storeToken, remainingTime, logoutHandler]);

  const contextValue = {
    token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
