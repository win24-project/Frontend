import { useNavigate } from "react-router-dom";
import styles from './LogoutButton.module.css';


const LogoutButton = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
};

if (!token) {
    return null;
}
  return (
     <button className={styles.btnLogout} onClick={handleLogout}>
      Sign out
    </button>
  );


}

export default LogoutButton