import styles from './BtnIcon.module.css';

export default function BtnIcon({ classes, icon, ...props }) {
  const forBtn = classes?.join(' ');
  return (
    <button className={styles.btnIcon + ' ' + forBtn} type="button"  {...props}>
      {icon}
    </button>
  );
}
