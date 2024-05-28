import styles from './TerritoriesContent.module.css'
import { useNavigate } from 'react-router-dom'
import TerritoryItem from './territoryItem/TerritoryItem'
import EmptyList from '../common/stubs/EnptyList'
import Loader from '../UI/loader/Loader'

export default function TerritoriesContent({ error, isLoading, territoryList }) {
  const navigate = useNavigate()

  return (
    <ul className={styles.table}>
      {error && <div className="error">{error}</div>}
      {isLoading ? <Loader /> :
        territoryList?.length ?
          territoryList.map((territory) => {
            return <TerritoryItem key={territory.id} territory={territory}
              onClick={() => navigate(`/territory/${territory.id}`)}
            />
          })
          : <EmptyList />
      }
    </ul>
  )
}
