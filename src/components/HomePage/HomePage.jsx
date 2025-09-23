import styles from "./HomePage.module.css";

const Home = () => {
  const passes = [
    { title: "Gruppträning", desc: "Energi, gemenskap och glädje i varje pass." },
    { title: "Personlig träning", desc: "Få skräddarsydd träning med våra coacher." },
    { title: "Öppet gym", desc: "Träna fritt med modern utrustning och härlig atmosfär." },
  ];

  const coaches = [
    { name: "Anna Svensson", role: "Personlig tränare", img: "https://via.placeholder.com/300x200" },
    { name: "Johan Karlsson", role: "Gruppträningsinstruktör", img: "https://via.placeholder.com/300x200" },
    { name: "Sara Lind", role: "PT & Kostrådgivare", img: "https://via.placeholder.com/300x200" },
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
          {passes.map((p, i) => (
            <div key={i} className={styles.passCard}>
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
