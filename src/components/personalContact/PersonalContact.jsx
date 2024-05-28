import styles from './PersonalContact.module.css';
import { formatNumber } from '../../utilits/phoneFormater/PhoneFormater';

export function PersonalContact({ user }) {
const number = formatNumber(user.mainNumber)
  return (
    <div className={styles.infoBlog}>
      <h2 className={styles.titleInfoBlog}>Контактные данные</h2>
      <div className={styles.itemInfoBlog}>
        <p className={styles.textInfoBlog}>Имя</p>
        <p className={styles.textBlackInfoBlog}>{user.fullName}</p>
        <div className={styles.rectangle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="360"
            height="2"
            viewBox="0 0 360 2"
            fill="none"
          >
            <path d="M0 1H360" stroke="#EEF4F5" />
          </svg>
        </div>
      </div>
      <div className={styles.itemInfoBlog}>
        <p className={styles.textInfoBlog}>Телефон</p>
        <p className={styles.textBlackInfoBlog}>{number}</p>
        <div className={styles.rectangle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="360"
            height="2"
            viewBox="0 0 360 2"
            fill="none"
          >
            <path d="M0 1H360" stroke="#EEF4F5" />
          </svg>
        </div>
      </div>
    </div>
  )

}