import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Footer from './components/Footer/Footer';
import Services from './pages/Services/Services';
import Portfolio from './pages/Portfolio/Portfolio';
import HeaderMobile from './components/Header/HeaderMobile';
import axios from 'axios';

function App() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [origin, setOrigin] = useState(null);

  const [openedFromMenu, setOpenedFromMenu] = useState(false);

  const setDrawerState = (state) => {
    if (state) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        setOrigin(null);
      }, 300);
    }
    setDrawerOpened(state);
  };

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  //mob
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 576;
  const isTablet = windowWidth >= 576 && windowWidth <= 1336;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  //

  const [favors, setFavors] = useState([]);
  const [favorsLoading, setFavorsLoading] = useState(true);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function fetchData() {
      try {
        setFavorsLoading(true);
        const response = await axios.get('https://64c14d7efa35860baea05e92.mockapi.io/services/');
        setFavors(response.data);
        await delay(1500);
        setFavorsLoading(false);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        alert('Ошибка получения данных. Возможно проблема с сервером. Попробуйте подождать :(');
        setFavorsLoading(false);
      }
    }

    fetchData();
  }, []);

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setProjectsLoading(true);
        const response = await axios.get('https://64c14d7efa35860baea05e92.mockapi.io/projects/');
        setProjects(response.data);
        await delay(1500);
        setProjectsLoading(false);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        alert('Ошибка получения данных. Возможно проблема с сервером. Попробуйте подождать :(');
        setProjectsLoading(false);
      }
    }

    fetchData();
  }, []);

  const [selectedCardData, setSelectedCardData] = useState({});

  return (
    <div className='app'>
      <Drawer
        onClose={() => setDrawerState(false)}
        drawerOpened={drawerOpened}
        origin={origin}
        setOrigin={setOrigin}
        setDrawerOpened={setDrawerState}
        openedFromMenu={openedFromMenu}
        setOpenedFromMenu={setOpenedFromMenu}
        selectedCardData={selectedCardData}
      />
      {isMobile ? <HeaderMobile setDrawerOpened={setDrawerState} setOrigin={setOrigin} /> : <Header />}
      <Routes>
        <Route
          path='/'
          element={
            <Home
              setDrawerOpened={setDrawerState}
              setSelectedCardData={setSelectedCardData}
              isMobile={isMobile}
              isTablet={isTablet}
              favors={favors}
              favorsLoading={favorsLoading}
              projects={projects}
              projectsLoading={projectsLoading}
            />
          }
        />
        <Route path='/about' element={<About />} />
        <Route
          path='/services'
          element={
            <Services
              setDrawerOpened={setDrawerState}
              favors={favors}
              favorsLoading={favorsLoading}
              isMobile={isMobile}
              setSelectedCardData={setSelectedCardData}
              isTablet={isTablet}
            />
          }
        ></Route>
        <Route
          path='/portfolio'
          element={
            <Portfolio
              projects={projects}
              projectsLoading={projectsLoading}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          }
        ></Route>
      </Routes>
      {!isTablet && !isMobile && !isHomePage && <Footer />}
      {isTablet && <div style={{ marginTop: '35px' }}></div>}
    </div>
  );
}

export default App;
