import styles from './ArrowRight.module.css';

export const ArrowRight = ({ className }) => {
  return (
    <svg className={styles.arrow + ' ' + className} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.7402 6.04583C13.1291 5.65369 13.7622 5.65107 14.1544 6.03997L20.2042 12.0399C20.3935 12.2276 20.5 12.4832 20.5 12.7499C20.5 13.0165 20.3935 13.2721 20.2042 13.4599L14.1544 19.46C13.7623 19.8489 13.1291 19.8463 12.7402 19.4542C12.3513 19.0621 12.3539 18.4289 12.746 18.04L17.0716 13.7499H4.5C3.94772 13.7499 3.5 13.3022 3.5 12.7499C3.5 12.1976 3.94772 11.7499 4.5 11.7499H17.0716L12.746 7.46003C12.3539 7.07113 12.3513 6.43797 12.7402 6.04583Z" fill="current" />
    </svg>
  );
};