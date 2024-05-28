import styles from './Auth.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LogoText } from '../../utilits/icon/logoText'
import InputName from '../../components/UI/inputName/InputName'
import stylesInputName from '../../components/UI/inputName/InputName.module.css'
import InputEmail from '../../components/UI/inputEmail/InputEmail'
import stylesInputEmail from '../../components/UI/inputEmail/InputEmail.module.css'
import InputPassword from '../../components/UI/inputPassword/InputPassword'
import stylesInputPassword from '../../components/UI/inputPassword/InputPassword.module.css'
import BtnText from '../../components/UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import { ArrowRight } from '../../utilits/icon/arrowRight'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../components/context/UserContext'
import { useContext } from 'react'
import { RegApi, LogInApi } from '../../components/API/AuthApi'
import { emailPattern, handleKeyDown } from '../../utilits/helpers'

export default function AuthPage({ isLoginMode, userName, email, setEmail }) {
  const navigate = useNavigate()

  const { setUser } = useContext(UserContext)

  const [error, setError] = useState(null)
  const [offButton, setOffButton] = useState(false)
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')

  const [errorsForm, setErrorsForm] = useState({
    email: '',
    fullName: '',
    password: '',
  })

  const passPattern = /^[^\s]+$/g

  const validateFormReg = () => {
    let isValid = true
    const newErrors = { ...errorsForm }
    const fullNamePattern = /^(?:[А-ЯA-Z][а-яa-z]*)(?:\s+[А-ЯA-Z][а-яa-z]*)*$/

    if (fullName.trim() === '') {
      newErrors.fullName = 'Введите ФИО'
      isValid = false
    } else if (!fullNamePattern.test(fullName)) {
      newErrors.fullName =
        'Имя должно начинаться с заглавной буквы и содержать только латинские или кириллические буквы'
      isValid = false
    } else if (fullName.length < 2) {
      newErrors.fullName = 'Имя должно быть не менее двух символов'
      isValid = false
    } else if (fullName.length > 100) {
      newErrors.fullName = 'Имя должено быть короче ста символов'
      isValid = false
    } else {
      newErrors.fullName = ''
    }

    if (email.trim() === '') {
      newErrors.email = 'Введите почту'
      isValid = false
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Введите корректную почту'
      isValid = false
    } else {
      newErrors.email = ''
    }

    if (password.trim() === '') {
      newErrors.password = 'Введите пароль'
      isValid = false
    } else if (!passPattern.test(password)) {
      newErrors.password = 'Пароль не должен содержать пробелы'
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее шести символов'
      isValid = false
    } else if (password.length > 20) {
      newErrors.password = 'Пароль должен быть короче двадцати символов'
      isValid = false
    } else {
      newErrors.password = ''
    }

    setErrorsForm(newErrors)

    return isValid
  }

  const validateFormLog = () => {
    let isValid = true
    const newErrors = { ...errorsForm }

    if (email.trim() === '') {
      newErrors.email = 'Введите почту'
      isValid = false
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Введите корректную почту'
      isValid = false
    } else {
      newErrors.email = ''
    }

    if (password.trim() === '') {
      newErrors.password = 'Введите пароль'
      isValid = false
    } else if (!passPattern.test(password)) {
      newErrors.password = 'Пароль не должен содержать пробелы'
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее шести символов'
      isValid = false
    } else if (password.length > 20) {
      newErrors.password = 'Пароль должен быть короче двадцати символов'
      isValid = false
    } else {
      newErrors.password = ''
    }

    setErrorsForm(newErrors)

    return isValid
  }

  const handleRegistration = async () => {
    if (validateFormReg()) {
      try {
        await RegApi(fullName, email, password)
        setOffButton(true)
        sessionStorage.setItem('authEmail', email)
        navigate('/confirmEmail')
      } catch (currentError) {
        setError(currentError.message)
      } finally {
        setOffButton(false)
      }
    }
  }

  const handleLogin = async () => {
    if (validateFormLog()) {
      try {
        const response = await LogInApi(email, password)
        setOffButton(true)
        setUser(response)
        sessionStorage.setItem('user', JSON.stringify(response))
        sessionStorage.removeItem('authEmail')
        navigate('/')
      } catch (currentError) {
        setError(currentError.message)
      } finally {
        setOffButton(false)
      }
    }
  }

  useEffect(() => {
    setError(null)
  }, [isLoginMode, email, password, fullName])

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.email = ''
    setErrorsForm(newErrors)
  }, [email])

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.password = ''
    setErrorsForm(newErrors)
  }, [password])

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.fullName = ''
    setErrorsForm(newErrors)
  }, [fullName])

  return isLoginMode ? (
    <main className={styles.mainAuth}>
      <div className={styles.wrapLogin}>
        <Link to="/">
          <LogoText />
        </Link>
        <h2 className={styles.titleLogin}>
          С возвращением👋 <br />
          {userName}
        </h2>
        <form
          action=""
          className={styles.auth}
          onKeyDown={(event) => handleKeyDown(event, handleLogin)}
        >
          <div>
            <InputEmail
              classes={
                errorsForm.email ? [stylesInputEmail.colorNegativeInput] : []
              }
              id={'emailLog'}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              key={1}
              setValue={setEmail}
            />
            {errorsForm.email && (
              <div className="error">{errorsForm.email}</div>
            )}
          </div>
          <div>
            <InputPassword
              classes={
                errorsForm.password
                  ? [stylesInputPassword.colorNegativeInput]
                  : []
              }
              id={'passLog'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
            {errorsForm.password && (
              <div className="error">{errorsForm.password}</div>
            )}
          </div>
          {error && <div className="error">{error}</div>}
          <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
            iconRight={<ArrowRight />}
            onClick={handleLogin}
            disabled={offButton}
          >
            {offButton ? 'Загружаем информацию...' : 'Продолжить'}
          </BtnText>
        </form>
      </div>
    </main>
  ) : (
    <main className={styles.mainAuth}>
      <div className={styles.wrapAuth}>
        <Link to="/">
          <LogoText />
        </Link>
        <h2 className={styles.titleAuth}>
          Добро пожаловать👋 <br />
          Зарегистрируйтесь!
        </h2>
        <form
          action=""
          className={styles.auth}
          onKeyDown={(event) => handleKeyDown(event, handleRegistration)}
        >
          <div>
            <InputName
              classes={
                errorsForm.fullName ? [stylesInputName.colorNegativeInput] : []
              }
              id={'nameReg'}
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value)
              }}
              setValue={setFullName}
            />
            {errorsForm.fullName && (
              <div className="error">{errorsForm.fullName}</div>
            )}
          </div>
          <div>
            <InputEmail
              classes={
                errorsForm.email ? [stylesInputEmail.colorNegativeInput] : []
              }
              id={'emailReg'}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              setValue={setEmail}
            />
            {errorsForm.email && (
              <div className="error">{errorsForm.email}</div>
            )}
          </div>
          <div>
            <InputPassword
              classes={
                errorsForm.password
                  ? [stylesInputPassword.colorNegativeInput]
                  : []
              }
              id={'passReg'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
            {errorsForm.password && (
              <div className="error">{errorsForm.password}</div>
            )}
          </div>

          {error && <div className="error">{error}</div>}
          <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
            iconRight={<ArrowRight />}
            onClick={handleRegistration}
            disabled={offButton}
          >
            {offButton ? 'Загружаем информацию...' : 'Продолжить'}
          </BtnText>
        </form>
        <div className={styles.agree}>
          <p className={styles.agreeText}>
            Нажимая кнопку «Продолжить» вы принимаете условия{' '}
          </p>
          <Link to="/" className={styles.agreeLink}>
            Пользовательского соглашения
          </Link>
        </div>
      </div>
    </main>
  )
}
