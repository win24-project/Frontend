import styles from './HeroSection.module.css'

function HeroSection() {
  return (
    <div className={styles.heroContainer}>
        <img className={styles.heroImg} alt="image of a group of people training and giving a high five" src="/images/core-gym-club-highfive.jpg"/>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
            <h2>The best gym in town!</h2>
            <p>Join our brand-new facility today and take your fitness journey to the next level.</p>
        </div>
    </div>
  )
}

export default HeroSection