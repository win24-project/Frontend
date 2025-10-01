import { useState } from "react";
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router';
import { useAuth } from "../Context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("https://group-project-authservice-ebbpd0c8g2fabqdr.swedencentral-01.azurewebsites.net/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        console.log("whu", data.hasInitilizedPayment)
        login(data.token, data.hasInitilizedPayment);
        navigate("/");
        
      } else {
          const errorText = await response.text();
          console.log("Login failed: " + errorText);

          if (errorText.toLowerCase().includes("invalid")) {
            setErrors({ 
              email: "Email not found or incorrect"
            });
          } else {
            setErrors({ general: "Login failed. Please try again." });
          }
        }
    } catch (err) {
      console.log("Error: ", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.title}>Sign in</h2>

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

        {errors.general && <div className={styles.error}>{errors.general}</div>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className={styles.redirectLogin}>
          <p>Confirm email: <a href="/resend-email-confirmation">Resend email confirmation</a></p>
          <p>Forgot your password?: <a href="/forgot-password">Restore password</a></p>
          <p>Don't have an account? <a href="/register">Sign up here</a></p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm