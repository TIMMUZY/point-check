import styles from './FilterUser.module.css'
import { Home } from '../../../utilits/icon/home'
import { Profile } from '../../../utilits/icon/profile'
import BtnIcon from '../../UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../UI/btnIcon/BtnIcon.module.css'
import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../UI/btnText/BtnText.module.css'
import InputSearch from '../../UI/inputSearch/InputSearch'
import MultiSelect from '../../UI/multiSelect/MultiSelect'
import { useEffect, useState } from 'react'
import { getTerritoryAll, getTerritoryUser } from '../../API/TerritoryApi'
import { Close } from '../../../utilits/icon/close'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterUsersByBlocking } from '../../../store/slices/filterUsersSlice'

export default function FilterUser({ user, search, setSearch }) {
  const [territoryList, setTerritoryList] = useState([])
  const [filterTerritory, setFilterTerritory] = useState([])
  const [filterUserRole, setFilterUserRole] = useState([])
  const [currentFilter, setCurrentFilter] = useState(null)
  const [filterAll, setFilterAll] = useState([])
  const dispatch = useDispatch()

  const userRoleList = [
    { role: 'USER', roleRus: 'Пользователь' },
    { role: 'SECURITY', roleRus: 'Охрана' },
    { role: 'MANAGER', roleRus: 'Менеджер' },
    { role: 'ADMIN', roleRus: 'Админ' },
  ]

  function getListUserRoleRus(list) {
    return list.map((roles) => roles.roleRus)
  }

  const filterUsersByBlocking = useSelector(
    (state) => state.filterUsers.filterUsersByBlocking,
  )

  async function fetchTerritory() {
    try {
      if (user.role === 'ADMIN') {
        const response = await getTerritoryAll()
        setTerritoryList(response.map((territory) => territory.name))
      } else {
        const response = await getTerritoryUser()
        setTerritoryList(response.map((territory) => territory.name))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTerritory()
  }, [])

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Проверяем, был ли клик выполнен внутри фильтров
      if (!event.target.closest('.filter')) {
        setCurrentFilter('')
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  function handleDelete(e) {
    const filter = e.currentTarget.parentNode.innerText
    setFilterTerritory(filterTerritory.filter((elem) => elem !== filter))
    setFilterUserRole(filterUserRole.filter((elem) => elem !== filter)),
      setFilterAll(filterAll.filter((elem) => elem !== filter))
  }

  function handleDeleteAll() {
    dispatch(setFilterUsersByBlocking('Все пользователи'))
    setFilterTerritory([])
    setFilterUserRole([])
    setFilterAll([])
    setSearch('')
  }

  useEffect(() => {
    setFilterAll([...filterTerritory, ...filterUserRole])
  }, [filterTerritory, filterUserRole])

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filters}>
        <MultiSelect
          icon={<Home />}
          name={'territory'}
          options={territoryList}
          selected={filterTerritory}
          setSelected={setFilterTerritory}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        >
          Объекты
        </MultiSelect>
        <MultiSelect
          icon={<Profile />}
          name={'role'}
          options={getListUserRoleRus(userRoleList)}
          selected={filterUserRole}
          setSelected={setFilterUserRole}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        >
          Роль
        </MultiSelect>
        <InputSearch search={search} setSearch={setSearch} />
      </div>

      <ul className={styles.selectedFilters}>
        {filterAll.map((elem) => {
          return (
            <li key={elem} className={styles.selectedFilter}>
              {elem}
              <BtnIcon
                classes={[stylesBtnIcon.forFilterDelete]}
                icon={<Close />}
                onClick={handleDelete}
              />
            </li>
          )
        })}
        {(filterAll.length > 0 ||
          search ||
          filterUsersByBlocking !== 'Все пользователи') && (
          <BtnText
            classes={[stylesBtnText.forFilterDeleteAll]}
            onClick={handleDeleteAll}
          >
            Сбросить все
          </BtnText>
        )}
      </ul>
    </div>
  )
}
