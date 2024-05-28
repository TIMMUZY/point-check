import styles from './PassStatus.module.css'
// import { useState } from 'react'

export default function PassStatus({ children, className }) {
  let color
  switch (children) {
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
    <span className={styles.passStatus + ' ' + color + ' ' + className}>
      {children}
    </span>
  )
}
