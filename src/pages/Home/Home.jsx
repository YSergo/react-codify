import styles from './Home.module.scss';
import { useEffect, useRef, useState } from 'react';
import About from '../About/About';

function Home({ setDrawerOpened, setSelectedCardData, isMobile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.homePage}>
      <div className={styles.animateRequest}>
        <h1>Дизайн и разработка интерфейсов</h1>
        <button
          onClick={() => {
            setDrawerOpened(true);
            setSelectedCardData({});
          }}
        >
          Заказать проект
        </button>
      </div>

      <div className={styles.animateRequest}>
        <div className={styles.aboutPart}>
          <h1> О нас</h1>
          {isMobile && <About isOnHome={true} />}
        </div>
      </div>
    </main>
  );
}

export default Home;
