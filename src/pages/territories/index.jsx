import styles from './Territories.module.css'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import TerritoriesContent from '../../components/territoriesContent'
import BtnText from '../../components/UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import InputSearch from '../../components/UI/inputSearch/InputSearch'
import { Plus } from '../../utilits/icon/plus'
import { getTerritoryAll, getTerritoryUser, getSearchTerritory } from '../../components/API/TerritoryApi'

export default function TerritoriesPage() {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [territoryList, setTerritoryList] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  useEffect(() => {
    fetchTerritory()
  }, [])

  useEffect(() => {
    if (user.role !== 'ADMIN' && territoryList.length === 1) {
      navigate(`/territory/${territoryList[0].id}`)
    }
  }, [territoryList])

  async function fetchTerritory() {
    try {
      if (user.role === 'ADMIN') {
        setIsLoading(true)
        const response = await getTerritoryAll()
        setTerritoryList(response)
      } else {
        const response = await getTerritoryUser()
        setTerritoryList(response)
      }
      setError(null)
    } catch (currentError) {
      setError(currentError.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function searchTerritory(part) {
    let response = []
    try {
      setIsLoading(true)
      response = await getSearchTerritory(part)
      setTerritoryList(response)
      setError(null)
    } catch (currentError) {
      setError(currentError.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user.role === 'ADMIN') {
      search ? searchTerritory(search) : fetchTerritory()
    }
  }, [search])

  return (
    <main className={styles.main}>
      <div className={styles.actionWrapper}>
        <h2 className={styles.title}>Объекты</h2>
        {user.role === 'ADMIN' &&
          <>
            <InputSearch setSearch={setSearch} />
            <div className={styles.button}>
              <BtnText
                classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
                icon={<Plus />}
                onClick={() => navigate('/addTerritory')}
              >
                Добавить объект
              </BtnText>
            </div>
          </>}
      </div>
      <TerritoriesContent
        error={error}
        isLoading={isLoading}
        territoryList={territoryList}
      />
    </main>
  )
}
