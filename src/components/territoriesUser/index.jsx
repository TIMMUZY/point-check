import { useEffect, useState } from 'react'
import styles from './TerritoriesUser.module.css'
import { getTerritoryUserId } from '../API/TerritoryApi'
import ButtonShowHide from './buttonShowHide/ButtonShowHide'
import TerritoryList from './territoryList/TerritoryList'

export default function TerritoriesUser({ id }) {
  const [territoryUser, setTerritoryUser] = useState(null)
  const [openList, setOpenList] = useState(false)

  useEffect(() => {
    const fetchTerritory = async () => {
      try {
        const response = await getTerritoryUserId(id)
        setTerritoryUser(response)
      } catch (currentError) {
        console.error(currentError)
      }
    }
    fetchTerritory()
  }, [id])

  const getTerritoryList = () => {
    if (territoryUser?.length > 2 && openList === false) {
      return territoryUser.slice(0, 2)
    }
    return territoryUser
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Ваши объекты</h2>
      {territoryUser?.length ? (
        <>
          <TerritoryList territoryUser={getTerritoryList()} />
          {territoryUser?.length > 2 && (
            <ButtonShowHide openList={openList} setOpenList={setOpenList} />
          )}
        </>
      ) : (
        <p className={styles.text}>У вас нет закреплённых территорий</p>
      )}
    </div>
  )
}
