import styles from './ChangePasswordPage.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BtnText from '../../components/UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import InputPassword from '../../components/UI/inputPassword/InputPassword'
import stylesInputPassword from '../../components/UI/inputPassword/InputPassword.module.css'
import { changePassApi } from '../../components/API/ChangPass'
import BtnIcon from '../../components/UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../components/UI/btnIcon/BtnIcon.module.css'
import { Arrow } from '../../utilits/icon/arrow'
import { handleKeyDown } from '../../utilits/helpers'

export function ChangPasswordPage() {
  const [error, setError] = useState(null)
  const [offButton, setOffButton] = useState(false)
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')

  const [errorsForm, setErrorsForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmationPassword: '',
    comparePass: '',
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errorsForm }
    const passPattern = /^[^\s]+$/g
    // Проверка наличия имени пользователя
    if (currentPassword.trim() === '') {
      newErrors.currentPassword = 'Введите текущий пароль'
      isValid = false
    } else {
      newErrors.currentPassword = ''
    }

    if (newPassword.trim() === '') {
      newErrors.newPassword = 'Введите пароль'
      isValid = false
    } else if (!passPattern.test(newPassword)) {
      newErrors.newPassword = 'Пароль не должен содержать пробелы'
      isValid = false
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Пароль должен быть не менее шести символов'
      isValid = false
    } else if (newPassword.length > 20) {
      newErrors.newPassword = 'Пароль должен быть короче двадцати символов'
      isValid = false
    } else {
      newErrors.newPassword = ''
    }

    if (confirmationPassword.trim() === '') {
      newErrors.confirmationPassword = 'Повторите новый пароль'
      isValid = false
    } else {
      newErrors.confirmationPassword = ''
    }

    if (
      confirmationPassword.trim() !== '' &&
      confirmationPassword !== newPassword
    ) {
      newErrors.comparePass = 'Пароли не совпадают'
      isValid = false
    } else {
      newErrors.comparePass = ''
    }

    setErrorsForm(newErrors)

    return isValid
  }

  const handleSaveChange = async () => {
    if (validateForm()) {
      try {
        await changePassApi(currentPassword, newPassword, confirmationPassword)
        navigate('/personal')
        setOffButton(true)
      } catch (currentError) {
        setError(currentError.message)
      } finally {
        setOffButton(false)
      }
    }
  }

  useEffect(() => {
    setError(null)
  }, [currentPassword, newPassword, confirmationPassword])

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.currentPassword = ''
    setErrorsForm(newErrors)
  }, [currentPassword])

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.newPassword = ''
    newErrors.comparePass = ''
    setErrorsForm(newErrors)
  }, [newPassword])

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.confirmationPassword = ''
    newErrors.comparePass = ''
    setErrorsForm(newErrors)
  }, [confirmationPassword])

  return (
    <main className={styles.main}>
      <div className={styles.contentWrap}>
        <div className={styles.titlePerson}>
          <BtnIcon
            classes={[
              stylesBtnIcon.btnIconMedium,
              stylesBtnIcon.colorSecondary,
            ]}
            onClick={() => navigate(-1)}
            icon={<Arrow />}
          />
          <h1 className={styles.titleText}>Изменить пароль</h1>
        </div>

        <form className={styles.infoBlog}>
          <div className={styles.inputInfoBlog}>
            <p className={styles.textInputInfoBlog}>Введите старый пароль</p>
            <InputPassword
              id="currentPasswordInput"
              classes={
                errorsForm.currentPassword
                  ? [stylesInputPassword.colorNegativeInput]
                  : []
              }
              colorIcon={[]}
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.target.value)
              }}
              onKeyDown={(event) => handleKeyDown(event, handleSaveChange)}
            />
            {errorsForm.currentPassword && (
              <div className="error">{errorsForm.currentPassword}</div>
            )}
          </div>
          <div className={styles.inputInfoBlog}>
            <p className={styles.textInputInfoBlog}>Введите новый пароль</p>
            <InputPassword
              id="newPasswordInput"
              classes={
                errorsForm.newPassword
                  ? [stylesInputPassword.colorNegativeInput]
                  : []
              }
              colorIcon={[]}
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value)
              }}
              onKeyDown={(event) => handleKeyDown(event, handleSaveChange)}
            />
            {errorsForm.newPassword && (
              <div className="error">{errorsForm.newPassword}</div>
            )}
          </div>
          <div className={styles.inputInfoBlog}>
            <p className={styles.textInputInfoBlog}>Повторите новый пароль</p>
            <InputPassword
              id="confirmationPasswordInput"
              classes={
                errorsForm.confirmationPassword || errorsForm.comparePass
                  ? [stylesInputPassword.colorNegativeInput]
                  : []
              }
              colorIcon={[]}
              value={confirmationPassword}
              onChange={(event) => {
                setConfirmationPassword(event.target.value)
              }}
              onKeyDown={(event) => handleKeyDown(event, handleSaveChange)}
            />
            {errorsForm.confirmationPassword && (
              <div className="error">{errorsForm.confirmationPassword}</div>
            )}
            {errorsForm.comparePass && (
              <div className="error">{errorsForm.comparePass}</div>
            )}
          </div>
          {error && <div className="error">{error}</div>}
          <BtnText
            classes={[
              stylesBtnText.btnTextBig,
              currentPassword && newPassword && confirmationPassword
                ? stylesBtnText.colorPrimary
                : stylesBtnText.colorHighlightLight,
              stylesBtnText.width100,
            ]}
            onClick={handleSaveChange}
            // disabled={offButton}
          >
            {offButton ? 'Загружаем информацию...' : 'Сохранить'}
          </BtnText>
        </form>
      </div>
    </main>
  )
}
