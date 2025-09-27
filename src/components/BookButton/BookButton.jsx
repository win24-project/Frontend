import React, {useState} from "react";
import styles from "./BookButton.module.css";


export default function BookButton() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    async function handleBooking() {
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch("https://group-project-bookingservice-f9bdbnftb0c6g2aa.swedencentral-01.azurewebsites.net/api/UserBooking", { method: "POST" });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            const bookingId = data.bookingId ?? data.BookingId ?? data.id ?? data.Id;
            const text = data.message ?? data.Message ?? "Booking successful!";

            setMessage(`${text}`);
        } catch (err) {
            setError(err.message || "An error occurred during booking.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles["book-button-container"]}>
            <button className={styles["book-button"]} onClick={handleBooking} disabled={loading}> <span>{loading ? "Booking..." : "Book"}</span></button>
            {message && <div>{message}</div>}
            {error && <div>{error}</div>}
        </div>
    );
}
            