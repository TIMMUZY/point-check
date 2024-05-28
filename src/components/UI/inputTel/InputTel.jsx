import styles from './InputTel.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Phone } from '../../../utilits/icon/phone'
import InputMask from 'react-input-mask'
import { removeFirstDigitNumber } from '../../../utilits/phoneFormater/PhoneFormater'
import {
  setTel,
  setIsOpenPhone,
  setIsOpenVisitor,
  setIsOpenCar,
  setIsOpenBrand,
} from '../../../store/slices/passSlice'
import DropListDataPass from '../../formAddPass/formAddPassItem/dropListDataPass/DropListDataPass'
import { ClearSvg } from '../../../utilits/icon/clear'

export default function InputTel({
  classes,
  pass = false,
  colorIcon,
  ...props
}) {
  const dispatch = useDispatch()
  const { name, tel, filteredCar, filteredVisitor, isAutoPass, isOpenPhone } =
    useSelector((state) => state.pass)
  const filter = isAutoPass ? filteredCar : filteredVisitor

  const forWrapper = classes?.join(' ')
  const corrTel = removeFirstDigitNumber(tel)

  const toggleOpen = () => {
    dispatch(setIsOpenPhone(!isOpenPhone))

    if (!isAutoPass) {
      dispatch(setIsOpenVisitor(false))
    }
    if (isAutoPass) {
      dispatch(setIsOpenCar(false))
      dispatch(setIsOpenBrand(false))
    }
  }

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <div
        className={styles.inputTelWrapper + ' ' + forWrapper}
        onClick={toggleOpen}
      >
        <Phone color={colorIcon} />
        <InputMask
          className={styles.inputTel}
          mask="+7 (999) 999-99-99"
          maskChar="_"
          type="tel"
          value={corrTel}
          name={name}
          id=""
          placeholder="+7(___)___-__-__"
          {...props}
          onChange={(e) => {
            dispatch(setTel(e.target.value))
          }}
        />

        {corrTel && (
          <div onClick={() => dispatch(setTel(''))}>
            <ClearSvg />
          </div>
        )}

        {isOpenPhone && pass && filter.filteredPhone.length > 0 && (
          <DropListDataPass data={filter.filteredPhone} />
        )}
      </div>
    </div>
  )
}
