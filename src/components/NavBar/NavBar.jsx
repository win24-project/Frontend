import { useAuth } from "../Context/AuthContext";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Core Gym Club</h1>
        <BurgerMenu />
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/contact">Contact</a>
          <a href="/klasser">Pass</a>

          {isLoggedIn ? (
            <div className={styles.profileSection}>
              <img
                src="/images/avatar.svg"
                alt="Profile"
                className={styles.avatar}
                onClick={() => navigate("/profile")}
              />
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <a href="/login">Sign in</a>
          )}
        </nav>
      </div>
    </header>
  );
};
