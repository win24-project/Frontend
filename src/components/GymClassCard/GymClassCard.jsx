import style from './GymClassCard.module.css'
import BookButton from '../BookButton/BookButton'

const GymClassCard = ({item}) => {

  const formatEventDate = (isoDateString) => {
    const date = new Date(isoDateString)

    const datePart = new Intl.DateTimeFormat("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date)

    const timePart = new Intl.DateTimeFormat("sv-SE", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false
    }).format(date)

    return `${datePart} - ${timePart}`;
  } 

  return (
    <>
      <div className={style.card}>
          <div className={style.cardImage}></div>
          <h2 className={style.cardTitle}>{item.title}</h2>
          <div className={style.cardFlex}>
            <div className={style.cardDate}>{formatEventDate(item.date)}</div>
            <div className={style.cardLocation}>Plats: {item.location}</div>
          </div>
          <p className={style.cardDescription}>{item.description}</p>
          <BookButton />
      </div>
    </>

  )
}

export default GymClassCard