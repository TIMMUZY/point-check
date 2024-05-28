import styles from './ChangeEmailPage.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputEmail from '../../components/UI/inputEmail/InputEmail'
import stylesInputEmail from '../../components/UI/inputEmail/InputEmail.module.css'
import BtnText from '../../components/UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import { ArrowRight } from '../../utilits/icon/arrowRight'
import { changeEmailApi } from '../../components/API/ChangEmail'
import { emailPattern, handleKeyDown } from '../../utilits/helpers'
import BtnIcon from '../../components/UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../components/UI/btnIcon/BtnIcon.module.css'
import { Arrow } from '../../utilits/icon/arrow'

export function ChangEmailPage({ setEmail }) {
  const [error, setError] = useState(null)
  const [offButton, setOffButton] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const navigate = useNavigate()

  const [errorsForm, setErrorsForm] = useState({
    newEmail: '',
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errorsForm }

    if (newEmail.trim() === '') {
      newErrors.newEmail = 'Введите новую почту'
      isValid = false
    } else if (!emailPattern.test(newEmail)) {
      newErrors.newEmail = 'Введите корректную почту'
      isValid = false
    } else {
      newErrors.newEmail = ''
    }

    setErrorsForm(newErrors)

    return isValid
  }

  const handleSaveChange = async () => {
    if (validateForm()) {
      try {
        await changeEmailApi(newEmail)
        setEmail(newEmail)
        navigate('/confirmEmail')
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
  }, [newEmail])

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.newEmail = ''
    setErrorsForm(newErrors)
  }, [newEmail])

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
          <h1 className={styles.titleText}>Изменить почту</h1>
        </div>
        <div className={styles.infoBlog}>
          <h2 className={styles.titleInfoBlog}>
            Вам будет выслано письмо на новую почту для ее подтверждения
          </h2>
          <div className={styles.inputInfoBlog}>
            <p className={styles.textInputInfoBlog}>Укажите новую почту</p>
            <InputEmail
              classes={
                errorsForm.newEmail ? [stylesInputEmail.colorNegativeInput] : []
              }
              colorIcon={[]}
              placeholder="example@mail.com"
              value={newEmail}
              onChange={(event) => {
                setNewEmail(event.target.value)
              }}
              onKeyDown={(event) => handleKeyDown(event, handleSaveChange)}
              setValue={setNewEmail}
            />
            {errorsForm.newEmail && (
              <div className="error">{errorsForm.newEmail}</div>
            )}
          </div>
          {error && <div className="error">{error.message}</div>}
          <BtnText
            classes={[
              stylesBtnText.btnTextBig,
              newEmail
                ? stylesBtnText.colorPrimary
                : stylesBtnText.colorHighlightLight,
              stylesBtnText.width100,
            ]}
            iconRight={<ArrowRight />}
            onClick={handleSaveChange}
            disabled={offButton}
          >
            {offButton ? 'Загружаем информацию...' : 'Продолжить'}
          </BtnText>
        </div>
      </div>
    </main>
  )
}
