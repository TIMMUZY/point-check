import styles from './Event.module.css'
import { useState, useEffect, useMemo } from 'react'
import { EventsContent } from '../../components/eventsContent/EventsContent'
import Pagination from '../../components/common/pagination/Pagination'
import { eventsListApi } from '../../components/API/EventsApi'
import { getTerritoryUser } from '../../components/API/TerritoryApi'

export default function EventsPage() {
  const [eventsList, setEventsList] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [responsePages, setResponsePages] = useState(null)
  const [responseElements, setResponseElements] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  async function fetchEvents(pageNumber, pageSize) {
    let endpoint = ''
    try {
      if (user.role === 'USER') {
        endpoint = `/users/${user.id}?page=${pageNumber}&size=${pageSize}`
      } else if (user.role === 'MANAGER') {
        endpoint = `/users/${user.id}/territories?page=${pageNumber}&size=${pageSize}`
      } else if (user.role === 'ADMIN') {
        endpoint = `?page=${pageNumber}&size=${pageSize}`
      } else if (user.role === 'SECURITY') {
        const territory = await getTerritoryUser()
        endpoint = `/territories/${territory[0].id}?page=${pageNumber}&size=${pageSize}`
      }
      if (endpoint) {
        const response = await eventsListApi(endpoint)
        setEventsList(response.content)
        setResponsePages(response.totalPages)
        setResponseElements(response.totalElements)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents(pageNumber - 1, pageSize)
  }, [pageNumber, pageSize])

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h2>Пересечения</h2>
      </div>
      <EventsContent
        eventsList={eventsList}
        error={error}
        isLoading={isLoading}
      />
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        responsePages={responsePages}
        responseElements={responseElements}
        fetchData={fetchEvents}
      />
    </main>
  )
}
