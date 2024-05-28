import styles from './TriangleDown.module.css';

export const TriangleDown = ({ color }) => {
  return (
    <svg className={styles.triangle + ' ' + color + ' filter' + ' selectPageSize'} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Arrow - Down">
        <path id="icon" d="M8.66114 10H15.3389C15.913 10 16.2132 10.6877 15.8253 11.1142L12.4864 14.7844C12.2249 15.0719 11.7751 15.0719 11.5136 14.7844L8.17474 11.1142C7.78678 10.6877 8.08701 10 8.66114 10Z" fill="current" />
      </g>
    </svg>
  );
};
