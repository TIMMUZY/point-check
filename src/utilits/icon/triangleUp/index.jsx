import styles from './TriangleUp.module.css';

export const TriangleUp = ({ color }) => {
  return (
    <svg className={styles.triangle + ' ' + color + ' filter' + ' selectPageSize'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Arrow - Up">
        <path id="icon" d="M8.66114 15H15.3389C15.913 15 16.2132 14.3123 15.8253 13.8858L12.4864 10.2156C12.2249 9.92813 11.7751 9.92813 11.5136 10.2156L8.17474 13.8858C7.78678 14.3123 8.08701 15 8.66114 15Z" fill="current" />
      </g>
    </svg>
  );
};
