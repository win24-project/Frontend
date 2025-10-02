import { useEffect, useState } from 'react'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import styles from './NavBar.module.css'
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
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.logo}>Core Gym Club</h1>
          <BurgerMenu/>
          <nav className={styles.nav}>
            <a href="/">Home</a>
            <a href="/contact">Contact</a>
            <a href="/klasser">Pass</a>
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
