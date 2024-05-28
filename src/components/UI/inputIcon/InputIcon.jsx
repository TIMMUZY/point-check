import { useRef } from 'react'
import styles from './InputIcon.module.css'
import { ClearSvg } from '../../../utilits/icon/clear'

export default function InputIcon({
  icon,
  value,
  placeholder,
  classes,
  type,
  name,
  setValue,
  ...props
}) {
  const forWrapper = classes?.join(' ')
  const inputRef = useRef()

  const onClickClear = () => {
    setValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className={styles.inputIconWrapper + ' ' + forWrapper}>
      {icon}
      <input
        ref={inputRef}
        className={styles.inputIcon}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        {...props}
      />

      {value && (
        <div onClick={onClickClear}>
          <ClearSvg />
        </div>
      )}
    </div>
  )
}
