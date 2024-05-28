import styles from './EditTerritory.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TerritoryForm from '../../components/territoryForm/TerritoryForm'
import BtnIcon from '../../components/UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../components/UI/btnIcon/BtnIcon.module.css'
import { Close } from '../../utilits/icon/close'

export default function EditTerritoryPage() {
  const [id, setId] = useState('')

  const navigate = useNavigate()
  const territory = JSON.parse(sessionStorage?.getItem('editTerritory'))

  useEffect(() => {
    setId(territory.id)
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.territory}>
        <div className={styles.territoryHead}>
          <h2>Редактировать объект</h2>
          <BtnIcon
            classes={[
              stylesBtnIcon.btnIconMedium,
              stylesBtnIcon.colorSecondary,
            ]}
            icon={<Close />}
            onClick={() => navigate(`/territory/${id}`)}
          />
        </div>
        <TerritoryForm
          edit
          id={id}
        />
      </div>
    </main>
  )
}
