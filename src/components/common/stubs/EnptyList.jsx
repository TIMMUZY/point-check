import styles from './Stubs.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { EmptyListImg } from '../../../utilits/icon/emptyList'
import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../UI/btnText/BtnText.module.css'
import { ArrowRight } from '../../../utilits/icon/arrowRight'
import { territoriesUserSelector } from '../../../store/selectors'
import { useMemo } from 'react'

export default function EmptyList() {
  const location = useLocation()
  const navigate = useNavigate()
  const territoriesUserList = useSelector(territoriesUserSelector)
  const isHomePage = location.pathname === '/'
  const isTerrytoryPage = location.pathname === '/territories'
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  const handleCheck = () => {
    if (territoriesUserList?.length > 0) {
      navigate('/addPass')
    } else {
      toast('Территории не найдены!', { className: styles.error })
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.blogImg}>
        <EmptyListImg />
        <p className={styles.textL}>Список пуст!</p>
      </div>
      {isHomePage && (
        <div className={styles.blogButton}>
          <p className={styles.textM}>Создайте ваш первый пропуск</p>
          <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
            iconRight={<ArrowRight />}
            onClick={handleCheck}
          >
            Создать пропуск
          </BtnText>
        </div>
      )}
      {isTerrytoryPage && (
        user.role === 'ADMIN' ?
          <div className={styles.blogButton}>
            <p className={styles.textM}>Создайте ваш первый объект</p>
            <BtnText
              classes={[stylesBtnText.btnTextBig, stylesBtnText.colorPrimary]}
              iconRight={<ArrowRight />}
              onClick={() => navigate('/addTerritory')}
            >
              Добавить объект
            </BtnText>
          </div>
          :
          <p className={styles.textM}>Попросите администратора добавить вас к объекту</p>)}
    </div>
  )
}

export function EmptyListMini() {

  return (
    <div className={styles.wrap}>
      <div className={styles.blogImg}>
        <EmptyListImg />
        <p className={styles.textL}>Список пуст!</p>
      </div>
    </div>
  )
}