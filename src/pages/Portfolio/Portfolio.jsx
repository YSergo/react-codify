import Contacts from '../../components/Contacts/Contacts';
import Request from '../../components/Request/Request';
import styles from './Portfolio.module.scss';
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard';
import ContentLoader from 'react-content-loader';
import { useEffect } from 'react';

function Portfolio({ projects, projectsLoading, isMobile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 4; i++) {
      skeletons.push(
        <ContentLoader
          key={i}
          speed={2}
          width={443}
          height={554}
          viewBox='0 0 443 554'
          backgroundColor='#f3f3f3'
          foregroundColor='white'
        >
          <rect x='0' y='0' rx='0' ry='0' width='443' height='554' />
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
          height='31.4rem'
          viewBox='0 0 443 554'
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
        {projectsLoading
          ? isMobile
            ? renderMobileSkeletons()
            : renderSkeletons()
          : projects.map((item) => (
              <PortfolioCard
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.link}
                url={item.url_to_project}
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

export default Portfolio;
