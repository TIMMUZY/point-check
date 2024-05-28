import styles from './Filter.module.css';
import { useEffect, useMemo, useState } from 'react';
import BtnIcon from '../../UI/btnIcon/BtnIcon';
import stylesBtnIcon from '../../UI/btnIcon/BtnIcon.module.css';
import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../UI/btnText/BtnText.module.css'
import MultiSelect from '../../UI/multiSelect/MultiSelect'
// import MultiSelectDate from '../../components/UI/multiSelectDate/MultiSelect'
import InputSearch from '../../UI/inputSearch/InputSearch'
import { getTerritoryAll, getTerritoryUser } from '../../API/TerritoryApi'
import { Heart } from '../../../utilits/icon/heart'
import { Ticket } from '../../../utilits/icon/ticket'
import { Home } from '../../../utilits/icon/home'
// import { Calendar } from '../../utilits/icon/calendar'
import { Tick } from '../../../utilits/icon/tick'
import { Close } from '../../../utilits/icon/close'

export default function Filter({
  filterFavorite,
  setFilterFavorite,
  filterType,
  setFilterType,
  filterTerritory,
  setFilterTerritory,
  filterStatus,
  seFilterStatus,
  filterAll,
  setFilterAll,
  search,
  setSearch
}) {

  const [territoryList, setTerritoryList] = useState([])
  const [currentFilter, setCurrentFilter] = useState(null)
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  async function fetchTerritory() {
    try {
      if (user.role === 'ADMIN') {
        const response = await getTerritoryAll()
        setTerritoryList(response.map(territory => territory.name))
      } else {
        const response = await getTerritoryUser()
        setTerritoryList(response.map(territory => territory.name))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTerritory()
  }, [])

  const type = ['Пешеходы', 'Автомобили']
  const status = ['Активный', 'Ожидает', 'Нет выезда', 'Выполнен', 'Отменен', 'Устарел']

  useEffect(() => {
    setFilterAll([...filterFavorite, ...filterType, ...filterTerritory, ...filterStatus])
  }, [filterFavorite, filterType, filterTerritory, filterStatus])

  function handleFavorite() {
    setFilterFavorite(filterFavorite.length ? [] : ['Избранное'])
  }

  function handleDelete(e) {
    const filter = e.currentTarget.parentNode.innerText
    setFilterFavorite(filterFavorite.filter(elem => elem !== filter))
    setFilterType(filterType.filter(elem => elem !== filter))
    setFilterTerritory(filterTerritory.filter(elem => elem !== filter))
    seFilterStatus(filterStatus.filter(elem => elem !== filter))
    setFilterAll(filterAll.filter(elem => elem !== filter))
  }

  function handleDeleteAll() {
    setFilterFavorite([])
    setFilterType([])
    setFilterTerritory([])
    seFilterStatus([])
    setFilterAll([])
    setSearch('')
  }

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

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filters}>
        {user.role === 'USER' &&
          <BtnIcon
            classes={[stylesBtnIcon.btnIconBig, stylesBtnIcon.square, filterFavorite.length ? stylesBtnIcon.colorActive : stylesBtnIcon.colorWhite]}
            icon={<Heart />}
            onClick={handleFavorite}
          />}
        <MultiSelect
          icon={<Ticket />}
          name={'type'}
          options={type}
          selected={filterType}
          setSelected={setFilterType}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        > Типы пропусков
        </MultiSelect>
        {territoryList.length > 1 &&
          <MultiSelect
            icon={<Home />}
            name={'territory'}
            options={territoryList}
            selected={filterTerritory}
            setSelected={setFilterTerritory}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          > Объекты
          </MultiSelect>}
        <MultiSelect
          icon={<Tick />}
          name={'status'}
          options={status}
          selected={filterStatus}
          setSelected={seFilterStatus}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        > Статус
        </MultiSelect>
        <InputSearch setSearch={setSearch} search={search}/>
      </div>
      <ul className={styles.selectedFilters}>
        {filterAll.map((elem) => {
          let color
          switch (elem) {
            case 'Активный': color = styles.active
              break
            case 'Ожидает': color = styles.waiting
              break
            case 'Нет выезда': color = styles.attention
              break
            case 'Выполнен': color = styles.inactive
              break
            case 'Отменен': color = styles.inactive
              break
            case 'Устарел': color = styles.inactive
              break
          }
          return (
            <li key={elem} className={styles.selectedFilter + ' ' + color}>
              {elem}
              <BtnIcon
                classes={[stylesBtnIcon.forFilterDelete]}
                icon={<Close />}
                onClick={handleDelete} />
            </li>
          )
        })}
        {(filterAll.length > 0 || search) &&
          <BtnText
            classes={[stylesBtnText.forFilterDeleteAll]}
            onClick={handleDeleteAll}
          >Сбросить все</BtnText>}
      </ul>
    </div>
  )
}
