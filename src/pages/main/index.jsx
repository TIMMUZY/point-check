import styles from './Main.module.css'
import { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import PassListHeader from '../../components/passListHeader/PassListHeader'
import PassListContent from '../../components/passListContent/PassListContent'
import Pagination from '../../components/common/pagination/Pagination'
import { useLazyGetPassAllQuery } from '../../store/RTKQuery/pass'
import { isPassChangeSelector } from '../../store/selectors'
import { getPostsTerritory } from '../../components/API/PostApi'
// import { useGetPassTerritoryQuery } from '../../store/RTKQuery/pass'
import {
  // getPassTerritory,
  getTerritoryUser,
} from '../../components/API/TerritoryApi'

export default function MainPage() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [passList, setPassList] = useState([])
  const [postList, setPostList] = useState([])
  const [selectPost, setSelectPost] = useState(
    JSON.parse(sessionStorage.getItem('post')) || {},
  )
  const [territoryName, setTerritoryName] = useState('')
  const [responsePages, setResponsePages] = useState(null)
  const [responseElements, setResponseElements] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(
    Number(sessionStorage.getItem('pageSize')) || 5,
  )
  const [filterFavorite, setFilterFavorite] = useState(
    JSON.parse(sessionStorage.getItem('filterFavorite')) || [],
  )
  const [filterType, setFilterType] = useState(
    JSON.parse(sessionStorage.getItem('filterType')) || [],
  )
  const [filterTerritory, setFilterTerritory] = useState(
    JSON.parse(sessionStorage.getItem('filterTerritory')) || [],
  )
  const [filterStatus, seFilterStatus] = useState(
    JSON.parse(sessionStorage.getItem('filterStatus')) || [],
  )
  const [filterAll, setFilterAll] = useState([])
  const [search, setSearch] = useState('')
  const isPassChange = useSelector(isPassChangeSelector)
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  const [getPassList, { isLoading: loadingPass, data }] =
    useLazyGetPassAllQuery()

    useEffect(() => {
      setPageNumber(1)
    }, [search])

  async function fetchData(
    pageNumber,
    pageSize,
    dtypeF = '',
    territoryF = '',
    statusF = '',
    favoriteF = '',
    partF = '',
  ) {
    try {
      setLoading(true)
      let endpoint = ''
      let territories = []
      let territoryPostList = []

      switch (user.role) {
        case 'USER':
          endpoint = `/users/${user.id}?page=${pageNumber}&size=${pageSize}${dtypeF}${territoryF}${statusF}${favoriteF}${partF}`
          break
        case 'SECURITY':
          territories = await getTerritoryUser()
          territoryPostList = await getPostsTerritory(territories[0].id)
          endpoint = `/territories/${territories[0].id}?page=${pageNumber}&size=${pageSize}${dtypeF}${statusF}${partF}`
          setPostList(territoryPostList)
          setTerritoryName(territories[0].name)
          break
        case 'MANAGER':
          endpoint = `/users/${user.id}/territories?page=${pageNumber}&size=${pageSize}${dtypeF}${territoryF}${statusF}${partF}`
          break
        case 'ADMIN':
          endpoint = `?page=${pageNumber}&size=${pageSize}${dtypeF}${territoryF}${statusF}${partF}`
          break
      }

      const responseData = await getPassList(endpoint).unwrap()
      setPassList(responseData.content)
      setResponsePages(responseData.totalPages)
      setResponseElements(responseData.totalElements)
      setError(null)
    } catch (currentError) {
      setError(currentError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const statusMap = {
      Активный: 'ACTIVE',
      Ожидает: 'DELAYED',
      'Нет выезда': 'WARNING',
      Выполнен: 'COMPLETED',
      Отменен: 'CANCELLED',
      Устарел: 'OUTDATED',
    }

    function transformStatusFilters(filters) {
      return filters.map((elem) => statusMap[elem])
    }

    let dtypeF = []
    if (filterType.includes('Пешеходы')) {
      dtypeF.push('WALK')
    }
    if (filterType.includes('Автомобили')) {
      dtypeF.push('AUTO')
    }
    dtypeF = dtypeF.length ? '&dtype=' + dtypeF.join('%2C') : ''
    let territoryF = filterTerritory.length
      ? '&territory=' + filterTerritory.join('%2C')
      : ''
    let statusF = filterStatus.length
      ? '&status=' + transformStatusFilters(filterStatus).join('%2C')
      : ''
    let favoriteF = filterFavorite.length ? '&favorite=true' : ''
    let partF = search ? `&part=${search}` : ''

    fetchData(
      pageNumber - 1,
      pageSize,
      dtypeF,
      territoryF,
      statusF,
      favoriteF,
      partF,
    )
  }, [filterAll, pageNumber, pageSize, search, isPassChange, data])

  return (
    <main className={styles.main}>
      <PassListHeader
        selectPost={selectPost}
        setSelectPost={setSelectPost}
        territoryName={territoryName}
        postList={postList}
      />
      <PassListContent
        error={error}
        loading={loading}
        passList={passList}
        setPassList={setPassList}
        selectPost={selectPost}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        filterType={filterType}
        setFilterType={setFilterType}
        filterFavorite={filterFavorite}
        setFilterFavorite={setFilterFavorite}
        filterTerritory={filterTerritory}
        setFilterTerritory={setFilterTerritory}
        filterStatus={filterStatus}
        seFilterStatus={seFilterStatus}
        filterAll={filterAll}
        setFilterAll={setFilterAll}
        search={search}
        setSearch={setSearch}
        loadingPass={loadingPass}
      />
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        responsePages={responsePages}
        responseElements={responseElements}
      />
    </main>
  )
}
