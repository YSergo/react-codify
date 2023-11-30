import styles from './MobileMenu.module.scss';
import { Link, useLocation } from 'react-router-dom';
// import { handlePhoneClick, handleTelegramClick, handleEmailClick } from '../../utils/contactHelpers';
import { useEffect } from 'react';

function MobileMenu({ onClose, setDrawerOpened, setOrigin, setOpenedFromMenu }) {
  const location = useLocation();
  const isSelected = (path) => location.pathname === path;

  //fixing non-existing landscape look with closing drawer
  useEffect(() => {
    const landscapeQuery = window.matchMedia('(orientation: landscape)');

    const checkOrientation = (e) => {
      if (e.matches) {
        // Если ориентация ландшафтная
        setDrawerOpened(false);
      }
    };

    landscapeQuery.addListener(checkOrientation);

    // Проверка при инициализации
    if (landscapeQuery.matches) {
      setDrawerOpened(false);
    }

    // Удаляем слушатель при размонтировании компонента
    return () => {
      landscapeQuery.removeListener(checkOrientation);
    };
  }, [setDrawerOpened]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <nav className={styles.headerLeft}>
          <Link to='/'>
            <button onClick={onClose}>
              Codify
              <svg width='3' height='3' viewBox='0 0 3 3' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='1.5' cy='1.5' r='1.5' fill='black' />
              </svg>
              Software
            </button>
          </Link>
        </nav>
        <svg
          className={styles.headerRight}
          onClick={onClose}
          viewBox='0 0 28 28'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M26 2L2 26' stroke='black' strokeWidth='2' />
          <path d='M2 2L26 26' stroke='black' strokeWidth='2' />
        </svg>
      </div>
      <div className={styles.content}>
        <nav className={styles.menu}>
          <Link to='/about'>
            <button onClick={onClose} className={isSelected('/about') ? styles.selected : ''}>
              <span>О нас</span>
            </button>
          </Link>

          <Link to='/services'>
            <button onClick={onClose} className={isSelected('/services') ? styles.selected : ''}>
              <span>Услуги</span>
            </button>
          </Link>

          <Link to='/portfolio'>
            <button onClick={onClose} className={isSelected('/portfolio') ? styles.selected : ''}>
              <span>Портфолио</span>
            </button>
          </Link>
        </nav>
        <div className={styles.positionBottom}>
          <button
            onClick={() => {
              setOrigin('request');
              setDrawerOpened(true);
              setOpenedFromMenu(true);
            }}
            className={styles.orderButton}
          >
            Заказать проект
          </button>
          {/* <footer className={styles.footer}>
            <ul>
              <li onClick={handlePhoneClick}>+995 (55) 100-64-22</li>
              <li onClick={handleTelegramClick}>@YSergo</li>
              <li onClick={handleEmailClick}>iakunchikhin@gmail.com</li>
            </ul>
          </footer> */}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
