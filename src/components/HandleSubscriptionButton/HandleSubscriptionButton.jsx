import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import styles from './HandleSubscriptionButton.module.css'

function HandleSubscriptionButton() {
    const [error, setError ] = useState("")
  const {isLoggedIn, hasInitPayment } = useAuth()
  const navigate = useNavigate()

  const handleGoToHandleSubscriptionStripe = async () => {
    if(!isLoggedIn) {
      navigate('/login')
      return
    }
    if(!hasInitPayment) {
        navigate('/membership')
        return
    }
    try {
      const response = await fetch(
        "https://group-project-paymentservice-eyh8h2ewfqhvgddc.swedencentral-01.azurewebsites.net/api/Billing/portal",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

        if (!response.ok) {
          throw new Error(`Checkout failed: ${response.status}`);
        }

        const data = await response.json();
        if (data?.url) {
          window.location.href = data.url;
        } else {
          setError("No handle billing URL returned.");
        }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Failed to start go to handle subscription page. Try again.");
    }
  } 

  return (
    <div className={styles.container}>
      <button className={styles.confirmButton} onClick={handleGoToHandleSubscriptionStripe}>Ändra Prenumation</button>
      {error && <p className={styles.error}>{error}</p> }
    </div>
    
  )
}

export default HandleSubscriptionButton