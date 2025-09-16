import BurgerMenu from '../BurgerMenu/BurgerMenu'
import styles from './NavBar.module.css'

export const NavBar = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.logo}>Core Gym Club</h1>
          <BurgerMenu/>
          <nav className={styles.nav}>
            <a href="/">Home</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </header>
    </>
  )
}
