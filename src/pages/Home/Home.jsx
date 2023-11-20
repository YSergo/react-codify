import styles from './Home.module.scss';
import { useEffect, useRef, useState } from 'react';
import About from '../About/About';

function Home({ setDrawerOpened, setSelectedCardData, isMobile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const aboutElement = aboutRef.current;
    if (!aboutElement) return;

    const handleScroll = () => {
      const { top } = aboutElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (top < windowHeight) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      {isMobile && (
        <div className={`${styles.content} ${isVisible ? styles.animateRequest : ''}`}>
          <div ref={aboutRef} className={styles.aboutPart}>
            <h1> О нас</h1>
            <About isOnHome={true} />
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
