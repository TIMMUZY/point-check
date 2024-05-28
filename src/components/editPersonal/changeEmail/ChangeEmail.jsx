import styles from './ChangeEmail.module.css'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import BtnText from '../../UI/btnTextNew/BtnText'
import stylesBtnText from '../../UI/btnTextNew/BtnText.module.css'

export function PersonalEmailChange() {
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])
  const navigate = useNavigate()

  return (
    <div className={styles.changEmailBlog}>
      <h2 className={styles.titleInfoBlog}>Электронная почта</h2>
      <p className={styles.textChangeBlog}>{user.email}</p>
      <BtnText
        classes={[
          stylesBtnText.btnTextBig,
          stylesBtnText.highlightLight,
          stylesBtnText.width100,
        ]}
        onClick={() => {
          navigate('/changeEmail')
        }}
      >
        Изменить почту
      </BtnText>
    </div>
  )
}
