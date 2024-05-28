import styles from './EventsHeader.module.css';

export default function EventsHeader() {
  return (
    <div className={styles.tableHeader}>
      <p className={styles.tableEvent}>События</p>
      <p className={styles.tableHeaderName}>Вид пропуска</p>
      <p className={styles.tableHeaderTerritory}>Объект</p>
      <p className={styles.tableHeaderType}>Тип пропуска</p>
      <p className={styles.tableHeaderStatus}>Статус</p>
    </div>
  );
}
