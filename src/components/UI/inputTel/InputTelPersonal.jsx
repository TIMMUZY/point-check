import styles from './InputTel.module.css'
import { Phone } from '../../../utilits/icon/phone'
import InputMask from 'react-input-mask'
import { removeFirstDigitNumber } from '../../../utilits/phoneFormater/PhoneFormater'
import { ClearSvg } from '../../../utilits/icon/clear'

export default function InputTel({
  classes,
  colorIcon,
  name,
  setTel,
  tel,
  setNumberForSentChanged,
  ...props
}) {
  const forWrapper = classes?.join(' ')
  const corrTel = removeFirstDigitNumber(tel)

  return (
    <div>
      <div className={styles.inputTelWrapper + ' ' + forWrapper}>
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
            setTel(e.target.value)
            setNumberForSentChanged(true)
          }}
        />

        {corrTel && (
          <div onClick={() => setTel('')}>
            <ClearSvg />
          </div>
        )}
      </div>
    </div>
  )
}
