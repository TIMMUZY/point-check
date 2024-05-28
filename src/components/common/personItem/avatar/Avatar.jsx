import styles from './Avatar.module.css'
import { AvaBlock } from '../../../../utilits/icon/avaBlock'
import { AvaBlockWrapper } from '../../../../utilits/icon/avaBlockWrapper'
import { AvaPersonGray } from '../../../../utilits/icon/avaPerson/AvaPersonGray'
import { useEffect, useState } from 'react'
import { getAvatarApiId } from '../../../API/AvatarApi'

export default function Avatar({ person, isBlock }) {
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const responseGet = await getAvatarApiId(person.id)
        const blob = await responseGet.blob()
        setAvatarUrl(URL.createObjectURL(blob))
      } catch (currentError) {
        console.error(currentError)
      }
    }

    fetchAvatar()
  }, [person.id])

  return (
    <div className={styles.imageWrapper}>
      {avatarUrl ? (
        isBlock ? (
          <AvaBlockWrapper>
            <img className={styles.image} src={avatarUrl} alt="avatar" />
          </AvaBlockWrapper>
        ) : (
          <img className={styles.image} src={avatarUrl} alt="avatar" />
        )
      ) : isBlock ? (
        <AvaBlock />
      ) : (
        <AvaPersonGray />
      )}
    </div>
  )
}
