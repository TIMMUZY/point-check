import styles from './InputNote.module.css'
import { Ticket } from '../../../utilits/icon/ticket'
import { ClearSvg } from '../../../utilits/icon/clear'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'

export default function InputNote({ classes, value, setValue, ...props }) {
  const forWrapper = classes?.join(' ')
  const inputRef = useRef()
  const dispatch = useDispatch()

  const onClickClear = () => {
    dispatch(setValue(''))
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className={styles.inputDateWrapper + ' ' + forWrapper}>
      <Ticket />
      <input
        ref={inputRef}
        className={styles.inputDate}
        type="text"
        value={value}
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
