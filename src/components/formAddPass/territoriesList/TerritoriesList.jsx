import styles from './TerritoriesList.module.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowMiniRight } from '../../../utilits/icon/arrowMiniRight'
import { AvaTerritoryWhite } from '../../../utilits/icon/avaTerritory/AvaTerritoryWhite'
import { getTerritoryAvatarApi } from '../../API/AvatarApi'
import { setTerritoryUser } from '../../../store/slices/passSlice'
import { territoriesUserSelector } from '../../../store/selectors'

export default function TerritoriesList({ isEdit }) {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const territoriesUserAll = useSelector(territoriesUserSelector)
  const { territoryUser } = useSelector((state) => state.pass)

  useEffect(() => {
    if (!isEdit) {
      dispatch(setTerritoryUser(territoriesUserAll[0]))
    }
  }, [territoriesUserAll])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const [avatarUrls, setAvatarUrls] = useState({})

  const fetchAvatar = async (item) => {
    try {
      const responseGet = await getTerritoryAvatarApi(item.id)
      if (responseGet) {
        const blob = await responseGet.blob()
        setAvatarUrls((prevUrls) => ({
          ...prevUrls,
          [item.id]: URL.createObjectURL(blob),
        }))
      }
    } catch (currentError) {
      console.log(currentError)
    }
  }

  useEffect(() => {
    territoriesUserAll.forEach((item) => {
      fetchAvatar(item)
    })
  }, [territoriesUserAll])

  const getTerritoriesList = () => {
    const territories = territoriesUserAll?.map((item) => (
      <li
        key={item.id}
        className={styles.li}
        onClick={() => {
          dispatch(setTerritoryUser(item)), toggleOpen()
        }}
      >
        <div className={styles.imageTerritory}>
          {avatarUrls[item.id] ? (
            <img
              src={avatarUrls[item.id]}
              className={styles.itemImage}
              alt="Territory Avatar"
            />
          ) : (
            <AvaTerritoryWhite />
          )}
        </div>
        <div className={styles.blockTerritory + ' ' + styles.border}>
          <div className={styles.descriptionTerritory}>
            <h1 className={styles.nameTerritory}>{item.name}</h1>
            <p className={styles.noteTerritory}>{item.note}</p>
          </div>
          <div className={styles.svg}>
            <input
              type="radio"
              className={styles.input}
              checked={item.name === territoryUser?.name}
              onChange={() => { }}
            />
          </div>
        </div>
      </li>
    ))

    return territories
  }

  return (
    <div
      className={`${styles.typeWrapper} ${territoriesUserAll?.length > 1 && !isEdit && styles.cursor
        }`}
      onClick={toggleOpen}
    >
      <div className={styles.imageTerritory}>
        {avatarUrls[territoryUser?.id] ? (
          <img
            src={avatarUrls[territoryUser.id]}
            className={styles.itemImage}
            alt="Territory Avatar"
          />
        ) : (
          <AvaTerritoryWhite />
        )}
      </div>
      <div className={styles.blockTerritory}>
        <div className={styles.descriptionTerritory}>
          <h1 className={styles.nameTerritory}>{territoryUser?.name}</h1>
          <p className={styles.noteTerritory}>{territoryUser?.note}</p>
        </div>

        <div className={styles.svg}>
          {territoriesUserAll?.length > 1 && !isEdit && (
            <ArrowMiniRight
              className={isOpen ? styles.rotateUp : styles.rotateDown}
            />
          )}
        </div>
      </div>

      {isOpen && !isEdit && territoriesUserAll?.length > 1 && (
        <ul className={styles.ul}>{getTerritoriesList()}</ul>
      )}
    </div>
  )
}
