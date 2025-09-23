import { Footer } from "../Footer/Footer"
import { NavBar } from "../NavBar/NavBar"
import { HomePage } from "../Home/HomePage"

import styles from './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <NavBar/>
      <main className={styles.main}>
        {children}
        <HomePage/>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
