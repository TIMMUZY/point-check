import styles from './ArrowMiniRight.module.css';

export const ArrowMiniRight = ({ className }) => {
  return (
    <svg className={styles.arrow + ' ' + className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="ArrowMiniRight">
        <path id="icon" fillRule="evenodd" clipRule="evenodd" d="M7.79289 4.29289C8.18342 3.90237 8.81658 3.90237 9.20711 4.29289L16.2071 11.2929C16.5976 11.6834 16.5976 12.3166 16.2071 12.7071L9.20711 19.7071C8.81658 20.0976 8.18342 20.0976 7.79289 19.7071C7.40237 19.3166 7.40237 18.6834 7.79289 18.2929L14.0858 12L7.79289 5.70711C7.40237 5.31658 7.40237 4.68342 7.79289 4.29289Z" fill="current" />
      </g>
    </svg>
  );
};


