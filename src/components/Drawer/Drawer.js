import { useEffect } from 'react';
import styles from './Drawer.module.scss';
import Request from '../Request/Request';
import MobileMenu from '../../pages/MobileMenu/MobileMenu';

function Drawer({
  onClose,
  drawerOpened,
  origin,
  setDrawerOpened,
  setOrigin,
  setOpenedFromMenu,
  openedFromMenu,
  selectedCardData
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (drawerOpened) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawerOpened, onClose]);

  return (
    <div onClick={onClose} className={`${styles.overlay} ${drawerOpened ? styles.visible : ''}`}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={`${styles.drawer} ${drawerOpened ? styles.opened : ''}`}
      >
        {origin !== 'HeaderMobile' ? (
          <div className={styles.animateRequest} key={drawerOpened ? 'request' : 'request-closed'}>
            <Request
              onClose={() => {
                if (openedFromMenu) {
                  setOrigin('HeaderMobile');
                  setOpenedFromMenu(false);
                } else {
                  onClose();
                }
              }}
              showCloseButton={true}
              selectedCardData={selectedCardData} 
            />
          </div>
        ) : (
          <MobileMenu
            setOpenedFromMenu={setOpenedFromMenu}
            onClose={onClose}
            setDrawerOpened={setDrawerOpened}
            setOrigin={setOrigin}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
