import { Navigate, Outlet  } from "react-router-dom";
import { useAuth } from '../components/Context/AuthContext'

const HasInitPayment = () => {
    const { hasInitPayment, isLoggedIn, userRole } = useAuth();
    console.log(hasInitPayment, userRole, isLoggedIn)
    if(!hasInitPayment && userRole !== "Admin" && isLoggedIn) {
        return <Navigate to="/membership" replace />;
    }
  return <Outlet />;
};

export default HasInitPayment;
