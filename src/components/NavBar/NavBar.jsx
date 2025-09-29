import BurgerMenu from '../BurgerMenu/BurgerMenu'
import styles from './NavBar.module.css'
import { useAuth } from "../Context/AuthContext";

export const NavBar = () => {

  const { isLoggedIn, logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.logo}>Core Gym Club</h1>
          <BurgerMenu/>
          <nav className={styles.nav}>
            <a href="/">Home</a>
            <a href="/classes">Classes</a>
            <a href='/membership'>Membership</a>
            {isLoggedIn ? (
              <a href="/" onClick={handleLogout}>Log out</a>
            ) : (
              <a href="/login">Sign in</a>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
