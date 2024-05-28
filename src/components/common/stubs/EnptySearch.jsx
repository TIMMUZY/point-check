import styles from './Stubs.module.css'
import { EmptySearchImg } from '../../../utilits/icon/emptySearch'

export default function EmptySearch() {
  return (
    <div className={styles.wrap}>
      <EmptySearchImg />
      <div className={styles.blogText}>
        <p className={styles.textL}>Извините, ничего не найдено</p>
        <p className={styles.textM}>Попробуйте изменить ваш запрос</p>
      </div>
    </div>
  )
}
