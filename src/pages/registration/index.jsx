import styles from './Registration.module.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BtnText from '../../components/UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import { ArrowRight } from '../../utilits/icon/arrowRight'
import { useNavigate } from 'react-router-dom'
import { Alarm } from '../../utilits/icon/alarm'
import Loader from '../../components/UI/loader/Loader'
import { confirmRegistration } from '../../components/API/ConfirmRegistrationApi'

export default function RegistrationPage({ setIsLoginMode }) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { token } = useParams()

  useEffect(() => {
    reg()
  }, [])

  async function reg() {
    try {
      await confirmRegistration(token)
      setSuccess(true)
    } catch (currentError) {
      setError(currentError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={styles.wrap}>
        {loading ?
          <Loader />
          :
          success ?
            <>
              <img
                className={styles.imgPng}
                src="/img/success.png"
                alt="success"
              />
              <p className={styles.text}>
                Регистрация
                <br />
                успешно пройдена!
              </p>
              <BtnText
                classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
                iconRight={<ArrowRight />}
                onClick={() => {
                  setIsLoginMode(true);
                  navigate('/Auth')
                }}
              >
                Начать пользоваться
              </BtnText>
            </>
            : <>
              <Alarm />
              <p className={styles.text}>
                Регистрация прошла
                <br />
                не успешно!
              </p>
              <BtnText
                classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
                iconRight={<ArrowRight />}
                onClick={() => {
                  setIsLoginMode(false);
                  navigate('/Auth')
                }}
              >
                Начать заново
              </BtnText>
            </>
        }
        {error && <div className="error">{error}</div>}
      </div>
    </>
  )
}
