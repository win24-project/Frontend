import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [ hasInitPayment, setHasInitPayment ] = useState(false)
  const [loading, setLoading] = useState(true);

  const extractRoleFromToken = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || ''
  }

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("token");
    const initPayment = localStorage.getItem("hasInitPayment");
    if (token) {
      setIsLoggedIn(true);
      setUserRole(extractRoleFromToken(token))
    }
    if(initPayment) {
      if(initPayment == "true") {
        setHasInitPayment(true)
      } else {
        setHasInitPayment(false)
      }
    }
      

    setLoading(false)
  }, []);

  const login = (token, hasinitPayment) => {
    setLoading(true)
    localStorage.setItem("token", token);
    localStorage.setItem("hasInitPayment", hasinitPayment);
    setIsLoggedIn(true);
    setUserRole(extractRoleFromToken(token))
    setHasInitPayment(hasinitPayment)
    setLoading(false)
  };

  const logout = () => {
    setLoading(true)
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole('')
    setHasInitPayment(null)
    setLoading(false)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userRole, hasInitPayment, setHasInitPayment, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);