import styles from './PersonItem.module.css'
import { useState, useEffect, useMemo } from 'react'
import UserRole from '../userRole/UserRole'
import { Option } from '../../../utilits/icon/option'
import ModalActionWithUser from '../../common/modalActionWithUser/ModalActionWithUser'
import MiniModal from '../miniModal/MiniModal'
import Modal from '../modal/Modal'
import { deleteUser } from '../../API/DeleteUser'
import { changeRole } from '../../API/ChangeRole'
import {
  getTerritoryUserId,
  getTerritoryUserIdGeneral,
} from '../../API/TerritoryApi'
import NotificationDelete from '../notificationDelete/NotificationDelete'
import ModalChangeRole from '../modalChangeRole/ModalChangeRole'
import { toast } from 'react-toastify'
import Avatar from './avatar/Avatar'

export default function PersonItem({
  person,
  setNeedFetchUsers,
  territoryId,
  fromUsersList,
  currentModalUserId,
  setCurrentModalUserId,
  ...props
}) {
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [isShowModalChangeRole, setIsShowModalChangeRole] = useState(false)
  const [territoryUser, setTerritoryUser] = useState(null)
  const [selectedRole, setSelectedRole] = useState(person.role)
  const [isBlock, setIsBlock] = useState(person.isBlocked)
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  useEffect(() => {
    const fetchTerrytory = async () => {
      let responseGet = []
      try {
        if (user.role === 'MANAGER') {
          responseGet = await getTerritoryUserIdGeneral(person.id)
        } else if (user.role === 'ADMIN') {
          responseGet = await getTerritoryUserId(person.id)
        }
        setTerritoryUser(responseGet)
      } catch (currentError) {
        console.error(currentError)
      }
    }
    fetchTerrytory()
  }, [person.id])

  async function handleChangeRole(option) {
    try {
      const response = await changeRole(person.id, option)
      setNeedFetchUsers(Math.random())
      setIsShowModalChangeRole(false)
      setCurrentModalUserId('')
      if (response?.status < 400) {
        toast.success('Роль пользователя изменена!')
      }
    } catch (currentError) {
      toast.error(currentError.message, { className: styles.error })
    }
  }

  async function DeleteUser() {
    try {
      const response = await deleteUser(person.id)
      setNeedFetchUsers(Math.random())
      if (response?.status < 400) {
        toast.success('Пользователь удалён!')
      }
    } catch (currentError) {
      toast.error(currentError.message, { className: styles.error })
    }
  }

  const handleOption = () => {
    if (currentModalUserId === person.id) {
      setIsShowModal(!isShowModal)
      setIsShowModalChangeRole(false)
    } else {
      setCurrentModalUserId(person.id)
    }
  }

  useEffect(() => {
    setIsShowModalChangeRole(false)
    if (currentModalUserId === person.id) {
      setIsShowModal(true)
    } else {
      setIsShowModal(false)
    }
  }, [currentModalUserId])

  return (
    <>
      <li className={styles.item} {...props}>
        <div className={isBlock ? styles.wrapperBlock : styles.wrapperContent}>
          <Avatar person={person} isBlock={isBlock} />
          <p className={styles.name}>{person.fullName}</p>
          <p className={styles.tel}>{person.mainNumber}</p>
          <p className={styles.email}>{person.email}</p>
          {fromUsersList && (
            <div className={styles.territoryWrup}>
              {territoryUser?.map((territory) => (
                <p key={territory.id} className={styles.territory}>
                  {territory.name}
                </p>
              ))}
            </div>
          )}
          <div className={styles.role}>
            <UserRole>{person.role}</UserRole>
          </div>
        </div>

        {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
          <button
            className={
              [
                styles.btnOption,
                styles.option,
                isShowModal ? styles.activeModal : '',
              ].join(' ') + ' modal'
            }
            onClick={handleOption}
            type="button"
          >
            <Option />
          </button>
        )}

        <MiniModal
          isShowModal={isShowModalChangeRole}
          setIsShowModal={setIsShowModalChangeRole}
          role
        >
          <ModalChangeRole
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            handleChangeRole={handleChangeRole}
          />
        </MiniModal>
        <MiniModal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
          {fromUsersList ? (
            <ModalActionWithUser
              person={person}
              setNeedFetchUsers={setNeedFetchUsers}
              territoryId={territoryId}
              setIsShowModalDelete={setIsShowModalDelete}
              isShowModalChangeRole={isShowModalChangeRole}
              setIsShowModalChangeRole={setIsShowModalChangeRole}
              setIsShowModal={setIsShowModal}
              isBlock={isBlock}
              setIsBlock={setIsBlock}
              fromUsersList
            />
          ) : (
            <ModalActionWithUser
              person={person}
              setNeedFetchUsers={setNeedFetchUsers}
              territoryId={territoryId}
              setIsShowModalDelete={setIsShowModalDelete}
              isShowModalChangeRole={isShowModalChangeRole}
              setIsShowModalChangeRole={setIsShowModalChangeRole}
              setIsShowModal={setIsShowModal}
              isBlock={isBlock}
              setIsBlock={setIsBlock}
            />
          )}
        </MiniModal>
      </li>

      <Modal
        isShowModal={isShowModalDelete}
        setIsShowModal={setIsShowModalDelete}
      >
        <NotificationDelete
          target={'пользователя'}
          del={DeleteUser}
          setIsShowModal={setIsShowModalDelete}
        />
      </Modal>
    </>
  )
}
