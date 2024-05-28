import styles from './BtnBottomMenu.module.css'
import cn from 'classnames'

export default function BtnBottomMenu({
  children,
  classes,
  icon,
  location,
  isDisabled = false,
  ...props
}) {
  const forBtn = classes?.join(' ')
  const classForText = cn(styles.btnBottomMenuText, {
    [styles.locationText]: location,
  })

  return (
    <button
      className={styles.btnBottomMenu + ' ' + ' ' + forBtn}
      type="button"
      disabled={isDisabled}
      {...props}
    >
      {icon}
      <span className={classForText}>{children}</span>
      {location && <span className={styles.locationLine} />}
    </button>
  )
}
