import styles from './ModalActionWithUser.module.css'
import BtnTextMiniModal from '../../UI/btnTextMiniModal/BtnTextMiniModal'
import { Profile } from '../../../utilits/icon/profile'
import { Delete } from '../../../utilits/icon/delete'
import { LockKeyCross } from '../../../utilits/icon/lockKey'
import { Block, UnBlock } from '../../../utilits/icon/block'
import { useMemo } from 'react'
import { blockUser } from '../../API/BlockUser'
import { detachUserToTerritory } from '../../API/ActionUserToTerritory'
import { toast } from 'react-toastify'

export default function ModalActionWithUser({
  person,
  setNeedFetchUsers,
  territoryId,
  setIsShowModalDelete,
  isShowModalChangeRole,
  setIsShowModalChangeRole,
  fromUsersList,
  setIsShowModal,
  isBlock,
  setIsBlock,
  ...props
}) {
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  async function handleDetachUser() {
    try {
      const response = await detachUserToTerritory(territoryId, person.id)
      setNeedFetchUsers(Math.random())
      setIsShowModalChangeRole(false)
      if (response?.status < 400) {
        toast.success('Пользователь откреплён от территории!')
      }
    } catch (error) {
      toast.error(error.message, { className: styles.error })
    }
  }

  async function handleBlockUser(block) {
    try {
      const response = await blockUser(block, person.id)
      setIsBlock(!isBlock)
      setIsShowModal(false)
      if (response?.status < 400) {
        block === 'block'
          ? toast.success('Пользователь заблокирован!')
          : toast.success('Пользователь разблокирован!')
      }
    } catch (error) {
      toast.error(error.message, { className: styles.error })
    }
  }

  function openModalChangeRole() {
    setIsShowModalChangeRole(!isShowModalChangeRole)
  }

  function openModalDelete() {
    setIsShowModalDelete(true)
  }

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.container}>
        <BtnTextMiniModal icon={<Profile />} onClick={openModalChangeRole}>
          Изменить роль пользователя
        </BtnTextMiniModal>
        {!fromUsersList && (
          <BtnTextMiniModal icon={<LockKeyCross />} onClick={handleDetachUser}>
            Открепить пользователя
          </BtnTextMiniModal>
        )}
        {isBlock ? (
          <BtnTextMiniModal
            icon={<UnBlock />}
            onClick={() => handleBlockUser('unblock')}
          >
            Разблокировать пользователя
          </BtnTextMiniModal>
        ) : (
          <BtnTextMiniModal
            icon={<Block />}
            onClick={() => handleBlockUser('block')}
          >
            Заблокировать пользователя
          </BtnTextMiniModal>
        )}
        {user.role === 'ADMIN' && (
          <BtnTextMiniModal icon={<Delete />} onClick={openModalDelete}>
            Удалить пользователя
          </BtnTextMiniModal>
        )}
      </div>
    </div>
  )
}
