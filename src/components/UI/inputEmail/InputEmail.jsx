import styles from './InputEmail.module.css'
import { Mail } from '../../../utilits/icon/mail'
import { useRef } from 'react'
import { ClearSvg } from '../../../utilits/icon/clear'

export default function InputEmail({
  classes,
  colorIcon,
  name,
  value,
  setValue,
  ...props
}) {
  const inputRef = useRef()
  const forWrapper = classes?.join(' ')

  const onClickClear = () => {
    setValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <div className={styles.inputNameWrapper + ' ' + forWrapper}>
        <Mail color={colorIcon} />
        <input
          ref={inputRef}
          className={styles.inputName}
          type="search"
          name={name}
          value={value}
          id=""
          placeholder="Введите Вашу почту"
          {...props}
        />

        {value && (
          <div onClick={onClickClear}>
            <ClearSvg />
          </div>
        )}
      </div>
    </div>
  )
}
