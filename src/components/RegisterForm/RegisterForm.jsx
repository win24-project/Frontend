import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div className={styles.registerWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Register</h2>

        <div className={styles.field}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>

        <div className={styles.field}>
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" />
        </div>

        <button type="submit" className={styles.button}>Register</button>

        <div className={styles.redirectLogin}>
          <p>Already a member? <a href="/login">Login here</a></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
