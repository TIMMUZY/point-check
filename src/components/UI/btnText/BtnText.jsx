import styles from './BtnText.module.css'

export default function BtnText({
  children,
  classes,
  icon,
  iconRight,
  isDisabled = false,
  ...props
}) {
  const forBtn = classes?.join(' ')
  return (
    <button
      className={styles.btnText + ' ' + ' ' + forBtn}
      type="button"
      disabled={isDisabled}
      {...props}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  )
}
