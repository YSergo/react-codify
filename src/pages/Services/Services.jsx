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

/*   Обработчик для установки данных из выбранной карточки */
  const handleCardClick = (data) => {
    setSelectedCardData(data);
  };

  const renderSkeletons = (count, width, height) => {
    return Array(count)
      .fill()
      .map((_, i) => (
        <ContentLoader
          key={i}
          speed={2}
          width={width}
          height={height}
          viewBox='0 0 446 226'
          backgroundColor='#f3f3f3'
          foregroundColor='white'
        >
          <rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
        </ContentLoader>
      ));
  };

  let content;
  if (favorsLoading) {
    switch (true) {
      case isMobile:
        content = renderSkeletons(8, '22.5rem', '12rem');
        break;
      case isTablet:
        content = renderSkeletons(6, 'calc(50% - 2.4vw)', '23vw');
        break;
      default:
        content = renderSkeletons(8, 446, 226);
    }
  } else {
    content = favors.map((item) => (
      <ServiceCard
        key={item.id}
        title={item.title}
        description={item.description}
        price={item.price}
        setDrawerOpened={setDrawerOpened}
        onCardClick={handleCardClick}
      />
    ));
  }

  const [servicesIsOrigin, setServicesIsOrigin] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{content}</div>
      <div className={styles.contacts}>
        <Contacts />
        <Request servicesIsOrigin={() => setServicesIsOrigin(servicesIsOrigin)} />
      </div>
    </div>
  );
}

export default Services;
