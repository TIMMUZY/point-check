import styles from './ModalActionWithAva.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import BtnTextMiniModal from '../../UI/btnTextMiniModal/BtnTextMiniModal'
import { Delete } from '../../../utilits/icon/delete'
import { Edit } from '../../../utilits/icon/edit'
import { delAvatarApi } from '../../API/AvatarApi'
import { removeAvatarUrl } from '../../../store/slices/avatarSlice'
import { toast } from 'react-toastify'

export default function ModalActionWithAva({ filePicker }) {
  const [offButton, setOffButton] = useState(false)
  const dispatch = useDispatch()

  const handleUploadFile = async () => {
    filePicker.current.click()
  }

  const handleDel = async () => {
    try {
await delAvatarApi()
      dispatch(removeAvatarUrl())
      setOffButton(true)
      toast.success('Аватар удален успешно!')
    } catch (currentError) {
      toast.error(currentError.message, { className: styles.errorTost })
    } finally {
      setOffButton(false)
    }
  }

  return (
    <div className={styles.container}>
      <BtnTextMiniModal
        icon={<Edit />}
        onClick={handleUploadFile}
        disabled={offButton}
      >
        Обновить фотографию
      </BtnTextMiniModal>
      <BtnTextMiniModal
        icon={<Delete />}
        onClick={handleDel}
        disabled={offButton}
      >
        Удалить фотографию
      </BtnTextMiniModal>
    </div>
  )
}
