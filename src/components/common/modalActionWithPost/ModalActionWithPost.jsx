import styles from './ModalActionWithPost.module.css'
import BtnTextMiniModal from '../../UI/btnTextMiniModal/BtnTextMiniModal'
import { Delete } from '../../../utilits/icon/delete'
import { Edit } from '../../../utilits/icon/edit'
import { useMemo } from 'react'

export default function ModalActionWithPost({ post, setIsShowModalDelete, handleEditPost, setCurrentModalPostId, setNewSessionStoragePost, ...props }) {
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])
  
  async function handleChangePost() {
    handleEditPost()
    setCurrentModalPostId('')
    sessionStorage.setItem('editPost', JSON.stringify(post))
    setNewSessionStoragePost(Math.random())
  }

  function openModalDelete() {
    setIsShowModalDelete(true)
  }

  return (
    <div className={styles.container} {...props}>
      <BtnTextMiniModal
        icon={<Edit />}
        onClick={handleChangePost}
      >
        Изменить пост охраны
      </BtnTextMiniModal>
      {user.role === 'ADMIN' &&
        <BtnTextMiniModal
          icon={<Delete />}
          onClick={openModalDelete}
        >
          Удалить пост охраны
        </BtnTextMiniModal>}
    </div>
  )
}

