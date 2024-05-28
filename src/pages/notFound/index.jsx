import styles from './NotFound.module.css'
import { NotFoundImg } from '../../utilits/icon/NoFound'
import BtnText from '../../components/UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import { ArrowRight } from '../../utilits/icon/arrowRight'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className={styles.wrap}>
      <div className={styles.blog}>
        <NotFoundImg />
        <p className={styles.text}>Страница, на которую вы пытаетесь попасть,<br/>не существует или была удалена.</p>
      </div>
      <div className={styles.blog}>
        <p className={styles.text}>Перейдите на главную страницу</p>
        <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
            iconRight={<ArrowRight />}
            onClick={() => {navigate('/')}}
          >
            Перейти на главную страницу
          </BtnText>
      </div>
      
    </div>
  )
}
