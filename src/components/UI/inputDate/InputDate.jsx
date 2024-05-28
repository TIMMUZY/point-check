import styles from './InputDate.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  setEndTimePass,
  setStartTimePass,
} from '../../../store/slices/passSlice'

export default function InputDate({ classes, ...props }) {
  const forWrapper = classes?.join(' ')
  const dispatch = useDispatch()
  const { name, startTimePass, endTimePass } = useSelector(
    (state) => state.pass,
  )

  return (
    <div className={styles.formDate}>
      <div className={styles.inputDateWrapper + ' ' + forWrapper}>
        {/* <Calendar color={colorIcon} /> */}
        <input
          className={styles.inputDate}
          type="datetime-local"
          name={name}
          id="datetime"
          value={startTimePass}
          placeholder="Дата начала"
          onChange={(e) => {
            dispatch(setStartTimePass(e.target.value))
          }}
          {...props}
        />
      </div>
      <span>—</span>
      <div className={styles.inputDateWrapper + ' ' + forWrapper}>
        {/* <Calendar color={colorIcon} /> */}
        <input
          className={styles.inputDate}
          type="datetime-local"
          name={name}
          value={endTimePass}
          id="datetime"
          placeholder="Дата окончания"
          onChange={(e) => {
            dispatch(setEndTimePass(e.target.value))
          }}
          {...props}
        />
      </div>
    </div>
  )
}
