import styles from './PassStatus.module.css'

export function PassStatusEvent({ statusRus, className }) {
  let color
  switch (statusRus) {
    case 'Активный':
      color = styles.active
      break
    case 'Ожидает':
      color = styles.waiting
      break
    case 'Нет выезда':
      color = styles.attention
      break
    default:
      color = styles.inactive
  }
  return (
    <span className={styles.passStatusEvent + ' ' + color + ' ' + className}>
      {statusRus}
    </span>
  )
}

