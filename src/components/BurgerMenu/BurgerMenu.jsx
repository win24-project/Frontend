import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from './BurgerMenu.module.css'
import { useState, useRef } from "react";
import useClickOutsideElement from "../../hooks/useClickOutsideElement";

const BurgerMenu = () => {
    const [open, setOpen ] = useState(false)
    const burgerMenuContainerRef = useRef(null)
    useClickOutsideElement(burgerMenuContainerRef, ClickOutSideOfBurgerMenuCallBack)

    function ClickOutSideOfBurgerMenuCallBack() {
        setOpen(!open)
    }

  return (
    <div className={styles.burgerMenuContainer} ref={burgerMenuContainerRef}>
      <FontAwesomeIcon icon={faBars} className={styles.burgerIcon} onClick={() => setOpen(!open)}/>
      { open && <nav className={styles.nav}>
        <a className={styles.link} href="/">Home</a>
        <a className={styles.link} href="/contact">Contact</a>
      </nav> }
    </div>
  )
}

export default BurgerMenu