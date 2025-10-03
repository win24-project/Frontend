import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from './BurgerMenu.module.css'
import { useState, useRef } from "react";
import useClickOutsideElement from "../../hooks/useClickOutsideElement";
import { useAuth } from "../Context/AuthContext";

const BurgerMenu = () => {
    const { isLoggedIn, logout } = useAuth();
    const [open, setOpen ] = useState(false)
    const burgerMenuContainerRef = useRef(null)
    useClickOutsideElement(burgerMenuContainerRef, ClickOutSideOfBurgerMenuCallBack)

    function ClickOutSideOfBurgerMenuCallBack() {
        setOpen(false)
    }

    const handleLogout = (e) => {
    e.preventDefault();
    logout();
    };

  return (
    <div className={styles.burgerMenuContainer} ref={burgerMenuContainerRef}>
      <FontAwesomeIcon icon={faBars} className={styles.burgerIcon} onClick={() => setOpen(true)}/>
      { open && <nav className={styles.nav}>
        <a className={styles.link} href="/">Home</a>
        <a className={styles.link} href="/classes">Classes</a>
        <a className={styles.link} href="/profile">Profile</a>
        {isLoggedIn ? (
          <a className={styles.link} href="/" onClick={handleLogout}>Log out</a>
        ) : (
          <a className={styles.link} href="/login">Sign in</a>
        )}
      </nav> }
    </div>
  )
}

export default BurgerMenu