import styles from './Services.module.scss';
import Contacts from '../../components/Contacts/Contacts';
import Request from '../../components/Request/Request';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import ContentLoader from 'react-content-loader';
import { useEffect, useState } from 'react';

function Services({ setDrawerOpened, favors, favorsLoading, isMobile, setSelectedCardData, isTablet }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 8; i++) {
      skeletons.push(
        <ContentLoader
          key={i}
          speed={2}
          width={446}
          height={226}
          viewBox='0 0 446 226'
          backgroundColor='#f3f3f3'
          foregroundColor='white'
        >
          <rect x='0' y='0' rx='0' ry='0' width='446' height='226' />
        </ContentLoader>
      );
    }
    return skeletons;
  };

  const renderMobileSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 8; i++) {
      skeletons.push(
        <ContentLoader
          key={i}
          speed={2}
          width='22.5rem'
          height='12rem'
          viewBox='0 0 446 226'
          backgroundColor='#f3f3f3'
          foregroundColor='white'
        >
          <rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
        </ContentLoader>
      );
    }
    return skeletons;
  };

  const renderTabletSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 6; i++) {
      skeletons.push(
        <ContentLoader
          key={i}
          speed={2}
          width='calc(50% - 2.4vw)'
          height='23vw'
          viewBox='0 0 446 226'
          backgroundColor='#f3f3f3'
          foregroundColor='white'
        >
          <rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
        </ContentLoader>
      );
    }
    return skeletons;
  };

  const [servicesIsOrigin, setServicesIsOrigin] = useState(true);

  // Обработчик для установки данных из выбранной карточки
  const handleCardClick = (data) => {
    setSelectedCardData(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {favorsLoading
          ? isMobile
            ? renderMobileSkeletons()
            : isTablet
            ? renderTabletSkeletons()
            : renderSkeletons()
          : favors.map((item) => (
              <ServiceCard
                key={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                setDrawerOpened={setDrawerOpened}
                onCardClick={handleCardClick}
              />
            ))}
      </div>
      <div className={styles.contacts}>
        <Contacts />
        <Request servicesIsOrigin={() => setServicesIsOrigin(servicesIsOrigin)} />
      </div>
    </div>
  );
}

export default Services;
