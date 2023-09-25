import styles from './PortfolioCard.module.scss';

function PorfolioCard({ title, description, image, url }) {
  const handleClick = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  const isProjectAvailable = url !== null;
  const buttonText = isProjectAvailable ? 'Смотреть проект' : 'В разработке';

  return (
    <div className={styles.card}>
      <img src={image} alt='site' />
      <h1>{title}</h1>
      <span>{description}</span>
      <button onClick={() => handleClick(url)} disabled={!isProjectAvailable}>
        {buttonText}
        {isProjectAvailable ? (
          <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='28' height='28' fill='#C8EFDA' />
            <path d='M5.81836 14L20.3638 14' stroke='black' strokeWidth='3' strokeLinecap='square' />
            <path d='M12.1816 6H15.6833L23.9998 14L15.6833 22H12.1816L20.4981 14L12.1816 6Z' fill='black' />
          </svg>
        ) : null}
      </button>
    </div>
  );
}

export default PorfolioCard;
