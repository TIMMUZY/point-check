import styles from './InputCar.module.css'
import { Car } from '../../../utilits/icon/car'
import { Ticket } from '../../../utilits/icon/ticket'
import { useState, useEffect } from 'react'
import { getCarBrandsAll } from '../../API/CarBrands'

export default function InputCar({
  classes,
  colorIcon,
  name,
  setLicensePlateCar,
  setBrandCar,
  ...props
}) {
  const forWrapper = classes?.join(' ')
  const [carBrandsAll, setCarBrandsAll] = useState([])

  useEffect(() => {
    getCarBrandsAll()
      .then((brand) => {
        setCarBrandsAll(brand)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [])

  const getBrandOption = () => {
    const carBrand = carBrandsAll.map((item) => (
      <option key={item.id} value={item.brand} />
    ))
    return carBrand
  }

  return (
    <div className={styles.formCar}>
      <div className={styles.inputCarWrapper + ' ' + forWrapper}>
        <Car color={colorIcon} />
        <input
          className={styles.inputCar}
          type="search"
          name={name}
          id=""
          list="brands"
          placeholder="Марка машины"
          onChange={(e) => {
            setBrandCar(e.target.value)
          }}
          {...props}
        />
        <datalist id="brands">{getBrandOption()}</datalist>
      </div>
      <div className={styles.inputCarWrapper + ' ' + forWrapper}>
        <Ticket color={colorIcon} />
        <input
          className={styles.inputCar}
          type="search"
          name={name}
          id=""
          placeholder="Гос номер"
          onChange={(e) => {
            setLicensePlateCar(e.target.value)
          }}
          {...props}
        />
      </div>
    </div>
  )
}
