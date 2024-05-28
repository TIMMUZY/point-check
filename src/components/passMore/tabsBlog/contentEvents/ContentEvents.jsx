/* eslint-disable no-unused-vars */
import styles from './ContentEvents.module.css'
import { CrossIn, CrossAut } from '../../../../utilits/icon/crossing'
import { eventsPass } from '../../../API/PassAPI'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Loader from '../../../UI/loader/Loader'
import { EmptyListMini } from '../../../common/stubs/EnptyList'
import BtnIcon from '../../../UI/btnIcon/BtnIcon'
import { ArrowRight } from '../../../../utilits/icon/arrowRight'
import { Arrow } from '../../../../utilits/icon/arrow'
import stylesBtnIcon from '../../../UI/btnIcon/BtnIcon.module.css'

export const TabContent3 = ({ id }) => {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [crosses, setCrosses] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true)
        const responseGet = await eventsPass({ id, pageNumber })
        setCrosses(responseGet)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [pageNumber])

  function handleMinusPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  function handlePlusPage() {
    if (pageNumber < crosses?.totalPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  return (
    <div className={styles.wrapEvents}>
      <div className={styles.titleEvents}>
        <p className={styles.titleEventsText}>Пересечение</p>
        <p className={styles.titleEventsText}>Дата</p>
        <p className={styles.titleEventsText}>КПП</p>
      </div>
      {!isLoading ? (
        <div className={styles.contentCrosses}>
          {error ? (
            error && <div className={styles.error}>{error}</div>
          ) : (
            <>
              <ul className={styles.ulEvents}>
                {crosses?.content?.length > 0 ? (
                  crosses?.content?.map((cross) => {
                    return (
                      <li className={styles.itemEvents} key={cross.id}>
                        <div className={styles.icon}>
                          {cross.direction === 'IN' ? (
                            <CrossIn />
                          ) : (
                            <CrossAut />
                          )}
                          <p className={styles.textMain}>
                            {cross.direction === 'IN' ? 'Въезд' : 'Выезд'}
                          </p>
                        </div>
                        <p className={styles.textNegative}>
                          {format(
                            new Date(cross.performedAt),
                            'd MMM yyyy, HH:mm',
                            {
                              locale: ru,
                            },
                          )}
                        </p>
                        <p className={styles.textNegative}>КПП №2</p>
                      </li>
                    )
                  })
                ) : (
                  <EmptyListMini />
                )}
              </ul>
              {(crosses?.totalPages) > 1 && (
                <div className={styles.buttonBlog}>
                  <BtnIcon
                    icon={<Arrow />}
                    classes={[
                      stylesBtnIcon.pagination,
                      stylesBtnIcon.square,
                      stylesBtnIcon.colorWhite,
                    ]}
                    onClick={handleMinusPage}
                    disabled={pageNumber == 1}
                  />
                  <BtnIcon
                    icon={<ArrowRight />}
                    classes={[
                      stylesBtnIcon.pagination,
                      stylesBtnIcon.square,
                      stylesBtnIcon.colorWhite,
                    ]}
                    onClick={handlePlusPage}
                    disabled={pageNumber == (crosses?.totalPages)}
                  />
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}
