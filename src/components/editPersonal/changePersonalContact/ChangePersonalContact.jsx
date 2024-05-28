import styles from './ChangePersonalContact.module.css'
import InputTelPersonal from '../../UI/inputTel/InputTelPersonal'
import InputName from '../../UI/inputName/InputName'
import stylesInputName from '../../UI/inputName/InputName.module.css'
import { useEffect } from 'react'
import { removeFirstDigitNumber } from '../../../utilits/phoneFormater/PhoneFormater'

export function ChangePersonalContact({
  fullName,
  setFullName,
  mainNumber,
  setMainNumber,
  error,
  setError,
  errorsForm,
  setErrorsForm,
  setFullNameChanged,
  setNumberForSentChanged,
}) {
  useEffect(() => {
    setError(null)
  }, [mainNumber, fullName])

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.fullName = ''
    newErrors.mainNumber = ''
    setErrorsForm(newErrors)
  }, [fullName, mainNumber])

  const number = removeFirstDigitNumber(mainNumber)

  return (
    <div className={styles.infoBlog}>
      <h2 className={styles.titleInfoBlog}>Контактные данные</h2>
      <div className={styles.inputInfoBlog}>
        <p className={styles.textInputInfoBlog}>Имя</p>
        <InputName
          classes={
            errorsForm.fullName ? [stylesInputName.colorNegativeInput] : []
          }
          colorIcon={[]}
          placeholder="Введите Ваше имя"
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value)
            setFullNameChanged(true)
          }}
          setValue={setFullName}
        />
        {errorsForm.fullName && (
          <div className="error">{errorsForm.fullName}</div>
        )}
      </div>
      <div className={styles.inputInfoBlog}>
        <p className={styles.textInputInfoBlog}>Телефон</p>
        <InputTelPersonal
          classes={
            errorsForm.mainNumber ? [styles.outlineRed] : [styles.outlineGrey]
          }
          setTel={setMainNumber}
          tel={number}
          setNumberForSentChanged={setNumberForSentChanged}
        />
        {errorsForm.mainNumber && (
          <div className="error">{errorsForm.mainNumber}</div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  )
}
