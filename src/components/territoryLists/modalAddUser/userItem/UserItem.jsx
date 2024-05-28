import styles from './UserIte.module.css'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import BtnText from '../../../UI/btnText/BtnText'
import stylesBtnText from '../../../../components/UI/btnText/BtnText.module.css'
import { AvaPersonWhite } from '../../../../utilits/icon/avaPerson/AvaPersonWhite'
import { ArrowRight } from '../../../../utilits/icon/arrowRight'
import { addUserToTerritory } from '../../../API/ActionUserToTerritory'

export default function UserItem({ territoryId, setNeedFetchUsers, allPersonList, user, ...props }) {
  const [linked, setLinked] = useState(false)

  useEffect(() => {
    setLinked(allPersonList.some(elem => elem.id === user.id))
  }, [])

  async function handleAddUser() {
    try {
      const response = await addUserToTerritory(territoryId, user.id)
      setNeedFetchUsers(Math.random())
      setLinked(true)
      if (response?.status < 400) {
        toast.success('Пользователь добавлен на территорию!')
      }
    } catch (error) {
      toast.error(error.message, { className: styles.error })
    }
  }

  return (
    <div className={styles.item} {...props}>
      <div className={styles.itemImageWrapper}>
        {/* <img className={styles.itemImage} src={user.avatar} alt="" /> */}
        <AvaPersonWhite />
      </div>
      <p className={styles.itemName}>{user.fullName}</p>
      <p className={styles.itemTel}>{user.mainNumber}</p>
      <p className={styles.itemEmail}>{user.email}</p>
      <div className={styles.itemAdd}>
        {!linked ?
          <BtnText
            classes={[stylesBtnText.btnTextSmall, stylesBtnText.colorPrimary]}
            iconRight={<ArrowRight />}
            onClick={handleAddUser}
          >
            Добавить
          </BtnText>
          :
          <BtnText
            classes={[stylesBtnText.btnTextSmall, stylesBtnText.disabled]}
            disabled
          >
            Добавлен
          </BtnText>
        }
      </div>
    </div>
  )
}