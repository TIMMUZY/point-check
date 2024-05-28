import styles from './PassListContent.module.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Filter from './filter/Filter'
import EmptyList from '../common/stubs/EnptyList'
import EmptySearch from '../common/stubs/EnptySearch'
import Loader from '../UI/loader/Loader'
import PassItem from './passItem/PassItem'
import BtnText from '../UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import PassListHeader from './passListHeader/PassListHeader'
import { territoriesUserSelector } from '../../store/selectors'
// import { useGetPassTerritoryQuery } from '../../store/RTKQuery/pass'
import { Plus } from '../../utilits/icon/plus'

export default function PassListContent({ error, loading, passList, selectPost, setPageNumber, pageSize, filterType, setFilterType, filterFavorite, setFilterFavorite, filterTerritory, setFilterTerritory, filterStatus, seFilterStatus, filterAll, setFilterAll, search, setSearch, loadingPass }) {
  const territoriesUserList = useSelector(territoriesUserSelector)
  const navigate = useNavigate()

  const handleCheck = () => {
    if (territoriesUserList?.length > 0) {
      navigate('/addPass')
    } else {
      toast('Территории не найдены!', { className: styles.error })
    }
  }

  useEffect(() => {
    setPageNumber(1)
  }, [filterAll])

  useEffect(() => {
    sessionStorage.setItem('pageSize', pageSize)
  }, [pageSize])

  useEffect(() => {
    sessionStorage.setItem('filterFavorite', JSON.stringify(filterFavorite))
  }, [filterFavorite])

  useEffect(() => {
    sessionStorage.setItem('filterType', JSON.stringify(filterType))
  }, [filterType])

  useEffect(() => {
    sessionStorage.setItem('filterTerritory', JSON.stringify(filterTerritory))
  }, [filterTerritory])

  useEffect(() => {
    sessionStorage.setItem('filterStatus', JSON.stringify(filterStatus))
  }, [filterStatus])

  return (
    <>
      <div className={styles.actionWrapper}>
        <Filter
          filterFavorite={filterFavorite}
          setFilterFavorite={setFilterFavorite}
          filterType={filterType}
          setFilterType={setFilterType}
          filterTerritory={filterTerritory}
          setFilterTerritory={setFilterTerritory}
          filterStatus={filterStatus}
          seFilterStatus={seFilterStatus}
          filterAll={filterAll}
          setFilterAll={setFilterAll}
          search={search}
          setSearch={setSearch}
        />
        <div className={styles.passListButton}>
          <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
            icon={<Plus />}
            onClick={handleCheck}
          >
            Создать пропуск
          </BtnText>
        </div>
      </div>
      <PassListHeader />
      <ul className={styles.passListTable}>
        {error && <div className="error">{error}</div>}
        {loading || loadingPass ? (
          <Loader />
        ) : passList.length ? (
          passList.map((pass) => {
            return (
              <PassItem
                key={pass.id}
                pass={pass}
                selectPost={selectPost}
              />
            )
          })
        ) : search && !passList.length ? (
          <EmptySearch />
        ) : (
          <EmptyList />
        )}
      </ul>
    </>
  )
}
