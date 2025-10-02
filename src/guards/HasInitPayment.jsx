import { Navigate, Outlet  } from "react-router-dom";
import { useAuth } from '../components/Context/AuthContext'

const HasInitPayment = () => {
    const { hasInitPayment, isLoggedIn, userRole } = useAuth();
    if(hasInitPayment === false && userRole !== "Admin" && isLoggedIn) {
        return <Navigate to="/membership" replace />;
    }
  return <Outlet />;
};

export default HasInitPayment;
