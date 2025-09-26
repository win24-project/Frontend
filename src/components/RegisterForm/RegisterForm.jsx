import { useState } from 'react';
import styles from './RegisterForm.module.css';
import { useNavigate } from 'react-router';

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[^a-zA-Z0-9])/.test(password)) {
      newErrors.password = "Password must contain at least one special character (e.g. !, @, #)";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
    return;
  }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://group-project-authservice-ebbpd0c8g2fabqdr.swedencentral-01.azurewebsites.net/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          confirmPassword: confirmPassword
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        navigate("/");
      } else {
        const errorText = await response.text();
        console.log("Signup failed:", errorText);
        alert("Signup failed: " + errorText);
      }
    } catch (err) {
      console.log("error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.registerWrapper}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.title}>Become a member</h2>
        <p className={styles.infoText}>Start your membership today from $19/month and unlock all our classes!</p>

        <div className={styles.field}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        <div className={styles.field}>
          <label>Confirm Password</label>
          <input 
            type="password" 
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className={styles.button}>Become a member</button>

        <div className={styles.redirectLogin}>
          <p>Already a member? <a href="/login">Login here</a></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
