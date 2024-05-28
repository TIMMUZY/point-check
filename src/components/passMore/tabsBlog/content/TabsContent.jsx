/* eslint-disable no-unused-vars */
import styles from './TabsContent.module.css'
import { Line } from '../../../../utilits/icon/line'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const TabContent1 = ({ pass }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <h2>Информация о пропуске</h2>
        <div className={styles.infoItem}>
          <p className={styles.lable}>
            {pass?.dtype === 'AUTO' ? 'Номер автомобиля' : 'ФИО'}
          </p>
          <p className={styles.text}>
            {pass?.dtype === 'AUTO'
              ? pass?.car?.licensePlate
              : pass?.visitor?.name}
          </p>
        </div>
        <Line />
        <div className={styles.infoItem}>
          <p className={styles.lable}>Телефон</p>
          <p className={styles.text}>
            {pass?.dtype === 'AUTO' ? pass?.car?.phone : pass?.visitor?.phone}
          </p>
        </div>
        <Line />
        <div className={styles.timeBlog}>
          <div className={styles.infoItem}>
            <p className={styles.lable}>Дата начала</p>
            <p className={styles.text}>
              {format(new Date(pass?.startTime), 'd MMM yyyy, HH:mm', {
                locale: ru,
              })}
            </p>
          </div>
          <div className={styles.infoItem}>
            <p className={styles.lableRight}>Дата окончания</p>
            <p className={styles.text}>
              {format(new Date(pass?.endTime), 'd MMM yyyy, HH:mm', {
                locale: ru,
              })}
            </p>
          </div>
        </div>
        <Line />
        <div className={styles.infoItem}>
          <p className={styles.lable}>Комментарий </p>
          <p className={styles.text}>
            {pass?.car ? pass?.comment : pass?.visitor?.note}
          </p>
        </div>
      </div>
      <div className={styles.contentType}>
        <div className={styles.contentBlog}>
          <p className={styles.lable}>Вид пропуска</p>
          <p className={styles.text}>
            {pass.dtype === 'AUTO' ? 'Автомобиль' : 'Пешеход'}
          </p>
        </div>
        <div className={styles.contentBlog}>
          <p className={styles.lable}>Тип пропуска</p>
          <p className={styles.text}>{pass?.timeTypeDescription}</p>
        </div>
      </div>
    </div>
  )
}

export const TabContent2 = ({ pass }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <h2>Информация о создателе</h2>
        <div className={styles.infoItem}>
          <p className={styles.lable}>ФИО</p>
          <p className={styles.text}>{pass?.user?.fullName}</p>
        </div>
        <Line />
        <div className={styles.infoItem}>
          <p className={styles.lable}>Телефон</p>
          <p className={styles.text}>{pass?.user?.mainNumber}</p>
        </div>
        <Line />
        <div className={styles.infoItem}>
          <p className={styles.lable}>Электронная почта</p>
          <p className={styles.text}>{pass?.user?.email}</p>
        </div>
        <Line />
        <div className={styles.infoItem}>
          <p className={styles.lable}>Создан</p>
          <p className={styles.text}>
            {format(new Date(pass?.addedAt), 'd MMM yyyy, HH:mm', {
              locale: ru,
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
