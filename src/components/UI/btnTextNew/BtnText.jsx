import styles from './BtnText.module.css'

export default function BtnText ({
  children,
  classes,
  icon,
  iconRight,
  ...props
}) {
  const forBtn = classes?.join(' ')
  return (
    <button
      className={styles.btnText + ' ' + ' ' + forBtn}
      type="button"
      {...props}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  )
}
