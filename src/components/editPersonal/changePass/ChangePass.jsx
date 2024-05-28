/* eslint-disable no-unused-vars */
import styles from './ChangePass.module.css'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import BtnTextNew from '../../UI/btnTextNew/BtnText'
import stylesBtnText from '../../UI/btnTextNew/BtnText.module.css'

export function PersonalPassChange() {
  const navigate = useNavigate()
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  return (
    <div className={styles.changPassBlog}>
      <h2 className={styles.titleInfoBlog}>Пароль</h2>
      <BtnTextNew
        classes={[
          stylesBtnText.btnTextBig,
          stylesBtnText.highlightLight,
          stylesBtnText.width100,
        ]}
        onClick={() => {
          navigate('/changePassword')
        }}
      >
        Изменить пароль
      </BtnTextNew>
    </div>
  )
}
