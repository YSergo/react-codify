import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
  const [language, setLanguage] = useState('0');
  const [animation, setAnimation] = useState('');
  const [svgAnimation, setSvgAnimation] = useState('');

  const location = useLocation();
  const isSelected = (path) => location.pathname === path;

  const switchLanguage = () => {
    setAnimation('blur-out');
    setSvgAnimation('move-down');

    setTimeout(() => {
      setLanguage((prevLanguage) => (prevLanguage === '0' ? '1' : '0'));
      setAnimation('blur-in');
    }, 300);

    setTimeout(() => {
      setSvgAnimation('move-up');
    }, 600);

    setTimeout(() => {
      setAnimation('');
      setSvgAnimation('');
    }, 1200);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.headerLeft}>
        <Link to='/'>
          <button>
            Codify
            <svg width='3' height='3' viewBox='0 0 3 3' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='1.5' cy='1.5' r='1.5' fill='black' />
            </svg>
            Software
          </button>
        </Link>
      </nav>

      <nav className={styles.headerCenter}>
        <Link to='/about'>
          <button className={isSelected('/about') ? styles.selected : ''}>
            <span>О нас</span>
          </button>
        </Link>

        <Link to='/services'>
          <button className={isSelected('/services') ? styles.selected : ''}>
            <span>Услуги</span>
          </button>
        </Link>

        <Link to='/portfolio'>
          <button className={isSelected('/portfolio') ? styles.selected : ''}>
            <span>Портфолио</span>
          </button>
        </Link>
      </nav>
      <nav className={styles.headerRight}>
        <button onClick={switchLanguage} className={`${styles[animation]} ${styles[svgAnimation]}`}>
          <p>{language}</p>
          <svg width='15' height='8' viewBox='0 0 15 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M14 1L7.5 7L1 1' stroke='black' strokeLinecap='square' />
          </svg>
        </button>
      </nav>
    </header>
  );
}

export default Header;
