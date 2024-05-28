import styles from './AddTerritory.module.css'
import { useNavigate } from 'react-router-dom'
import TerritoryForm from '../../components/territoryForm/TerritoryForm'
import BtnIcon from '../../components/UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../components/UI/btnIcon/BtnIcon.module.css'
import { Close } from '../../utilits/icon/close'

export default function AddTerritoryPage() {
  const navigate = useNavigate()
  
  return (
    <main className={styles.main}>
      <div className={styles.territory}>
        <div className={styles.territoryHead}>
          <h2>Добавить объект</h2>
          <BtnIcon
            classes={[
              stylesBtnIcon.btnIconMedium,
              stylesBtnIcon.colorSecondary,
            ]}
            icon={<Close />}
            onClick={() => navigate('/territories')}
          />
        </div>
        <TerritoryForm />
      </div>
    </main>
  )
}
