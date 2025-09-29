import React, { useState, useEffect } from 'react'
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from 'react-router';
import styles from './MembershipCard.module.css';

const CheckIcon = ({ size = 18, color = "#03c9e4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF6B35"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "8px" }}
  >
    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
    <path d="M9 12l2 2l4 -4" />
  </svg>
);

const MembershipCard = () => {
  const [flipped, setFlipped] = useState(null);
  const [memberships, setMemberships] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [ loading, setLoading ] = useState(false)
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMemberships = async () => {
      setLoading(true)
      try {
        const res = await fetch("https://group-project-authservice-ebbpd0c8g2fabqdr.swedencentral-01.azurewebsites.net/api/membership");
        const data = await res.json();
        setMemberships(data);
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch memberships", err);
        setLoading(false)
      }
    };
    fetchMemberships();
  }, []);

  const fetchDetails = async (id) => {
    try {
      setMessage(null);
      setError(null);

      const res = await fetch(
        `https://group-project-authservice-ebbpd0c8g2fabqdr.swedencentral-01.azurewebsites.net/api/membershipdetails/${id}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch details");
      }

      const data = await res.json();
      setSelectedDetails(data);

    } catch (err) {
      console.error("Failed to fetch details", err);
      setError("Details are not available right now.");
    }
  };


  const handleSelect = async (priceId) => {
    if(!isLoggedIn) {
      navigate('/login')
      return
    }
    try {
      const response = await fetch(
        `https://group-project-paymentservice-eyh8h2ewfqhvgddc.swedencentral-01.azurewebsites.net/api/CheckOut?priceId=${priceId}&mode=subscription`,
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
        setError("No checkout URL returned.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Failed to start checkout. Try again.");
    }
  };

  return (
    <div className={styles.membershipWrapper}>
      <h2>Choose your membership</h2>
      <p>You need to select a membership plan before you can continue using our platform</p>
      {loading && <p>Loding memberships...</p>}

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.success}>{message}</p>}

      <div className={styles.cardContainer}>
        {memberships.map((plan) => (
          <div
            key={plan.id}
            className={`${styles.card} ${flipped === plan.id ? styles.flipped : ""}`}
          >
            <div className={styles.cardInner}>
              {/* Front */}
              <div className={styles.front}>
                <h2>{plan.name}</h2>
                <p className={styles.price}>${plan.price} / month</p>
                {plan.name === "Basic" && (
                  <p className={styles.introText}> Kickstart your training with an affordable plan that keeps you motivated and moving forward.</p>
                )}
                {plan.name === "Standard" && (
                  <p className={styles.introText}>Unlock more possibilities, the ideal plan if you’re ready to push your limits and enjoy extra freedom.</p>
                )}
                {plan.name === "Premium" && (
                  <p className={styles.introText}>Experience the ultimate membership, full access, total flexibility, and a lifestyle upgrade that’s worth it.</p>
                )}
                <div className={styles.buttons}>
                  {plan.name === "Basic" && (
                    <button
                      className={styles.chooseBtn}
                      onClick={() => handleSelect("price_1SBYqpPZLXb0VQaIu5bHdpEW")}
                    >
                      Select
                    </button>
                  )}
                  {plan.name === "Standard" && (
                    <button
                      className={styles.chooseBtn}
                      onClick={() => handleSelect("price_1SBC2qPZLXb0VQaIKiKGmL61")}
                    >
                      Select
                    </button>
                  )}
                  {plan.name === "Premium" && (
                    <button
                      className={styles.chooseBtn}
                      onClick={() => handleSelect("price_1SBC34PZLXb0VQaIsVYINbGc")}
                    >
                      Select
                    </button>
                  )}
                  <button
                    onClick={() => {
                      fetchDetails(plan.id);
                      setFlipped(plan.id);
                    }}
                    className={styles.chooseBtn}
                  >
                    Details
                  </button>
                </div>
              </div>

              {/* Back */}
              <div className={styles.back}>
                <h2>{plan.name} Details</h2>
                <p className={styles.price}>${plan.price} / month</p>

                {selectedDetails && selectedDetails.id === plan.id ? (
                  <ul className={styles.benefits}>
                    {selectedDetails.benefits?.map((b, i) => (
                      <li key={i}>
                        <CheckIcon /> {b}
                      </li>
                    ))}
                  </ul>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <p>Loading details...</p>
                )}

                <button
                  onClick={() => setFlipped(null)}
                  className={styles.chooseBtn}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default MembershipCard