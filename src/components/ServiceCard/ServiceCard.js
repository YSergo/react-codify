import styles from './ServiceCard.module.scss';
import React, { useEffect, useRef, useState } from 'react';

function ServiceCard({ setDrawerOpened, title, description, price, onCardClick }) {
  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef();

  const checkIfInView = () => {
    const rect = cardRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementMiddle = rect.top + rect.height / 2;
    const isInView = elementMiddle >= windowHeight * 0.25 && elementMiddle <= windowHeight * 0.75;
    setIsInView(isInView);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Проверить при монтировании

    return () => {
      window.removeEventListener('scroll', checkIfInView);
    };
  }, []);

  return (
    <div
      className={`${styles.card} ${isInView ? styles.inView : ''}`}
      ref={cardRef}
      onClick={() => {
        setDrawerOpened(true);
        onCardClick({ title, description, price });
      }}
    >
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
