import styles from './PassListHeader.module.css'
import { useState, useMemo, useEffect } from 'react'
import SelectSecurity from '../UI/selectSecurity/SelectSecurity'
import ModalSecurity from './modalSecurity/ModalSecurity'
import ModalChoicePost from './modalChoicePost/ModalChoicePost'

export default function PassListHeader({ selectPost, setSelectPost, territoryName, postList }) {
  const [isShowModal, setIsShowModal] = useState(false)
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  useEffect(() => {
    if (user.role === 'SECURITY') {
      const storedPost = JSON.parse(sessionStorage.getItem('post'))
      if (storedPost) {
        setSelectPost(storedPost)
      } else {
        setIsShowModal(true)
      }
    }
  }, [])

  return (
    <>
      <ModalSecurity isShowModal={isShowModal}>
        <ModalChoicePost
          postList={postList}
          setSelectPost={setSelectPost}
          setIsShowModal={setIsShowModal}
        />
      </ModalSecurity>
      <div className={styles.passListTitle}>
        <h2 className={styles.title}>Пропуска</h2>
        {user.role === 'SECURITY' &&
          (selectPost.name ? (
            <div className={styles.postWrapper}>
              <h3 className={styles.territoryName}>{territoryName}</h3>
              <SelectSecurity
                name={'post'}
                options={postList}
                selected={selectPost.name}
                setSelected={setSelectPost}
              />
            </div>
          ) : (
            <h3 className={styles.territoryName} style={{ color: 'red' }}>
              КПП НЕ ВЫБРАНО
            </h3>
          ))}
      </div>
    </>
  )
}
