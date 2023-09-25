import styles from './Services.module.scss';
import Contacts from '../../components/Contacts/Contacts';
import Request from '../../components/Request/Request';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import ContentLoader from 'react-content-loader';
import { useEffect } from 'react';

function Services({ setDrawerOpened, favors, favorsLoading, isMobile }) {
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {favorsLoading
          ? isMobile
            ? renderMobileSkeletons()
            : renderSkeletons()
          : favors.map((item) => (
              <ServiceCard
                key={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                setDrawerOpened={setDrawerOpened}
              />
            ))}
      </div>
      <div className={styles.contacts}>
        <Contacts />
        <Request />
      </div>
    </div>
  );
}

export default Services;
