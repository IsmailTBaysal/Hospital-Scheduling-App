import React, { createContext, useContext, useState } from "react";
import { getCurrentUser } from "./api";
import { useEffect } from "react";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("jwt_token")
  );
  const [currentUser, setCurrentUser] = useState(null);

  const login = async () => {
    setIsAuthenticated(true);
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("jwt_token")) {
      login();
    } else {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
  };

  const contextValue = {
    currentUser,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
