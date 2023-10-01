import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from './1689869872960.png';

function Header() {
  const location = useLocation();
  const isSelected = (path) => location.pathname === path;

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
      <Link to='/'>
        <div>
          <img className={styles.logo} src={logo} alt='logoCS' />
        </div>
      </Link>
    </header>
  );
}

export default Header;
