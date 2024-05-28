import styles from './NotificationDelete.module.css'
import { Alarm } from "../../../utilits/icon/alarm"
import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../UI/btnText/BtnText.module.css'

export default function NotificationDelete({ target, del, setIsShowModal, ...props }) {
  return (
    <div className={styles.wrapper} {...props}>
      <Alarm />
      <h2 className={styles.title}>Вы уверены, что хотите <br /> удалить {target}?</h2>
      <div className={styles.actions}>
        <BtnText
          classes={[stylesBtnText.btnTextBig, stylesBtnText.colorNegative, stylesBtnText.width100]}
          onClick={del}
        >
          Удалить
        </BtnText>
        <BtnText
          classes={[stylesBtnText.btnTextBig, stylesBtnText.colorSecondary, stylesBtnText.width100]}
          onClick={() => setIsShowModal(false)}
        >
          Отменить
        </BtnText>
      </div>
    </div>
  )
}