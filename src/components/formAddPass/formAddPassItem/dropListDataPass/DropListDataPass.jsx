import styles from './DropListDataPass.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  setCarID,
  setVisitorID,
  setNameVisitor,
  setCommentPass,
  setTel,
  setLicensePlateCar,
  setBrandCar,
  setIsOpenBrand,
  setIsOpenCar,
  setIsOpenVisitor,
  setIsOpenPhone,
} from '../../../../store/slices/passSlice'

export default function DropListDataPass({ data }) {
  const dispatch = useDispatch()
  const { isAutoPass } = useSelector((state) => state.pass)

  const setDataPass = (item) => {
    dispatch(setTel(item?.phone))
    dispatch(setIsOpenPhone(false))

    if (isAutoPass) {
      dispatch(setCarID(item?.id))
      dispatch(setLicensePlateCar(item?.licensePlate))
      dispatch(setBrandCar(item?.brand?.brand))
      dispatch(setIsOpenBrand(false))
      dispatch(setIsOpenCar(false))
    }

    if (!isAutoPass) {
      dispatch(setVisitorID(item?.id))
      dispatch(setNameVisitor(item?.name))
      dispatch(setCommentPass(item?.note))
      dispatch(setIsOpenVisitor(false))
    }
  }

  return (
    <ul className={styles.ulCar}>
      {data?.map((item) => (
        <li
          key={item.id}
          className={styles.liCar}
          onClick={() => setDataPass(item)}
        >
          <div className={styles.blockCarList}>
            <h1 className={styles.licensePlate}>
              {isAutoPass ? item?.licensePlate : item?.name}
            </h1>
            <h2 className={styles.brand}>
              {isAutoPass ? item?.brand?.brand : item?.note}
            </h2>
            <h3 className={styles.phone}>тел: {item?.phone}</h3>
          </div>
        </li>
      ))}
    </ul>
  )
}
