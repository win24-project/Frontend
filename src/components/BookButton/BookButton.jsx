import {useState} from "react";
import { useNavigate  } from "react-router";
import styles from "./BookButton.module.css";

export default function BookButton({ gymClassId }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleBooking( gymClassId) {
        setLoading(true);
        setMessage(null);
        setError(null);

        if(!gymClassId) {
            setLoading(false)
            return
        }

        const accessToken = localStorage.getItem('token')
        if(!accessToken) {
            setLoading(false)
            navigate('/login')
            return 
        }

        try {
            const response = await fetch(`https://group-project-bookingservice-f9bdbnftb0c6g2aa.swedencentral-01.azurewebsites.net/api/UserBooking`, 
                { method: "POST", 
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    gymClassId: gymClassId
                  })
                });
            if(response.status === 401 ||  response.status === 403) {
                navigate('/login') 
                return
            }
            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();
            const text = data.message ?? "Booking successful!";
            setMessage(`${text}`);
        } catch (err) {
            setError(err.message || "An error occurred during booking.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.bookButtonContainer}>
            <button className={styles.bookButton} onClick={() => handleBooking(gymClassId)} disabled={loading}> <span>{loading ? "Booking..." : "Book"}</span></button>
            {message && <div>{message}</div>}
            {error && <div>{error}</div>}
        </div>
    );
}
            