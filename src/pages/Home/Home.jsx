import { useEffect, useRef, useState } from 'react';
import About from '../About/About';
import Services from '../Services/Services';
import Portfolio from '../Portfolio/Portfolio';
import styles from './Home.module.scss';

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

  // Создаем ref и состояния видимости для каждого раздела
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);

  // Обработчик прокрутки
  const handleScroll = () => {
    const checkVisibility = (ref, setVisible) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight;
        setVisible(isVisible);
      }
    };

    checkVisibility(aboutRef, setIsAboutVisible);
    checkVisibility(servicesRef, setIsServicesVisible);
    checkVisibility(portfolioRef, setIsPortfolioVisible);
  };

  // Подписываемся на событие прокрутки и проверяем видимость при инициализации
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Проверить видимость при инициализации

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className={styles.homePage}>
      <div className={styles.animateRequest}>
        <h1>Дизайн и разработка интерфейсов</h1>
        <button className={styles.orderButtonHome}
          onClick={() => {
            setDrawerOpened(true);
            setSelectedCardData({});
          }}
        >
          Заказать проект
        </button>
      </div>

      {isMobile && (
        <div>
          <div
            ref={aboutRef}
            className={`${styles.aboutPart} ${isAboutVisible ? styles.animateRequest : ''}`}
          >
            <h1>О нас</h1>
            <About isOnHome={true} />
          </div>

          <div
            ref={servicesRef}
            className={`${styles.servicesPart} ${isServicesVisible ? styles.animateRequest : ''}`}
          >
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

          <div
            ref={portfolioRef}
            className={`${styles.portfolioPart} ${isPortfolioVisible ? styles.animateRequest : ''}`}
          >
            <h1>Портфолио</h1>
            <Portfolio projects={projects} projectsLoading={projectsLoading} isOnHome={true} />
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
