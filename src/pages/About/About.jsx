import styles from './About.module.scss';
import bo from './bo.jpg';
import me from './me.jpeg';
import kris from './kris.jpg';
import Request from '../../components/Request/Request';
import { useState, useRef, useEffect } from 'react';
import Contacts from '../../components/Contacts/Contacts';
import slideInStyles from './slideInStyles.module.scss';

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedMember, setSelectedMember] = useState('sy');

  const [part1Visible, setPart1Visible] = useState(false);
  const [part2Visible, setPart2Visible] = useState(false);
  const [part3Visible, setPart3Visible] = useState(false);
  const part1Ref = useRef(null);
  const part2Ref = useRef(null);
  const part3Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === part1Ref.current && !part1Visible && entry.isIntersecting) {
            setPart1Visible(true);
          } else if (entry.target === part2Ref.current && !part2Visible && entry.isIntersecting) {
            setPart2Visible(true);
          } else if (entry.target === part3Ref.current && !part3Visible && entry.isIntersecting) {
            setPart3Visible(true);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(part1Ref.current);
    observer.observe(part2Ref.current);
    observer.observe(part3Ref.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <div className={styles.container1}>
          <h2 className={styles.line1}>Мы — команда</h2>
          <h2 className={styles.line2}>&nbsp;разработчиков</h2>
          <h2 className={styles.line3}>и дизайнеров,</h2>
        </div>
        <p>
          которая специализируется на веб-разработке и имеет большой опыт в создании высококачественных
          продуктов для наших клиентов.
        </p>
      </div>

      <div className={styles.description}>
        <div className={styles.container2}>
          <h2 className={styles.line4}>Мы считаем, что наша</h2>
          <h2 className={styles.line5}>&nbsp;главная цель — </h2>
        </div>
        <p className={styles.leftAlign}>
          помочь вашему бизнесу развиваться, <br />
          и поэтому мы всегда стремимся к креативным
          <br />
          решениям, которые максимально эффективны
          <br />и удовлетворяют ваши потребности.
        </p>
      </div>

      <h2>Наша команда</h2>
      <div className={styles.ourTeam}>
        {selectedMember === 'bt' && (
          <div className={styles.memberCardWrapper}>
            <div className={styles.memberCard}>
              <img src={bo} alt='person' style={{ opacity: 0.5 }} />
              <h6>Богдан Топоров</h6>
              <span>
                Co-founder <br />
                Back-end разработчик
              </span>
            </div>
            <p>
              Тот, кто разрабатывает и поддерживает серверную часть вашего сайта или приложения, гарантируя
              стабильность, эффективность и безопасность
            </p>
          </div>
        )}
        {selectedMember === 'sy' && (
          <div className={styles.memberCardWrapper}>
            <div className={styles.memberCard}>
              <img src={me} alt='person' />
              <h6>Сергей Якунчихин</h6>
              <span>
                Co-founder <br />
                Full-stack разработчик
              </span>
            </div>
            <p>
              Тот, кто делает всё: от воплощения дизайна в код до разработки и оптимизации серверной части,
              обеспечивая эффективность и стабильность каждого аспекта проекта.
            </p>
          </div>
        )}
        {selectedMember === 'kl' && (
          <div className={styles.memberCardWrapper}>
            <div className={styles.memberCard}>
              <img src={kris} alt='person' style={{ opacity: 0.5 }} />
              <h6>Кристина Николаенко</h6>
              <span>
                Co-founder
                <br /> UX/UI Дизайнер
              </span>
            </div>
            <p>
              Тот, кто создает визуальный стиль и интерфейс вашего продукта, делая его удобным и
              привлекательным для пользователей
            </p>
          </div>
        )}
        <div className={styles.buttons}>
          <button
            className={selectedMember === 'sy' ? styles.selected : ''}
            onClick={() => setSelectedMember('sy')}
          >
            Full-stack разработка
          </button>
          <button
            className={selectedMember === 'bt' ? styles.selected : ''}
            onClick={() => setSelectedMember('bt')}
          >
            Back-end разработка (ex)
          </button>
          <button
            className={selectedMember === 'kl' ? styles.selected : ''}
            onClick={() => setSelectedMember('kl')}
          >
            UX/UI дизайн (ex)
          </button>
        </div>
      </div>

      <h2 className={styles.principlesTitle}>Наши принципы</h2>
      <div className={styles.principles}>
        <div
          ref={part1Ref}
          className={`${styles.partOpacity0} ${styles.part} ${part1Visible ? slideInStyles.fadeIn : ''}`}
        >
          <span>01</span>
          <div>
            <h3>Бизнес-ориентированность</h3>
            <p>
              В первую очередь думаем о бизнесе.
              <br />
              Помогаем решить проблемы и поднять показатели.
            </p>
          </div>
        </div>

        <div
          ref={part2Ref}
          className={`${styles.partOpacity0} ${styles.part} ${styles.part2} ${
            part2Visible ? slideInStyles.fadeIn : ''
          }`}
        >
          <span>02</span>
          <div>
            <h3>Наблюдайте за прогрессом</h3>
            <p>
              Вы всегда будете отслеживать прогресс
              <br />
              по вашему проекту.
            </p>
          </div>
        </div>

        <div
          ref={part3Ref}
          className={`${styles.partOpacity0} ${styles.part} ${styles.part3} ${
            part3Visible ? slideInStyles.fadeIn : ''
          }`}
        >
          <div>
            <svg
              width='129'
              height='126'
              viewBox='0 0 129 126'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M109.551 0H129V20.1494L51.0822 98.0672H125V126H0V0.301758H27.9329V81.6184L109.551 0Z'
                fill='#C8EFDA'
              />
            </svg>
          </div>
          <div className={styles.part}>
            <span>03</span>
            <div>
              <h3>Вовлеченность</h3>
              <p>
                Нам важны вы, мы фокусируемся
                <br />
                на вашем проекте, чтобы вывести
                <br />
                его на новый уровень
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contacts}>
        <Contacts />
        <Request />
      </div>
    </div>
  );
}

export default About;
