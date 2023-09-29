import styles from './PortfolioCard.module.scss';
import React, { useEffect, useRef, useState } from 'react';

function PortfolioCard({ title, description, image, url }) {
  const handleClick = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  const isProjectAvailable = url !== null;
  const buttonText = isProjectAvailable ? 'Смотреть проект' : 'В разработке';

  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef();

  const checkIfInView = () => {
    const rect = cardRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementMiddle = rect.top + rect.height / 2;
    const isInView = elementMiddle >= windowHeight * 0.1 && elementMiddle <= windowHeight * 0.9;
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
    <div ref={cardRef} className={`${styles.card} ${isInView ? styles.inView : ''}`}>
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

export default PortfolioCard;
