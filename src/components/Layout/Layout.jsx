import { Footer } from "../Footer/Footer"
import { NavBar } from "../NavBar/NavBar"
import styles from './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <NavBar/>
      <main className={styles.main}>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout