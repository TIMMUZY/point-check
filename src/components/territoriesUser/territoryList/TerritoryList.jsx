import styles from './TerritoryList.module.css'
import { useNavigate } from 'react-router-dom'
import TerritoryAvatar from '../territoryAvatar/TerritoriesAvatar'
import { ArrowMiniRight } from '../../../utilits/icon/arrowMiniRight'

export default function TerritoryList({ territoryUser }) {
  const navigate = useNavigate()

  return territoryUser?.map((territory) => (
    <div
      key={territory.id}
      className={styles.territory}
      onClick={() => navigate(`/territory/${territory.id}`)}
    >
      <div className={styles.block}>
        <TerritoryAvatar id={territory.id} />
        <div className={styles.info}>
          <p className={styles.city}>{territory.city}</p>
          <p className={styles.name}>{territory.name}</p>
          <p className={styles.address}>{territory.address}</p>
        </div>
      </div>
      <span className={styles.arrow}>
        <ArrowMiniRight />
      </span>
    </div>
  ))
}
