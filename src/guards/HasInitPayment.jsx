import { Navigate, Outlet  } from "react-router-dom";
import { useAuth } from '../components/Context/AuthContext'

const HasInitPayment = () => {
    const { hasInitPayment, isLoggedIn, userRole, loading } = useAuth();

    if (loading) return <p>loading...</p>;
    if(!hasInitPayment && userRole !== "Admin" && isLoggedIn) 
        return <Navigate to="/membership" replace />;
    
  return <Outlet />;
};

export default HasInitPayment;
