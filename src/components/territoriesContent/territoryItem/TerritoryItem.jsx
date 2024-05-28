import styles from './TerritoryItem.module.css'
import { useEffect, useState } from 'react'
import { AvaTerritoryGray } from '../../../utilits/icon/avaTerritory/AvaTerritoryGray'
import { getTerritoryAvatarApi } from '../../API/AvatarApi'

export default function TerritoryItem({ territory, ...props }) {
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const responseGet = await getTerritoryAvatarApi(territory.id)
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
  
  return (
    <li className={styles.item} {...props}>
      <div className={styles.itemImageWrapper}>
      {avatarUrl ? (
              <img className={styles.itemImage} src={avatarUrl} alt="avatarTerrytory" />
            ) : (
              <AvaTerritoryGray />
            )}
      </div>
      <p className={styles.itemName}>{territory.name}</p>
      <div className={styles.infoText}>
        <p className={styles.itemCity}>{territory.city}</p>
        <p className={styles.itemAddress}>{territory.address}</p>
      </div>
      <p className={styles.itemNote}>{territory.note}</p>
    </li>
  )
}
