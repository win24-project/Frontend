import { useNavigate, useSearchParams } from 'react-router';
import styles from './ResetPassword.module.css'
import { useState } from 'react';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError ] = useState("");
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [loading, setLoading ] = useState(false)
  const [form, SetForm] = useState({
    password: "",
    confirmPassword: ""
  })
  const authUrl = "https://group-project-authservice-ebbpd0c8g2fabqdr.swedencentral-01.azurewebsites.net";

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setLoading(true)
    try {
        const res = await fetch(`${authUrl}/reset-password?email=${email}&token=${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        if(!res.ok) {
          setError(`Failed to confirm email: ${data.message}`)
          setLoading(false)
            return
        }
        navigate('/login')
    } catch(error) {
        setError("Failed to confirm email, please try again")
        console.log(error)
        setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.formHeading}>Reset password: {email}</h3>
          <input
          type="password"
          value={form.password}
          onChange={(e) => SetForm(prev => ({...prev, password: e.target.value}))}
          className={styles.input}
          />
          <input
          type="password"
          value={form.confirmPassword}
          onChange={(e) => SetForm(prev => ({...prev, confirmPassword: e.target.value}))}
          className={styles.input}
          />
          <button className={styles.submitButton} type="submit">
            {loading ? "loading..." : "Reset Password" }
          </button>
          {error && <p className={styles.error} >{error}</p>}
        </form>
  )
}

export default ResetPassword