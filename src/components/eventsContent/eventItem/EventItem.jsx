import styles from './EventItem.module.css'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { PassStatusEvent } from '../passStatus/PassStatus'
import { Person } from '../../../utilits/icon/person'
import { CarEvent } from '../../../utilits/icon/car'
import { CrossIn, CrossAut } from '../../../utilits/icon/crossing'

export default function EventItem({ event }) {

  return (
    <>
      <li className={styles.tableItem}>
        <div className={styles.eventBlog}>
          {event.in_time && (
            <div className={styles.crossItem}>
              <div className={styles.icon}>
                <CrossIn />
                <p className={styles.textMain}>Въезд</p>
              </div>
              <div className={styles.timeBlog}>
                <p className={styles.textNegativeBig}>
                  {format(new Date(event.in_time), 'd MMM', {
                    locale: ru,
                  }).replace('.', '')}
                </p>
                <p className={styles.textNegative}>
                  {format(new Date(event.in_time), 'HH:mm', {
                    locale: ru,
                  })}
                </p>
              </div>
            </div>
          )}
          {event.out_time && (
            <div className={styles.crossItem}>
              <div className={styles.icon}>
                <CrossAut />
                <p className={styles.textMain}>Выезд</p>
              </div>
              <div className={styles.timeBlog}>
                <p className={styles.textNegativeBig}>
                  {format(new Date(event.in_time), 'd MMM', {
                    locale: ru,
                  }).replace('.', '')}
                </p>
                <p className={styles.textNegative}>
                  {format(new Date(event.out_time), 'HH:mm', {
                    locale: ru,
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.tableItemKindBlog}>
          <div className={styles.tableItemIcon}>
            {event.dtype === 'AUTO' ? <CarEvent /> : <Person />}
          </div>
          {event.dtype === 'AUTO' ? (
            <>
              <div className={styles.carNum}>
                <p className={styles.tableItemTextL}>{event.car_number}</p>
              </div>
              <p className={styles.tableItemTextL}>{event.car_brand}</p>
            </>
          ) : (
            <p className={styles.tableItemTextL}>{event.visitor}</p>
          )}
        </div>

        <p className={styles.tableItemTerritory}>{event.terr_name}</p>

        <p className={styles.tableItemType}>
          {event.timeTypeDescription}
        </p>
        <PassStatusEvent className={styles.tableItemStatus} statusRus={event.statusDescription}/>
      </li>
    </>
  )
}
