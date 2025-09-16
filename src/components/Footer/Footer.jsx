import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div>
          <p>&copy; {new Date().getFullYear()} Core Gym Club. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
