import styles from './SubscriptionSuccess.module.css'

function SubscriptionSuccess() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Membership added successfully!</h1>
        <p className={styles.message}>
          Thank you for being a member. Your payment was successful.
        </p>
        <button className={styles.button} onClick={() => window.location.href = "/"}>
          Go to Home
        </button>
      </div>
    </div>
  )
}

export default SubscriptionSuccess