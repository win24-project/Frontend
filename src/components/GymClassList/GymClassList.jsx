import React, { useEffect, useState } from 'react'
import GymClassCard from '../GymClassCard/GymClassCard'
import styles from './GymClassList.module.css'

const GymClassList = () => {
  const [classes, setClasses] = useState([])

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
    <>
      <h2 className={styles.heading}>Available Gym Classes</h2>
      <div className={styles.cardGrid}>
        {
          classes.map(info => (<GymClassCard key={info.id} item={info} />))
        }
      </div>
    </>

  )
}

export default GymClassList