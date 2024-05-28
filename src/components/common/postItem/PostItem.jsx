import styles from './PostItem.module.css'
import MiniModal from '../miniModal/MiniModal'
import PostType from '../postType/PostType'
import ModalActionWithPost from '../../common/modalActionWithPost/ModalActionWithPost'
import { Option } from '../../../utilits/icon/option'
import { useEffect, useMemo, useState } from 'react'
import { AvaPostGray } from '../../../utilits/icon/avaPost/AvaPostGray'
import { deletePost } from '../../API/PostApi'
import NotificationDelete from '../notificationDelete/NotificationDelete'
import Modal from '../modal/Modal'
import { toast } from 'react-toastify'

export default function PostItem({ post, fetchPosts, territoryId, currentModalPostId, setCurrentModalPostId, handleEditPost, setNewSessionStoragePost, ...props }) {
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  async function handleDeletePost() {
    try {
      const response = await deletePost(post.id)
      await fetchPosts(territoryId)
      if (response?.status < 400) {
        toast.success('Пост охраны удалён!')
      }
    } catch (currentError) {
      toast.error(currentError.message, { className: styles.error })
    }
  }

  const handleOption = () => {
    if (currentModalPostId === post.id) {
      setIsShowModal(!isShowModal)
    } else {
      setCurrentModalPostId(post.id)
    }
  }

  useEffect(() => {
    if (currentModalPostId === post.id) {
      setIsShowModal(true)
    } else {
      setIsShowModal(false)
    }
  }, [currentModalPostId])

  return (
    <>
      <li className={styles.item} {...props}>
        <MiniModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
          <ModalActionWithPost
            post={post}
            setIsShowModalDelete={setIsShowModalDelete}
            setCurrentModalPostId={setCurrentModalPostId}
            handleEditPost={handleEditPost}
            setNewSessionStoragePost={setNewSessionStoragePost}
          />
        </MiniModal>
        <div className={styles.imageWrapper}>
          {/* <img className={styles.image} src={person.avatar} alt="" /> */}
          <AvaPostGray />
        </div>
        <p className={styles.name}>{post.name}</p>
        <p className={styles.note}>{post.note}</p>
        <PostType className={styles.type}>
          {post.type}
        </PostType>
        {(user.role === 'ADMIN' || user.role === 'MANAGER') &&
          <button className={[styles.btnOption, styles.option, isShowModal ? styles.activeModal : ''].join(' ') + ' modal'} onClick={handleOption} type="button"><Option /></button>}
      </li>
      <Modal isShowModal={isShowModalDelete} setIsShowModal={setIsShowModalDelete}>
        <NotificationDelete
          target={'пост охраны'}
          del={handleDeletePost}
          setIsShowModal={setIsShowModalDelete} />
      </Modal>
    </>
  )
}
