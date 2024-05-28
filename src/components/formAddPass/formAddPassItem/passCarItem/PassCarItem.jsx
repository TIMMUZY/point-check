import styles from './PassCarItem.module.css'
import { useSelector, useDispatch } from 'react-redux'
import DropListDataPass from '../dropListDataPass/DropListDataPass'
import RadioButton from '../../../UI/radioButton/RadioButton'
import { Car } from '../../../../utilits/icon/car'
import { Ticket } from '../../../../utilits/icon/ticket'
import { TriangleDown } from '../../../../utilits/icon/triangleDown'
import { TriangleUp } from '../../../../utilits/icon/triangleUp'
import { ClearSvg } from '../../../../utilits/icon/clear'
import { handleChangeValidation } from '../../../../utilits/helpers'
import { useGetCarBrandsAllQuery } from '../../../../store/RTKQuery/pass'
import {
  setBrandCar,
  setLicensePlateCar,
  setIsOpenCar,
  setIsOpenBrand,
  setIsOpenPhone,
  setCarID,
} from '../../../../store/slices/passSlice'

export default function PassCarItem({ isEdit }) {
  const dispatch = useDispatch()
  const {
    isClickCreatPass,
    licensePlateCar,
    brandCar,
    filteredCar,
    isOpenBrand,
    isOpenCar,
  } = useSelector((state) => state.pass)

  const { data: carBrandsAll } = useGetCarBrandsAllQuery()

  const filteredBrands = carBrandsAll?.filter((item) =>
    item?.brand?.toLowerCase().includes(brandCar?.toLowerCase()),
  )

  const toggleOpenBrand = () => {
    dispatch(setIsOpenBrand(!isOpenBrand))
    dispatch(setIsOpenCar(false))
    dispatch(setIsOpenPhone(false))
  }

  const toggleOpenCar = () => {
    dispatch(setIsOpenCar(!isOpenCar))
    dispatch(setIsOpenBrand(false))
    dispatch(setIsOpenPhone(false))
  }

  const getBrandOption = () => {
    const carBrand = filteredBrands?.map((item) => (
      <li key={item.id} className={styles.li}>
        <RadioButton
          name="radio-button"
          onClick={() => {
            dispatch(setBrandCar(item.brand)), toggleOpenBrand()
          }}
          onChange={() => {}}
          checked={item.brand === brandCar}
        >
          {item.brand}
        </RadioButton>
      </li>
    ))
    return carBrand
  }

  const onClickClearAuto = () => {
    dispatch(setLicensePlateCar(''))
    dispatch(setBrandCar(''))
    if (!isEdit) {
      dispatch(setCarID(''))
    }
  }

  return (
    <div className={styles.formCar}>
      <div
        className={`${styles.inputCarWrapper} ${
          isClickCreatPass && !licensePlateCar && styles.outlineRed
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <Ticket />
        <input
          className={styles.inputCar}
          type="search"
          name="search"
          id=""
          autoComplete="off"
          placeholder="Гос номер"
          value={licensePlateCar}
          maxLength="10"
          onChange={(e) => {
            handleChangeValidation(e, dispatch, 'ГосНомер')

            if (!isEdit) {
              dispatch(setCarID(''))
            }

            if (e.target.value) {
              dispatch(setIsOpenCar(true))
            } else {
              dispatch(setIsOpenCar(false))
            }
          }}
          onClick={toggleOpenCar}
        />

        {licensePlateCar && (
          <div onClick={onClickClearAuto}>
            <ClearSvg />
          </div>
        )}

        {isOpenCar && filteredCar.filteredCars?.length > 0 && (
          <DropListDataPass data={filteredCar.filteredCars} />
        )}
      </div>
      <div
        className={`${styles.inputCarWrapper} ${
          isClickCreatPass && !brandCar && styles.outlineRed
        }`}
        onClick={(event) => {
          event.stopPropagation()
          toggleOpenBrand()
        }}
      >
        <Car />
        <input
          className={styles.inputCar}
          type="search"
          name="search"
          value={brandCar}
          placeholder="Марка машины"
          autoComplete="off"
          onChange={(e) => {
            handleChangeValidation(e, dispatch, 'МаркаМашины')

            if (e.target.value) {
              dispatch(setIsOpenBrand(true))
            } else {
              dispatch(setIsOpenBrand(false))
            }
          }}
        />

        {brandCar && (
          <div onClick={() => dispatch(setBrandCar(''))}>
            <ClearSvg />
          </div>
        )}

        <div>
          {isOpenBrand && filteredBrands?.length > 0 ? (
            <TriangleUp />
          ) : (
            <TriangleDown />
          )}
        </div>

        {isOpenBrand && filteredBrands?.length > 0 && (
          <ul
            className={styles.ul}
            onClick={(event) => event.stopPropagation()}
          >
            {getBrandOption()}
          </ul>
        )}
      </div>
    </div>
  )
}
