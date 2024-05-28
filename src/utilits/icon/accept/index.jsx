import styles from './Accept.module.css';

export const Accept = ({ className }) => {
  return (
    <svg className={styles.accept + ' ' + className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M18.8946 7.35576C19.2851 7.74629 19.2851 8.37946 18.8946 8.76997L11.0196 16.6446C10.6291 17.0351 9.99595 17.0351 9.60542 16.6446L5.66792 12.7075C5.27738 12.317 5.27735 11.6838 5.66786 11.2933C6.05837 10.9027 6.69153 10.9027 7.08208 11.2932L10.3125 14.5233L17.4804 7.35573C17.8709 6.96521 18.5041 6.96523 18.8946 7.35576Z" fill="current" />
    </svg>
  );
};


