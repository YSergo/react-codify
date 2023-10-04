import Contacts from '../../components/Contacts/Contacts';
import Request from '../../components/Request/Request';
import styles from './Portfolio.module.scss';
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard';
import ContentLoader from 'react-content-loader';
import { useEffect } from 'react';

function Portfolio({ projects, projectsLoading, isMobile, isTablet }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderSkeletons = (count, width, height) => {
    return Array(count)
      .fill()
      .map((_, i) => (
        <ContentLoader
          key={i}
          speed={2}
          width={width}
          height={height}
          viewBox='0 0 443 554'
          backgroundColor='#f3f3f3'
          foregroundColor='white'
        >
          <rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
        </ContentLoader>
      ));
  };

  let content;
  if (projectsLoading) {
    switch (true) {
      case isMobile:
        content = renderSkeletons(8, '22.5rem', '31.4rem');
        break;
      case isTablet:
        content = renderSkeletons(4, 'calc(50% - 2.4vw)', '54vw');
        break;
      default:
        content = renderSkeletons(4, 443, 554);
    }
  } else {
    content = projects.map((item) => (
      <PortfolioCard
        key={item.id}
        title={item.title}
        description={item.description}
        image={item.image_url}
        url={item.url_to_project}
      />
    ));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{content}</div>
      <div className={styles.contacts}>
        <Contacts />
        <Request isFromPortfolioPage={true} />
      </div>
    </div>
  );
}

export default Portfolio;
