import { useState } from "react";
import { useNavigate } from "react-router";
import styles from './ResendEmailConfirmationForm.module.css'

function ResendEmailConfirmationForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading ] = useState(false)
  const authUrl = "https://group-project-authservice-ebbpd0c8g2fabqdr.swedencentral-01.azurewebsites.net";
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true)
    try {
      const res = await fetch(`${authUrl}/resend-email-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      if (!res.ok) {
        setError("Failed to resend email, please try again")
        setLoading(false)
        return
      }
      setEmail("");
      setLoading(false)
      navigate('/');
    } catch (err) {
      setError("error");
      console.log(err)
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="you@example.com"
      className={styles.input}
      />
      <button className={styles.submitButton} type="submit">
        {loading ? "loading..." : "Resend Email Confirmation" }
      </button>
      {error && <p className={styles.error} >{error}</p>}
    </form>
  )
}

export default ResendEmailConfirmationForm