/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");

    return stored ? JSON.parse(stored) : null;
  });
  const queryClient = useQueryClient();

  const login = (token, userData) => {
    localStorage.setItem("token", token);

    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  const logout = () => {
    queryClient.clear();
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
