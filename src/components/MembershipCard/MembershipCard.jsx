import React, { useState } from 'react'
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
  return (
    <div className={styles.membershipWrapper}>
      <h2>Choose your membership</h2>
      <p>You need to select a membership plan before you can continue using our platform</p>

      <div className={styles.cardContainer}>
        {/* Basic Plan */}
        <div className={`${styles.card} ${flipped === "basic" ? styles.flipped : ""}`}>
          <div className={styles.cardInner}>
            <div className={styles.front}>
              <h2>Basic</h2>
              <p className={styles.price}>$19 / month</p>
              <p className={styles.introText}>Perfect if you want an affordable option with access to your favorite gym. Includes gym equipment and group classes.</p>
              <div className={styles.buttons}>
                <button className={styles.chooseBtn}>Select</button>
                <button onClick={() => setFlipped("basic")} className={styles.chooseBtn}>Details</button>
              </div>
            </div>
            <div className={styles.back}>
              <h2>Basic</h2>
              <p className={styles.price}>$19 / month</p>
              <ul className={styles.benefits}>
                <li><CheckIcon />Gym access during staffed hours</li>
                <li><CheckIcon />1 free personal training session at signup</li>
                <li><CheckIcon />Access to locker rooms & showers</li>
              </ul>
              <button onClick={() => setFlipped(null)} className={styles.chooseBtn}>Back</button>
            </div>
          </div>
        </div>

        {/* Standard Plan */}
        <div className={`${styles.card} ${flipped === "standard" ? styles.flipped : ""}`}>
          <div className={styles.cardInner}>
            <div className={styles.front}>
              <h2>Standard</h2>
              <p className={styles.price}>$29 / month</p>
              <p className={styles.introText}>Ideal for those who want more variety and flexibility. Includes unlimited classes, extra perks, and social activities.</p>
              <div className={styles.buttons}>
                <button className={styles.chooseBtn}>Select</button>
                <button onClick={() => setFlipped("standard")} className={styles.chooseBtn}>Details</button>
              </div>
            </div>
            <div className={styles.back}>
              <h2>Standard</h2>
              <p className={styles.price}>$29 / month</p>
              <ul className={styles.benefits}>
                <li><CheckIcon />Everything in basic</li>
                <li><CheckIcon />1 group class per week included</li>
                <li><CheckIcon />Discounts on drinks & snacks at the reception</li>
                <li><CheckIcon />2 discounted PT sessions per month</li>
              </ul>
              <button onClick={() => setFlipped(null)} className={styles.chooseBtn}>Back</button>
            </div>
          </div>
        </div>

        {/* Premium Plan */}
        <div className={`${styles.card} ${flipped === "premium" ? styles.flipped : ""}`}>
          <div className={styles.cardInner}>
            <div className={styles.front}>
              <h2>Premium</h2>
              <p className={styles.price}>$39 / month</p>
              <p className={styles.introText}>The full experience for the dedicated. 24/7 gym access, personal workout plans, and exclusive benefits tailored to your goals.</p>
              <div className={styles.buttons}>
                <button className={styles.chooseBtn}>Select</button>
                <button onClick={() => setFlipped("premium")} className={styles.chooseBtn}>Details</button>
              </div>
            </div>
            <div className={styles.back}>
              <h2>Premium</h2>
              <p className={styles.price}>$39 / month</p>
              <ul className={styles.benefits}>
                <li><CheckIcon />Everything in standard</li>
                <li><CheckIcon />24/7 gym access</li>
                <li><CheckIcon />Free coffee, tea & sports drinks</li>
                <li><CheckIcon />2 free PT sessions per month</li>
              </ul>
              <button onClick={() => setFlipped(null)} className={styles.chooseBtn}>Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MembershipCard