import styles from './TerritoriesAvatar.module.css'
import { useState, useEffect } from 'react'
import { getTerritoryAvatarApi } from '../../API/AvatarApi'
import { AvaTerritoryGray } from '../../../utilits/icon/avaTerritory/AvaTerritoryGray'

export default function TerritoryAvatar({ id }) {
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await getTerritoryAvatarApi(id)
        if (response) {
          const blob = await response.blob()
          setAvatarUrl(URL.createObjectURL(blob))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAvatar()
  }, [])

  return (
    <div className={styles.wrapper}>
      {avatarUrl ? (
        <img className={styles.image} src={avatarUrl} alt="avatarTerritory" />
      ) : (
        <AvaTerritoryGray />
      )}
    </div>
  )
}
