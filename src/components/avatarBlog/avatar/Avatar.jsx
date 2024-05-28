import styles from './Avatar.module.css'
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BtnText from '../../UI/btnTextNew/BtnText'
import stylesBtnText from '../../UI/btnText/BtnText.module.css'
import MiniModalAva from '../miniModalAva/MiniModalAva'
import ModalActionWithAva from '../modalActionWithAva/ModalActionWithAva'
import { addAvatarApi, getAvatarApi } from '../../API/AvatarApi'
import { AvatarLogo } from '../../../utilits/icon/avatarLogo'
import { setAvatarUrl } from '../../../store/slices/avatarSlice'
import { avatarUrlSelector } from '../../../store/selectors'
import { toast } from 'react-toastify'

export function Avatar({ isEdit }) {
  const [offButton, setOffButton] = useState(false)
  const [isShow, setIsShow] = useState(false)

  const filePicker = useRef(null)

  const dispatch = useDispatch()
  const avatarUrl = useSelector(avatarUrlSelector)

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const responseGet = await getAvatarApi()
        const blob = await responseGet.blob()
        dispatch(setAvatarUrl(URL.createObjectURL(blob)))
      } catch (currentError) {
        console.log(currentError)
      }
    }

    fetchAvatar()
  }, [])

  const handleFileChange = async (e) => {
    // setSelectedFile(e.target.files[0])
    if (!e.target.files[0]) {
      alert('select a file')
      return
    }
    const formData = new FormData()
    formData.append('avatarFile', e.target.files[0])
    try {
      await addAvatarApi(formData)
      const responseGet = await getAvatarApi()
      const blob = await responseGet.blob()
      dispatch(setAvatarUrl(URL.createObjectURL(blob)))
      setOffButton(true)
      toast.success('Аватар установлен успешно!')
    } catch (currentError) {
      toast.error(currentError.message, { className: styles.errorTost })
    } finally {
      setOffButton(false)
    }
  }

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Проверяем, был ли клик выполнен внутри модалки или по кнопке "Загрузить аватар"
      if (!event.target.closest('.modal') && event.target.getAttribute('id') !== 'btnLoadAva' && event.target.getAttribute('type') !== 'file') {
        setIsShow(false)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return (
    <div className={styles.contentWrapAva}>
      <div className={styles.photoAvaBlog}>
        {avatarUrl ? (
          <img alt="avatar" src={avatarUrl} className={styles.imgAva} />
        ) : (
          <AvatarLogo />
        )}
      </div>
      {isEdit && (
        <>
          <input
            className={styles.hidden}
            type="file"
            ref={filePicker}
            onChange={handleFileChange}
            accept="image/*, .png, .jpg, .gif, .web,"
          />
          <BtnText
            classes={[
              stylesBtnText.btnTextMedium,
              stylesBtnText.colorHighlightLight,
            ]}
            onClick={() => {
              setIsShow(!isShow)
            }}
            disabled={offButton}
            id="btnLoadAva"
          >
            Редактировать аватар
          </BtnText>
          <MiniModalAva isShowModal={isShow} setIsShowModal={setIsShow}>
            <ModalActionWithAva filePicker={filePicker} />
          </MiniModalAva>
        </>
      )}
    </div>
  )
}
