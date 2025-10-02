import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const Home = () => {
  const navigate = useNavigate();

  const passes = [
    { id: 1, title: "Gruppträning", desc: "Energi, gemenskap och glädje i varje pass.", img: "/images/groupsession.jpg" },
    { id: 2, title: "Personlig träning", desc: "Få skräddarsydd träning med våra coacher.", img: "/images/spinning.jpg" },
    { id: 3, title: "Öppet gym", desc: "Träna fritt med modern utrustning och härlig atmosfär.", img: "/images/gymclass.jpg" },
  ];

  const coaches = [
    { name: "Anna Svensson", role: "Personlig tränare", img: "/images/femalecoach.jpg" },
    { name: "Johan Karlsson", role: "Gruppträningsinstruktör", img: "/images/malecoach1.jpg" },
    { name: "Anders Svensson", role: "PT & Kostrådgivare", img: "/images/malecoach2.jpg" },
  ];

  return (
    <div className={styles.home}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1>Core Gym Club AB</h1>
          <p>Din träningsresa börjar här i Haninge</p>
        </div>
      </div>

      {/* Info */}
      <section className={styles.intro}>
        <h2>Välkommen till Core Gym Club</h2>
        <p>
          Vi erbjuder gruppträning, personlig träning och öppna gympass. Med vårt digitala
          bokningssystem kan du enkelt boka pass, se scheman och hantera ditt medlemskap.
        </p>
      </section>

      {/* Pass */}
      <section className={styles.passes}>
        <h2>Våra pass</h2>
        <div className={styles.passGrid}>
          {passes.map((p) => (
            <div
              key={p.id}
              className={styles.passCard}
                onClick={() => navigate('/GymClasses')}
              style={{ cursor: "pointer" }}
            >
              <img src={p.img} alt={p.title} className={styles.passImage} />
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coacher */}
      <section className={styles.coaches}>
        <h2>Våra coacher</h2>
        <div className={styles.coachGrid}>
          {coaches.map((c, i) => (
            <div key={i} className={styles.coachCard}>
              <img src={c.img} alt={c.name} />
              <div className={styles.coachInfo}>
                <h3>{c.name}</h3>
                <p>{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
