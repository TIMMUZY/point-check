import styles from './UsersContent.module.css'
import { useState, useMemo, useEffect } from 'react'
import FilterUser from './filterUser/FilterUser'
import UsersHeader from './usersHeader/UsersHeader'
import PersonItem from '../common/personItem/PersonItem'
import EmptyList from '../common/stubs/EnptyList'
import Loader from '../UI/loader/Loader'

export default function UsersContent({
  usersList,
  error,
  isLoading,
  setNeedFetchUsers,
  search,
  setSearch,
}) {
  const [currentModalUserId, setCurrentModalUserId] = useState('')
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Проверяем, был ли клик выполнен внутри модалок
      if (!event.target.closest('.modal')) {
        setCurrentModalUserId('')
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return (
    <>
      {user.role === 'ADMIN' && (
        <FilterUser user={user} search={search} setSearch={setSearch} />
      )}

      <UsersHeader />
      <ul className={styles.table}>
        {isLoading ? (
          <Loader />
        ) : usersList?.length ? (
          usersList.map((person) => {
            return (
              <PersonItem
                key={person.id}
                person={person}
                setNeedFetchUsers={setNeedFetchUsers}
                currentModalUserId={currentModalUserId}
                setCurrentModalUserId={setCurrentModalUserId}
                fromUsersList
              />
            )
          })
        ) : (
          <EmptyList />
        )}
        {error && <div className="error">{error}</div>}
      </ul>
    </>
  )
}
