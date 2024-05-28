import styles from './AvatarBlog.module.css'
import BtnText from '../UI/btnText/BtnText'
import stylesBtnText from '../UI/btnText/BtnText.module.css'
import { Pen } from '../../utilits/icon/pen'
import { Avatar } from './avatar/Avatar'
export function AvatarBlog({
  isEdit,
  setIsEdit,
  setFullNameChanged,
  setNumberForSentChanged,
  numberForSentChanged,
  handleSaveChange,
  fullNameChanged,
  offButton,
  user
}) {
  const role = sessionStorage.getItem('role')

  return (
    <div className={styles.avaBlog}>
      <Avatar isEdit={isEdit} />
      <div className={styles.infoAvaBlog}>
        <p className={styles.textAvaBlog}>{role}</p>
        <h2 className={styles.titleAvaBlog}>{user.fullName}</h2>
        <p className={styles.textAvaBlog}>{user.email}</p>
      </div>
      {!isEdit ? (
        <BtnText
          classes={[
            stylesBtnText.btnTextBig,
            stylesBtnText.colorHighlightLight,
            stylesBtnText.width100,
          ]}
          icon={<Pen />}
          onClick={() => {
            setIsEdit(!isEdit)
            setFullNameChanged(false)
            setNumberForSentChanged(false)
          }}
        >
          Редактировать профиль
        </BtnText>
      ) : (
        <BtnText
          classes={[
            stylesBtnText.btnTextBig,
            fullNameChanged || numberForSentChanged
              ? stylesBtnText.colorPrimary
              : stylesBtnText.colorHighlightLight,
            stylesBtnText.width100,
          ]}
          onClick={handleSaveChange}
          disabled={offButton}
        >
          Сохранить изменения
        </BtnText>
      )}
    </div>
  )
}
