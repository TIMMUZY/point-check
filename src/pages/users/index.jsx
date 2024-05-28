import styles from './Users.module.css'
import { useState, useEffect, useMemo } from 'react'
import UsersContent from '../../components/usersContent/UsersContent'
import Pagination from '../../components/common/pagination/Pagination'
import {
  getUsersAll,
  getUsersAssociated,
  getSearchUsers,
} from '../../components/API/UserApi'
import BtnText from '../../components/UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterUsersByBlocking } from '../../store/slices/filterUsersSlice'

export default function UsersPage() {
  const [usersList, setUsersList] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [responsePages, setResponsePages] = useState(null)
  const [responseElements, setResponseElements] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [needFetchUsers, setNeedFetchUsers] = useState(0)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  const arrClassesBtnText = [
    stylesBtnText.btnTextMedium,
    stylesBtnText.width100,
    stylesBtnText.colorActiveInDark,
    stylesBtnText.colorActive,
  ]

  const filterListByBlocking = [
    'Все пользователи',
    'Активные',
    'Заблокированные',
  ]

  const filterUsersByBlocking = useSelector(
    (state) => state.filterUsers.filterUsersByBlocking,
  )

  const onClickSelected = (obj) => {
    dispatch(setFilterUsersByBlocking(obj))
  }

  async function fetchUsers(pageNumber, pageSize) {
    let response = []
    try {
      setIsLoading(true)
      if (user.role === 'MANAGER') {
        response = await getUsersAssociated(pageNumber, pageSize)
      } else if (user.role === 'ADMIN') {
        response = await getUsersAll(pageNumber, pageSize)
      }
      setUsersList(response.content)
      setResponsePages(response.totalPages)
      setResponseElements(response.totalElements)
      setError(null)
    } catch (currentError) {
      setError(currentError.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function searchUsers(part) {
    let response = []
    try {
      setIsLoading(true)
      response = await getSearchUsers(part)
      setUsersList(response)
      setError(null)
    } catch (currentError) {
      console.log('respooooooonse', currentError)
      setError(currentError.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user.role === 'ADMIN') {
      search ? searchUsers(search) : fetchUsers(pageNumber - 1, pageSize)
    }
  }, [search])

  useEffect(() => {
    fetchUsers(pageNumber - 1, pageSize)
  }, [pageNumber, pageSize, needFetchUsers])

  return (
    <>
      <main className={styles.main}>
        <div className={styles.title}>
          <h2>Пользователи</h2>
          <div className={styles.typeWrapper}>
            {filterListByBlocking.map((obj, index) => (
              <div key={index}>
                <BtnText
                  classes={
                    filterUsersByBlocking === obj
                      ? arrClassesBtnText
                      : arrClassesBtnText.slice(0, -1)
                  }
                  onClick={() => onClickSelected(obj)}
                >
                  {obj}
                </BtnText>
              </div>
            ))}
          </div>
        </div>
        <UsersContent
          usersList={usersList}
          error={error}
          isLoading={isLoading}
          setNeedFetchUsers={setNeedFetchUsers}
          search={search}
          setSearch={setSearch}
        />
        {!search && (
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            responsePages={responsePages}
            responseElements={responseElements}
            fetchData={fetchUsers}
          />
        )}
      </main>
    </>
  )
}
