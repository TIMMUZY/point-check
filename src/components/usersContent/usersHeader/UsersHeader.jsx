import styles from './UsersHeader.module.css';

export default function UsersHeader() {
  return (
    <div className={styles.tableHeader}>
      <p className={styles.name}>Имя</p>
      <p className={styles.tel}>Телефон</p>
      <p className={styles.email}>Эл. почта</p>
      <p className={styles.territory}>Объект</p>
      <p className={styles.role}>Роль</p>
    </div>
  );
}
