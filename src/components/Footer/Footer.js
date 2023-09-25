import styles from './Footer.module.scss';
import { handlePhoneClick, handleTelegramClick, handleEmailClick } from '../../utils/contactHelpers';

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <li onClick={handlePhoneClick}>+995 (55) 100-64-22</li>
        <li onClick={handleTelegramClick}>@YSergo</li>
        <li onClick={handleEmailClick}>iakunchikhin@gmail.com</li>
      </ul>
    </footer>
  );
}

export default Footer;
