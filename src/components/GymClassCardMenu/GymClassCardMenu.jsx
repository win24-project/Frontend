import React from 'react'
import { useState, useRef } from 'react'
import { useAuth } from '../Context/AuthContext'
import useClickOutsideElement from "../../hooks/useClickOutsideElement";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import style from './GymClassCardMenu.module.css'


const GymClassCardMenu = ({item, onGymClassChanged, onEdit}) => {

  const [open, setOpen ] = useState(false)
  // const [isOpen, setIsOpen] = useState(false)
  // const [classes, setClasses] = useState([])
  const { userRole } = useAuth();
  const menuContainerRef = useRef(null)
  useClickOutsideElement(menuContainerRef, ClickOutSideOfBurgerMenuCallBack)

  const token = localStorage.getItem("token");
  if (!token) {
      // alert("No token found. Please log in as Admin.");
      return;
  }

  // const getClass = async () => {
  //   const res = await fetch("https://group-project-gymclassservice-dfbzd5dza7cxdnd6.swedencentral-01.azurewebsites.net/api/get-all")

  //   if (res.ok) {
  //     const response = await res.json()
  //     // setClasses(Array.isArray(response) ? response : response.result ?? [])
  //     setClasses(response.result)
  //   }
  // }

  const deleteClass = async (id) => {
    const res = await fetch(`https://group-project-gymclassservice-dfbzd5dza7cxdnd6.swedencentral-01.azurewebsites.net/api/delete/${id}`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
      })
    
    if (res.ok) {
      alert("Class has been deleted")
      onGymClassChanged()
    }

  }

  function ClickOutSideOfBurgerMenuCallBack() {
    setOpen(false)
  }

  return (
    <>
      <div className={style.cardMenu} ref={menuContainerRef}>
        {userRole === "Admin" && (<FontAwesomeIcon icon={faEllipsis} className={style.dots} onClick={() => setOpen(true)} />) }
        { open && <nav className={style.cardMenuNav}>
          <a className={`${style.link1} ${style.link}`} onClick={() => { onEdit(); setOpen(false); }}>Edit</a>
          <div className={style.horizontalDivider}></div>
          <a className={`${style.link2} ${style.link}`} onClick={() => deleteClass(item.id)}>Delete</a>
        </nav> }
      </div>
    </>

  )
}

export default GymClassCardMenu