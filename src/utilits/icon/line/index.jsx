import styles from './Line.module.css'

export const Line = () => {
  return (
    <svg
      className={styles.line}
      width="498"
      height="1"
      viewBox="0 0 498 1"
      fill="none"
    >
      <path d="M0 1H498" stroke="#8A9499" />
    </svg>
  )
}
