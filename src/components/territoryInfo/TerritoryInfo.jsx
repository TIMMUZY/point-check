import styles from './TerritoryInfo.module.css'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from '../common/modal/Modal'
import ModalEditNote from './modalEditNote/ModalEditNote'
import NotificationDelete from '../common/notificationDelete/NotificationDelete'
import BtnText from '../UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import BtnIcon from '../UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../components/UI/btnIcon/BtnIcon.module.css'
import { AvaTerritoryGray } from '../../utilits/icon/avaTerritory/AvaTerritoryGray'
import { PaperPlane } from '../../utilits/icon/paperPlane'
import { Delete } from '../../utilits/icon/delete'
import { Edit } from '../../utilits/icon/edit'
import { deleteTerritory, editTerritory } from '../API/TerritoryApi'
import { getTerritoryAvatarApi } from '../API/AvatarApi'

export default function TerritoryInfo({ territory, errorTerr }) {
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [isShowModalEditNote, setIsShowModalEditNote] = useState(false)
  const [territoryNote, setTerritoryNote] = useState('')
  const [avatarUrl, setAvatarUrl] = useState(null)

  const navigate = useNavigate()
  const { id } = useParams()
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  useEffect(() => {
    setTerritoryNote(territory.note)
  }, [territory])

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const responseGet = await getTerritoryAvatarApi(id)
        if (responseGet) {
          const blob = await responseGet.blob()
          setAvatarUrl(URL.createObjectURL(blob))
        }
      } catch (currentError) {
        console.log(currentError)
      }
    }

    fetchAvatar()
  }, [])

  const handleEditTerritory = () => {
    sessionStorage.setItem('editTerritory', JSON.stringify(territory))
    navigate('/editTerritory')
  }

  const handleDelete = () => {
    setIsShowModalDelete(true)
  }

  const handleOpenEditNote = () => {
    setIsShowModalEditNote(true)
  }

  const handleEditNote = async (note) => {
    try {
      const response = await editTerritory(
        territory.id,
        territory.name,
        territory.city,
        territory.address,
        note,
      )
      if (response?.status < 400) {
        toast.success('Примечание территории изменено!')
      }
    } catch (currentError) {
      toast.error(currentError.message, { className: styles.error })
    }
  }

  const handleDeleteNote = () => {
    handleEditNote('')
    setTerritoryNote('')
  }

  const handleDeleteTerritory = async () => {
    try {
      const response = await deleteTerritory(id)
      navigate(`/territories`)
      if (response?.status < 400) {
        toast.success('Территория удалена!')
      }
    } catch (currentError) {
      toast.error(currentError.message, { className: styles.error })
    }
  }

  return (
    <>
      {user.role === 'ADMIN' &&
        <Modal
          isShowModal={isShowModalDelete}
          setIsShowModal={setIsShowModalDelete}
        >
          <NotificationDelete
            target={'территорию'}
            del={handleDeleteTerritory}
            setIsShowModal={setIsShowModalDelete}
          />
        </Modal>}
      {(user.role === 'ADMIN' || user.role === 'MANAGER') &&
        <Modal
          isShowModal={isShowModalEditNote}
          setIsShowModal={setIsShowModalEditNote}
        >
          <ModalEditNote
            isShowModalEditNote={isShowModalEditNote}
            setIsShowModal={setIsShowModalEditNote}
            territoryNote={territoryNote}
            handleEditNote={handleEditNote}
            setTerritoryNote={setTerritoryNote}
          />
        </Modal>}
      <div className={styles.infoWrapper}>
        <div className={styles.info}>
          <div className={styles.imageWrapper}>
            {avatarUrl ? (
              <img className={styles.image} src={avatarUrl} alt="" />
            ) : (
              <AvaTerritoryGray />
            )}
          </div>
          <div className={styles.infoContent}>
            <div className={styles.infoActions}>
              {(user.role === 'ADMIN' || user.role === 'MANAGER') &&
                !errorTerr && (
                  <>
                    <BtnText
                      classes={[
                        stylesBtnText.btnTextSmall,
                        stylesBtnText.colorSecondary,
                      ]}
                      icon={<Edit />}
                      onClick={handleEditTerritory}
                    >
                      Редактировать
                    </BtnText>
                    {user.role === 'ADMIN' && (
                      <BtnText
                        classes={[
                          stylesBtnText.btnTextSmall,
                          stylesBtnText.colorSecondary,
                        ]}
                        icon={<Delete />}
                        onClick={handleDelete}
                      >
                        Удалить
                      </BtnText>
                    )}
                  </>
                )}
            </div>
            <div className={styles.infoText}>
              <p className={styles.itemCity}>{territory.city}</p>
              <p className={styles.itemName}>{territory.name}</p>
              <p className={styles.itemAddress}>{territory.address}</p>
              {errorTerr && <div className="error">{errorTerr}</div>}
            </div>
          </div>
        </div>
        <div className={styles.other}>
          <h4 className={styles.noteTitle}>Примечание</h4>
          <p className={styles.noteText}>{territoryNote}</p>
          <div className={styles.noteActions}>
            {(user.role === 'ADMIN' || user.role === 'MANAGER') &&
              !errorTerr && (
                <>
                  {territoryNote ? (
                    <>
                      <BtnText
                        classes={[
                          stylesBtnText.btnTextSmall,
                          stylesBtnText.colorSecondary,
                        ]}
                        icon={<Edit />}
                        onClick={handleOpenEditNote}
                      >
                        Изменить примечание
                      </BtnText>
                      <BtnIcon
                        classes={[
                          stylesBtnIcon.btnIconSmall,
                          stylesBtnIcon.colorSecondary,
                          stylesBtnIcon.square,
                        ]}
                        icon={<Delete />}
                        onClick={handleDeleteNote}
                      />
                    </>
                  ) : (
                    <BtnText
                      classes={[
                        stylesBtnText.btnTextSmall,
                        stylesBtnText.colorSecondary,
                      ]}
                      iconRight={<PaperPlane />}
                      onClick={handleOpenEditNote}
                    >
                      Добавить примечание
                    </BtnText>
                  )}
                </>
              )}
          </div>
        </div>
      </div>
    </>
  )
}
