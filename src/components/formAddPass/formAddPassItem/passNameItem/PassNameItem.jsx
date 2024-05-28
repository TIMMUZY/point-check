import styles from './PassNameItem.module.css'
import { useSelector, useDispatch } from 'react-redux'
import DropListDataPass from '../dropListDataPass/DropListDataPass'
import { Person } from '../../../../utilits/icon/person'
import { ClearSvg } from '../../../../utilits/icon/clear'
import { handleChangeValidation } from '../../../../utilits/helpers'
import {
  setNameVisitor,
  setIsOpenVisitor,
  setIsOpenPhone,
  setVisitorID,
} from '../../../../store/slices/passSlice'
import { useRef } from 'react'

export default function PassNameItem({ isEdit }) {
  const dispatch = useDispatch()
  const inputRef = useRef()
  const { nameVisitor, isClickCreatPass, filteredVisitor, isOpenVisitor } =
    useSelector((state) => state.pass)

  const toggleOpen = () => {
    dispatch(setIsOpenVisitor(!isOpenVisitor))
    dispatch(setIsOpenPhone(false))
  }

  const onClickClear = () => {
    dispatch(setNameVisitor(''))
    if (!isEdit) {
      dispatch(setVisitorID(''))
    }
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <div
        className={`${styles.inputNameWrapper} ${
          isClickCreatPass && !nameVisitor && styles.outlineRed
        }`}
        onClick={() => toggleOpen()}
      >
        <Person />
        <input
          ref={inputRef}
          className={styles.inputName}
          type="search"
          name="search"
          list="visitors"
          id=""
          autoComplete="off"
          placeholder="ФИО"
          value={nameVisitor}
          onChange={(e) => {
            handleChangeValidation(e, dispatch, 'Пешеход')

            if (!isEdit) {
              dispatch(setVisitorID(''))
            }

            if (e.target.value) {
              dispatch(setIsOpenVisitor(true))
            } else {
              dispatch(setIsOpenVisitor(false))
            }
          }}
        />

        {nameVisitor && (
          <div onClick={onClickClear}>
            <ClearSvg />
          </div>
        )}

        {isOpenVisitor && filteredVisitor.filteredVisitors?.length > 0 && (
          <DropListDataPass data={filteredVisitor.filteredVisitors} />
        )}
      </div>
    </div>
  )
}
