import React from 'react'
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
  return (
    <div className={styles.membershipWrapper}>
      <h2>Choose your membership</h2>
      <p>You need to select a membership plan before you can continue using our platform</p>

      <div className={styles.cardContainer}>
        {/* Basic Plan */}
        <div className={styles.card}>
          <h2>Basic</h2>
          <p className={styles.price}>$ / month</p>
          <ul className={styles.benefits}>
            <li><CheckIcon />Access to gym equipment</li>
            <li><CheckIcon />1 free personal training session</li>
            <li><CheckIcon />Access during reception hours</li>
          </ul>
          <button className={styles.chooseBtn}>Select</button>
        </div>

        {/* Standard Plan */}
        <div className={styles.card}>
          <h2>Standard</h2>
          <p className={styles.price}>$ / month</p>
          <ul className={styles.benefits}>
            <li><CheckIcon />Everything in basic</li>
            <li><CheckIcon />Unlimited group classes</li>
            <li><CheckIcon />Free coffee & drinks</li>
          </ul>
          <button className={styles.chooseBtn}>Select</button>
        </div>

        {/* Premium Plan */}
        <div className={styles.card}>
          <h2>Premium</h2>
          <p className={styles.price}>$ / month</p>
          <ul className={styles.benefits}>
            <li><CheckIcon />Everything in standard</li>
            <li><CheckIcon />24/7 access</li>
            <li><CheckIcon />Personal workout plan</li>
          </ul>
          <button className={styles.chooseBtn}>Select</button>
        </div>
      </div>
    </div>
  )
}

export default MembershipCard