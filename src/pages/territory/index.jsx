import styles from './Territory.module.css'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import TerritoryInfo from "../../components/territoryInfo/TerritoryInfo"
import TerritoryLists from "../../components/territoryLists/TerritoryLists"
import { ArrowMiniRight } from '../../utilits/icon/arrowMiniRight'
import { getTerritory } from '../../components/API/TerritoryApi'

export default function TerritoryPage() {
  const [errorTerr, setErrorTerr] = useState(null)
  const [territory, setTerritory] = useState({})

  const navigate = useNavigate()
  const { id } = useParams()
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  useEffect(() => {
    fetchTerritory(id)
  }, [])

  const handleBack = () => {
    navigate(`/territories`)
  }

  async function fetchTerritory(id) {
    try {
      const response = await getTerritory(id)
      setTerritory(response)
      setErrorTerr(null)
    } catch (currentError) {
      setErrorTerr(currentError.message)
    }
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>
        <span onClick={handleBack} style={{ cursor: 'pointer' }}>
          Объекты
        </span>
        <span className={styles.arrow}>
          <ArrowMiniRight />
        </span>
        <span className={styles.name}>{territory.name}</span>
      </h2>
      <TerritoryInfo
        territory={territory}
        errorTerr={errorTerr}
      />
      {(!errorTerr && user.role !== 'USER') &&
        <TerritoryLists />}
    </main>
  )
}
