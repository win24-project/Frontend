import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const extractRoleFromToken = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || ''
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(extractRoleFromToken(token))
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setUserRole(extractRoleFromToken(token))
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole('')
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);