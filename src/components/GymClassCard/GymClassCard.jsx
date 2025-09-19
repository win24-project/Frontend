import style from './GymClassCard.module.css'

const GymClassCard = ({item}) => {
  return (
    <>
      <div className={style.card}>
          <div className={style.cardImage}></div>
          <div className={style.cardTitle}>{item.title}</div>
      </div>
    </>

  )
}

export default GymClassCard