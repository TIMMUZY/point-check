import styles from './BtnTextMiniModal.module.css'

export default function BtnTextMiniModal({
  children,
  classes,
  icon,
  iconRight,
  ...props
}) {
  const forBtn = classes?.join(' ')
  return (
    <button
      className={styles.btnTextMiniModal + ' ' + ' ' + forBtn}
      type="button"
      {...props}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  )
}
