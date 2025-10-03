import styles from './Footer.module.css';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        {/* Om oss */}
        <div className={styles.about}>
          <h3>Om oss</h3>
          <p>
            Core Gym Club i Haninge är mer än bara ett gym – det är en plats för gemenskap,
            styrka och utveckling. <br></br>Vi erbjuder moderna träningspass, personlig coaching
            och en inspirerande miljö för alla nivåer.
          </p>
        </div>

        {/* Länkar */}
        <div className={styles.links}>
          <h3>Länkar</h3>
          <ul>
            <li onClick={() => navigate('/register')}>Bli medlem</li>
            <li onClick={() => navigate('/classes')}>Våra pass</li>
          </ul>
        </div>

        {/* Öppettider & kontakt */}
        <div className={styles.contact}>
          <h3>Öppettider</h3>
          <p>Alla dagar: 06:00–23:00</p>
            <h3>Adress:</h3>
          <p>Låtsasgatan 123</p>
          <h3>Kontakt:</h3>
          <p>Email: info@coregymclub.se</p>
          <p>Telefon: 08-123 45 678</p>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p>&copy; {new Date().getFullYear()} Core Gym Club. All rights reserved.</p>
      </div>
    </footer>
  );
};
