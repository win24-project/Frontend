import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles  from './ConfirmEmailButton.module.css'

function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError ] = useState("");
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const authUrl = "https://group-project-authservice-ebbpd0c8g2fabqdr.swedencentral-01.azurewebsites.net";

  const handleConfirmEmail = async (event) => {
    event.preventDefault()
    setError("")
    try {
        const res = await fetch(`${authUrl}/confirm-email?email=${email}&token=${token}`, {
            method: "POST"
        })
        const data = await res.json()
        if(!res.ok) {
          setError(`Failed to confirm email: ${data.message}`)
            return
        }
        navigate('/login')
    } catch(error) {
        setError("Failed to confirm email, please try again")
        console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.confirmButton} onClick={handleConfirmEmail}>Confirm Email: {email}</button>
      {error && <p className={styles.error}>{error}</p> }
    </div>
  )
}

export default ConfirmEmail