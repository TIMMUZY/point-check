import styles from './CheckAuth.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { LogoText } from '../../utilits/icon/logoText'
import InputEmail from '../../components/UI/inputEmail/InputEmail'
import stylesInputEmail from '../../components/UI/inputEmail/InputEmail.module.css'
import BtnText from '../../components/UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import { ArrowRight } from '../../utilits/icon/arrowRight'
import { checkReg } from '../../components/API/AuthApi'
import { LogInApi } from '../../components/API/AuthApi'
import { useContext } from 'react'
import UserContext from '../../components/context/UserContext'
import { emailPattern, handleKeyDown } from '../../utilits/helpers'

export default function CheckAuthPage({
  setIsLoginMode,
  email,
  setEmail,
  setUserName,
}) {
  const navigate = useNavigate()

  const { setUser } = useContext(UserContext)

  const [error, setError] = useState(null)
  const [offButton, setOffButton] = useState(false)
  const [errorsForm, setErrorsForm] = useState({
    email: '',
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errorsForm }

    // Проверка наличия имени пользователя
    if (email.trim() === '') {
      newErrors.email = 'Введите почту'
      isValid = false
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Введите корректную почту'
      isValid = false
    } else {
      newErrors.email = ''
    }

    setErrorsForm(newErrors)

    return isValid
  }

  const handleCheck = async () => {
    if (validateForm()) {
      try {
        const response = await checkReg(email)
        setOffButton(true)
        setIsLoginMode(response.isAuthenticated)
        setUserName(response.fullName)
        navigate('/Auth')
      } catch (currentError) {
        setError(currentError.message)
      } finally {
        setOffButton(false)
      }
    }
  }

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.email = ''
    setErrorsForm(newErrors)
  }, [email])

  const handleLogin = async (email) => {
    try {
      const response = await LogInApi(email, 1)
      setOffButton(true)
      setUser(response)
      sessionStorage.setItem('user', JSON.stringify(response))
      navigate('/')
    } catch (currentError) {
      setError(currentError.message)
    } finally {
      setOffButton(false)
    }
  }

  return (
    <main className={styles.mainAuth}>
      <div className={styles.wrapCheck}>
        <Link to="/">
          <LogoText />
        </Link>
        <h2 className={styles.titleCheck}>Войдите или зарегистрируйтесь</h2>
        <div action="" className={styles.auth}>
          <div>
            <InputEmail
              classes={
                errorsForm.email ? [stylesInputEmail.colorNegativeInput] : []
              }
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              onKeyDown={(event) => handleKeyDown(event, handleCheck)}
              setValue={setEmail}
            />
            {errorsForm.email && (
              <div className="error">{errorsForm.email}</div>
            )}
          </div>

          {error && <div className="error">{error.message}</div>}
          <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
            iconRight={<ArrowRight />}
            onClick={handleCheck}
            disabled={offButton}
          >
            Продолжить
          </BtnText>
        </div>
      </div>

      <br />

      <div className={styles.wrapTest}>
        <h3 className={styles.titleTest}>
          или воспользуйтесь сервисом <br /> под одним из готовых аккаунтов:
        </h3>
        <div className={styles.auth}>
          <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
            iconRight={<ArrowRight />}
            onClick={() => handleLogin('admin@chp.com')}
            disabled={offButton}
          >
            Администратор сервиса
          </BtnText>
          <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
            iconRight={<ArrowRight />}
            onClick={() => handleLogin('manager@chp.com')}
            disabled={offButton}
          >
            Менеджер (УК)
          </BtnText>
          <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
            iconRight={<ArrowRight />}
            onClick={() => handleLogin('security@chp.com')}
            disabled={offButton}
          >
            Охрана (КПП)
          </BtnText>
          <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
            iconRight={<ArrowRight />}
            onClick={() => handleLogin('user@chp.com')}
            disabled={offButton}
          >
            Пользователь сервиса
          </BtnText>
        </div>
      </div>
    </main>
  )
}
