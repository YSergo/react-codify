import styles from './Home.module.scss';
import { useEffect, useRef, useState } from 'react';
import About from '../About/About';
import Services from '../Services/Services';
import Portfolio from '../Portfolio/Portfolio';

function Home({
  setDrawerOpened,
  setSelectedCardData,
  isMobile,
  isTablet,
  favors,
  favorsLoading,
  projects,
  projectsLoading,
}) {
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
        <div
          ref={aboutRef}
          className={`${styles.content} ${isVisible ? styles.visible : ''} ${
            isVisible ? styles.animateRequest : ''
          }`}
        >
          <div className={styles.aboutPart}>
            <h1>О нас</h1>
            <About isOnHome={true} />
          </div>
          <div className={styles.servicesPart}>
            <h1>Услуги</h1>
            <Services
              setDrawerOpened={setDrawerOpened}
              favors={favors}
              favorsLoading={favorsLoading}
              isMobile={isMobile}
              setSelectedCardData={setSelectedCardData}
              isTablet={isTablet}
              isOnHome={true}
            />
          </div>
          <div className={styles.portfolioPart}>
            <h1>Порфтолио</h1>
            <Portfolio projects={projects} projectsLoading={projectsLoading} isOnHome={true} />
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
