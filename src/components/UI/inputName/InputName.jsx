import styles from './InputName.module.css'
import { Person } from '../../../utilits/icon/person'
import { useRef } from 'react'
import { ClearSvg } from '../../../utilits/icon/clear'

export default function InputName({
  classes,
  colorIcon,
  name,
  value,
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
    <div>
      <div className={styles.inputNameWrapper + ' ' + forWrapper}>
        <Person color={colorIcon} />
        <input
          ref={inputRef}
          className={styles.inputName}
          type="search"
          name={name}
          id=""
          value={value}
          placeholder="Введите ваши ФИО"
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
