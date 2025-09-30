import React, { useEffect, useState } from 'react'
import GymClassCard from '../GymClassCard/GymClassCard'
import AddGymClassModal from '../GymClassModals/AddGymClassModal'
import { useAuth } from '../Context/AuthContext'
import styles from './GymClassList.module.css'

const GymClassList = () => {
  const [classes, setClasses] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const { userRole } = useAuth();

  const getClass = async () => {
    const res = await fetch("https://group-project-gymclassservice-dfbzd5dza7cxdnd6.swedencentral-01.azurewebsites.net/api/get-all")

    if (res.ok) {
      const response = await res.json()
      // setClasses(Array.isArray(response) ? response : response.result ?? [])
      setClasses(response.result)
    }
  }

  useEffect(() => {
    getClass()
   }, [])

  return (
    <div className={styles.container}>
      <div className={styles.flex1}>
        <h2 className={styles.heading}>Available Gym Classes</h2>
        {userRole === "Admin" && (<button className={styles.addButton} type="button" onClick={() => setIsOpen(!isOpen)}><span>Add Gym Class</span></button>) }
        
      </div>

      <div className={styles.cardGrid}>
        {
          classes.map(info => (<GymClassCard key={info.id} item={info} />))
        }
      </div>
      <AddGymClassModal isOpen={isOpen} onClose={() => setIsOpen(false)} onGymClassAdded={getClass} />
    </div>

  )
}

export default GymClassList