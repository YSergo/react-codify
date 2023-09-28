import styles from './Request.module.scss';
import axios from 'axios';
import { useState } from 'react';

function Request({ onClose, showCloseButton = false }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [requestError, setRequestError] = useState(false);

  const [animationTrigger, setAnimationTrigger] = useState(false);

  const [isSent, setIsSent] = useState(false);
  const [sending, setSending] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    const phoneRegex = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    const minLength = 10;
    const maxLength = 1000;
    if (request.length < minLength || request.length > maxLength) {
      setRequestError(true);
      isValid = false;
    } else {
      setRequestError(false);
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setAnimationTrigger(!animationTrigger);
      return;
    }

    setSending(true);
    const formData = {
      name,
      phone,
      email,
      request,
    };

    try {
      await axios.post('https://apialisada11-721689c1d185.herokuapp.com/api/application/', formData);
      setTimeout(() => {
        setSending(false);
        setIsSent(true);
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        console.error(error);
        alert('Произошла ошибка при попытке отправить данные формы, попробуйте позже');
        setSending(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.request}>
      <div className={styles.requestTop}>
        <h2>Заявка</h2>
        {showCloseButton && (
          <svg onClick={onClose} viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M26 2L2 26' stroke='black' strokeWidth='3' />
            <path d='M2 2L26 26' stroke='black' strokeWidth='3' />
          </svg>
        )}
      </div>
      {isSent ? (
        <div className={`${styles.contactForm} ${styles.sentRequest}`}>
          <svg width='140' height='140' viewBox='0 0 140 140' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <circle cx='70' cy='70' r='70' fill='#C8EFDA' />
            <path d='M38 78.5V65.5L59 87L107 39V51L59 99.5L38 78.5Z' fill='black' />
          </svg>
          <h4>Отправлена.</h4>
        </div>
      ) : sending ? (
        <div className={styles.contactForm}>
          <div className={styles.loadingIcon} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
          <h3 className={styles.firstP}>
            Оставьте свои
            <br />
            контактные данные
          </h3>

          <input
            className={nameError ? styles.errorInput : ''}
            key={`name-${animationTrigger}`}
            type='text'
            placeholder='Имя'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={phoneError ? styles.errorInput : ''}
            key={`phone-${animationTrigger}`}
            type='tel'
            placeholder='Телефон'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern='^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$'
          />
          <input
            className={emailError ? styles.errorInput : ''}
            key={`email-${animationTrigger}`}
            type='email'
            placeholder='Эл. почта'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className={styles.secondP}>Какую задачу нужно решить?</h3>
          <textarea
            key={`request-${animationTrigger}`}
            className={`${styles.requestInput} ${requestError ? styles.errorInput : ''}`}
            placeholder='10 - 1000 символов'
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            type='text'
          ></textarea>

          <button type='submit'>Отправить</button>
        </form>
      )}
    </div>
  );
}

export default Request;
