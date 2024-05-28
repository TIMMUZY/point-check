import styles from './EventsContent.module.css'
import EventsHeader from './eventsHeader/EventsHeader'
import EventItem from './eventItem/EventItem'
import Loader from '../UI/loader/Loader'
import EmptyList from '../common/stubs/EnptyList'

export function EventsContent({ eventsList, error, isLoading}) {
  return (
    <>
      <EventsHeader />
      <ul className={styles.table}>
        {error && <div className={styles.error}>{error.message}</div>}
        {isLoading ? (
          <Loader/>
        ) : eventsList?.length ? (
          eventsList.map((event, index) => {
            return <EventItem key={index} event={event} />
          })
        ) : (
          <EmptyList />
        )}
      </ul>
    </>
  )
}
