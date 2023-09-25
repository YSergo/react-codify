import styles from './ServiceCard.module.scss';

function ServiceCard({ setDrawerOpened, title, description, price }) {
  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  return (
    <div onClick={() => setDrawerOpened(true)} className={styles.card}>
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>{description}</p>
        <span>от {numberWithSpaces(price)}₽</span>
      </div>
      <svg width='201' height='226' viewBox='-13 0 201 226' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path className={styles.hoverfill} d='M50.5 0H201V226H3L135 72.32L50.5 0Z' fill='#D6E9FF' />
        <path d='M49 -1L135.5 72.5L1.5 227.5' stroke='#242424' strokeWidth='3' />
      </svg>
    </div>
  );
}
export default ServiceCard;
