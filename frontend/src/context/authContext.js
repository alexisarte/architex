'use client'

import { createContext, useContext, useState } from "react";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook para acceder fácilmente al contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto de autenticación
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  // Definir las acciones
  const login = (newToken, newUserData) => {
    setToken(newToken);
    setUserData(newUserData);
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
  };

  // Getters
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, userData, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
