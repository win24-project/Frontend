import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hämta användarinfo & subscription (du kan ändra URL:erna enligt din backend)
    const fetchProfile = async () => {
      try {
        const userRes = await fetch('/api/user/profile'); // Exempel: /api/user/profile
        const subRes = await fetch('/api/user/subscription'); // Exempel: /api/user/subscription
        const userData = await userRes.json();
        const subData = await subRes.json();
        setUser(userData);
        setSubscription(subData);
      } catch (err) {
        console.error('Kunde inte hämta profil:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className={styles.loading}>Laddar profil...</div>;

  return (
    <div className={styles.profilePage}>
      <h1>Min profil</h1>

      {user && (
        <div className={styles.profileCard}>
          <h2>Dina uppgifter</h2>
          <p><strong>Namn:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>E-post:</strong> {user.email}</p>
          {user.phone && <p><strong>Telefon:</strong> {user.phone}</p>}
        </div>
      )}

      {subscription && (
        <div className={styles.subscriptionCard}>
          <h2>Medlemskap</h2>
          <p><strong>Typ:</strong> {subscription.type}</p>
          <p><strong>Startdatum:</strong> {new Date(subscription.startDate).toLocaleDateString()}</p>
          <p><strong>Giltigt till:</strong> {new Date(subscription.endDate).toLocaleDateString()}</p>
          <p className={`${styles.status} ${subscription.active ? styles.active : styles.inactive}`}>
            {subscription.active ? 'Aktivt medlemskap' : 'Ej aktivt'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
