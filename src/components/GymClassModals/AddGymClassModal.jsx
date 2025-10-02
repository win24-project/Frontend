import React, { useState } from 'react'
import styles from './AddGymClassModal.module.css'

const GymClassModal = ({isOpen, onClose, onGymClassAdded}) => {

    const [title, setTitle] = useState("");
    const [dateAndTime, setDateAndTime] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [instructor, setInstructor] = useState("");
    const [maxNumberOfParticipants, setNumberOfParticipants] = useState("");
    const [error, setError] = useState({});

    if (!isOpen) return null;

    const validateFields = () => {

        const newError = {}

        if (!title) {
            newError.title = "Title is required";
        }
        if (!dateAndTime) {
            newError.dateAndTime = "Date and Time is required";
        }
        if (!location) {
            newError.location = "Location is required";
        }
        if (!description) {
            newError.description = "Description is required";
        }
        if (!instructor) {
            newError.instructor = "Instructor is required";
        }
        if (!maxNumberOfParticipants) {
            newError.maxNumberOfParticipants = "Max Number of Participants is required";
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            // alert("No token found. Please log in as Admin.");
            return;
        }
        if (!validateFields()) {
            return;
        }
        const newGymClass = {
            title: title,
            description: description,
            date: new Date(dateAndTime).toISOString(),
            location: location,
            instructor: instructor,
            maxNumOfParticipants: parseInt(maxNumberOfParticipants)
        };

        try {
            
            const response = await fetch("https://group-project-gymclassservice-dfbzd5dza7cxdnd6.swedencentral-01.azurewebsites.net/api/create", 
                {
                method: "POST",
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(newGymClass)
                }
            );

            if (response.ok) {
                // await response.json();
                setTitle("");
                setDateAndTime("");
                setLocation("");
                setDescription("");
                setInstructor("");
                setNumberOfParticipants("");
                alert("Class has been created successfully");
                onClose();
                onGymClassAdded();
            }
            else {
                const errorMessage = await response.text();
                console.error("Failed to create gym class:", response.status, errorMessage);
                alert("Failed to create gym class");
                console.log("Sending data:", newGymClass);
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

  return (
    <>
        <div className={styles.modal}>
            <div className={styles.modalContent}>

                <button className={styles.btnClose} onClick={onClose}>X</button>

                <form onSubmit={handleSubmit}>

                    <div className={styles.modalHeader}>
                        <h2>Create new gym class</h2>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Title</label>
                        <div className={styles.fieldGroup}>
                            <input type="text" className={error.title ? styles.errorFieldInput : undefined} value={title} onChange={(e) => setTitle(e.target.value)} />
                            {error.title && (<span className={styles.errorField}>{error.title}</span>)}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Date and Time</label>
                        <div className={styles.fieldGroup}>
                            <input type="datetime-local" className={error.dateAndTime ? styles.errorFieldInput : undefined} value={dateAndTime} onChange={(e) => setDateAndTime(e.target.value)} />
                            {error.dateAndTime && (<span className={styles.errorField}>{error.dateAndTime}</span>)}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Location</label>
                        <div className={styles.fieldGroup}>
                            <input type="text" className={error.location ? styles.errorFieldInput : undefined} value={location} onChange={(e) => setLocation(e.target.value)} />
                            {error.location && (<span className={styles.errorField}>{error.location}</span>)}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <div className={styles.fieldGroup}>
                            <textarea type="text" className={error.description ? styles.errorFieldInput : undefined} value={description} onChange={(e) => setDescription(e.target.value)} />
                            {error.description && (<span className={styles.errorField}>{error.description}</span>)}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Instructor</label>
                        <div className={styles.fieldGroup}>
                            <input type="text" className={error.instructor ? styles.errorFieldInput : undefined} value={instructor} onChange={(e) => setInstructor(e.target.value)} />
                            {error.instructor && (<span className={styles.errorField}>{error.instructor}</span>)}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Max Number of Participants</label>
                        <div className={styles.fieldGroup}>
                            <input type="number" className={error.maxNumberOfParticipants ? styles.errorFieldInput : undefined} value={maxNumberOfParticipants} onChange={(e) => setNumberOfParticipants(e.target.value)} />
                            {error.maxNumberOfParticipants && (<span className={styles.errorField}>{error.maxNumberOfParticipants}</span>)}
                        </div>
                    </div>
                    <button className={styles.addButton} type="submit"><span>Create Gym Class</span></button>
                </form>
            </div>
        </div>
    </>
  )
}

export default GymClassModal