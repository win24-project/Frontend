import React, { useEffect, useState } from 'react'
import GymClassCard from '../GymClassCard/GymClassCard'
import AddGymClassModal from '../GymClassModals/AddGymClassModal'
import EditGymClassModal from '../GymClassModals/EditGymClassModal'
import { useAuth } from '../Context/AuthContext'
import styles from './GymClassList.module.css'

const GymClassList = () => {
  const [classes, setClasses] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const { userRole } = useAuth();

  const openEditModal = (gymClass) => {
    setSelectedClass(gymClass)
    setEditModalOpen(true)
  }

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
          classes.map(info => (<GymClassCard key={info.id} item={info} onGymClassChanged={getClass} onEdit={() => openEditModal(info)}/>))
          // classes.map((info, index) => {console.log(`klass #${index}:`, info); return (<GymClassCard key={info.id} item={info} onGymClassChanged={getClass}/>)} )
        }
      </div>
      <AddGymClassModal isOpen={isOpen} onClose={() => setIsOpen(false)} onGymClassAdded={getClass} />
      {editModalOpen && (
        <EditGymClassModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} onGymClassChanged={getClass} item={selectedClass} />
      )}
    </div>

  )
}

export default GymClassList