import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [ hasInitPayment, setHasInitPayment ] = useState(false)

  const extractRoleFromToken = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || ''
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const initPayment = localStorage.getItem("hasInitPayment");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(extractRoleFromToken(token))
    }
    if(initPayment)
      setHasInitPayment(initPayment)
  }, []);

  const login = (token, hasinitPayment) => {
    localStorage.setItem("token", token);
    localStorage.setItem("hasInitPayment", hasinitPayment);
    setIsLoggedIn(true);
    setUserRole(extractRoleFromToken(token))
    setHasInitPayment(hasInitPayment)
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole('')
    setHasInitPayment(null)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userRole, hasInitPayment }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);