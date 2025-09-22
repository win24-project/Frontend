import style from './GymClassCard.module.css'
import BookButton from '../BookButton/BookButton'

const GymClassCard = ({item}) => {
  return (
    <>
      <div className={style.card}>
          <div className={style.cardImage}></div>
          <div className={style.cardTitle}>{item.title}</div>
          <BookButton />
      </div>
    </>

  )
}

export default GymClassCard