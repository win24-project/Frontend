import React, { useState, useEffect } from 'react'
import styles from './EditGymClassModal.module.css'

const EditGymClassModal = ({isOpen, onClose, onGymClassChanged, item}) => {

    // const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [dateAndTime, setDateAndTime] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [instructor, setInstructor] = useState("");
    const [maxNumberOfParticipants, setNumberOfParticipants] = useState("");

    const formatDate = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    useEffect(() => {

    const fetchGymClassDetails = async () => {

        try {
          const response = await fetch(`https://group-project-gymclassservice-dfbzd5dza7cxdnd6.swedencentral-01.azurewebsites.net/api/get/${item.id}`);

            if (response.ok) {
                const data = await response.json();
                const gymClass = data.result;
                setTitle(gymClass.title);
                setDateAndTime(formatDate(gymClass.date));
                setLocation(gymClass.location);
                setDescription(gymClass.description);
                setInstructor(gymClass.instructor);
                setNumberOfParticipants(gymClass.maxNumOfParticipants);

            }
            else {
                console.error("Failed to fetch gym class details");
            }
        }
        catch (error) {
            console.error("Error editing gym class details:", error);
        }
    }

    fetchGymClassDetails();
  }, [item])

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
            // alert("No token found. Please log in as Admin.");
            return;
        }
        const editGymClass = {
            id: item.id,
            title: title,
            description: description,
            date: dateAndTime,
            location: location,
            instructor: instructor,
            maxNumOfParticipants: parseInt(maxNumberOfParticipants)
        };

        try {
            
            const response = await fetch("https://group-project-gymclassservice-dfbzd5dza7cxdnd6.swedencentral-01.azurewebsites.net/api/edit", 
                {
                method: "POST",
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(editGymClass)
                }
            );

            if (response.ok) {
                // await response.json();

                // setTitle("");
                // setDateAndTime("");
                // setLocation("");
                // setDescription("");
                // setInstructor("");
                // setNumberOfParticipants("");
                alert("Class has been edited")
                onClose();
                onGymClassChanged();


            }
            else {
                const errorMessage = await response.text();
                console.error("Failed to create gym class:", response.status, errorMessage);
                alert("Failed to create gym class");
                console.log("Sending data:", editGymClass);
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
                            <h2>Edit gym class</h2>
                        </div>

                        <input type="hidden" value={item.id} ></input>
    
                        <div className={styles.formGroup}>
                            <label>Title</label>
                            <div className={styles.fieldGroup}>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                                <span></span>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Date and Time</label>
                            <div className={styles.fieldGroup}>
                                <input type="datetime-local" value={dateAndTime} onChange={(e) => setDateAndTime(e.target.value)}/>
                                <span></span>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Location</label>
                            <div className={styles.fieldGroup}>
                                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                                <span></span>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Description</label>
                            <div className={styles.fieldGroup}>
                                <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                                <span></span>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Instructor</label>
                            <div className={styles.fieldGroup}>
                                <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)}/>
                                <span></span>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Max Number of Participants</label>
                            <div className={styles.fieldGroup}>
                                <input type="number" value={maxNumberOfParticipants} onChange={(e) => setNumberOfParticipants(e.target.value)}/>
                                <span></span>
                            </div>
                        </div>
                        <button className={styles.addButton} type="submit"><span>Confirm Changes</span></button>
                    </form>
                </div>
            </div>
        </>
  )
}

export default EditGymClassModal