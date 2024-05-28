import styles from './PassItem.module.css'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { toast } from 'react-toastify'
import Modal from '../../common/modal/Modal'
import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../UI/btnText/BtnText.module.css'
import BtnIcon from '../../UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../UI/btnIcon/BtnIcon.module.css'
import PassStatus from '../../common/passStatus/PassStatus'
import PassMore from '../../passMore/PassMore'
import { Person } from '../../../utilits/icon/person'
import { Truck } from '../../../utilits/icon/truck'
import { Heart } from '../../../utilits/icon/heart'
import { BackWard } from '../../../utilits/icon/backWard'
import { crossing } from '../../API/CrossApi'
import { Arrow } from '../../../utilits/icon/arrow'
import { ArrowRight } from '../../../utilits/icon/arrowRight'
import {
  useMarkFavoriteMutation,
  useMarkNotFavoriteMutation,
} from '../../../store/RTKQuery/pass'

export default function PassItem({ pass, selectPost }) {
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])
  const navigate = useNavigate()

  const [favoriteQuery] = useMarkFavoriteMutation()
  const [notFavoriteQuery] = useMarkNotFavoriteMutation()

  const [favorite, setFavorite] = useState(false)
  const [cross, setCross] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)

  useEffect(() => {
    setFavorite(pass.favorite)
    setCross(pass.expectedDirection)
  }, [])

  useEffect(() => {
    setFavorite(pass.favorite)
  }, [pass])

  const handleFavorite = async () => {
    if (!favorite) {
      try {
        const response = await favoriteQuery({ id: pass.id })

        if (response.error?.data?.status === 404) {
          toast.error('Пропуск не найден!', { className: styles.error })
          return
        }
  
        if (response.error?.data?.status === 500) {
          toast.error('Ошибка сервера!', { className: styles.error })
          return
        }

        if (response.error) {
          toast.error('Что-то пошло не так, попробуйте позже!', { className: styles.error })
          return
        }

          setFavorite(!favorite)
      
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
       const response =  await notFavoriteQuery({ id: pass.id })
       if (response.error?.data?.status === 404) {
        toast.error('Пропуск не найден!', { className: styles.error })
        return
      }

      if (response.error?.data?.status === 500) {
        toast.error('Ошибка сервера!', { className: styles.error })
        return
      }

      if (response.error) {
        toast.error('Что-то пошло не так, попробуйте позже!', { className: styles.error })
        return
      }
        setFavorite(!favorite)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleRepeat = () => {
    navigate(`/addPass/${pass.id}`)
  }

  const handlePass = async () => {
    try {
      await crossing(pass.id, selectPost.id, cross.toLowerCase())
      if (cross === 'IN') {
        setCross('OUT')
      } else {
        setCross('IN')
      }
    } catch (err) {
      toast.error(err.message, { className: styles.error })
    }
  }

  const handleOption = (e) => {
    e.stopPropagation()
    setIsShowModal(true)
  }

  return (
    <>
      <li
        onClick={handleOption}
        className={styles.tableItem}
        disabled={pass.statusDescription === 'Устарел' ? true : false}
      >
        <div className={styles.tableItemIcon}>
          {pass.dtype === 'AUTO' ? <Truck /> : <Person />}
        </div>
        <div className={styles.tableItemName}>
          {pass.dtype === 'AUTO' ? (
            <div className={styles.carNum}>
              <p>{pass.car?.licensePlate}</p>
            </div>
          ) : (
            <p>{pass.visitor?.name}</p>
          )}
        </div>
        <p className={styles.tableItemTel}>
          {pass.dtype === 'AUTO' ? pass.car?.phone : pass.visitor?.phone}
        </p>
        <p className={styles.tableItemDate}>
          {format(new Date(pass.startTime), 'd MMM HH:mm', { locale: ru }) +
            '  -  ' +
            format(new Date(pass.endTime), 'd MMM HH:mm', { locale: ru })}
        </p>
        <p className={styles.tableItemTerritory}>{pass.territory?.name}</p>
        <PassStatus className={styles.tableItemStatus}>
          {pass.statusDescription}
        </PassStatus>
        {user.role === 'USER' ? (
          <div className={styles.tableItemAction}>
            <BtnIcon
              classes={[
                stylesBtnIcon.btnIconMedium,
                stylesBtnIcon.square,
                favorite
                  ? stylesBtnIcon.colorActive
                  : stylesBtnIcon.colorSecondary,
              ]}
              icon={<Heart />}
              onClick={(e) => {
                e.stopPropagation()
                handleFavorite()
              }}
            />
            <BtnIcon
              classes={[
                stylesBtnIcon.btnIconMedium,
                stylesBtnIcon.square,
                stylesBtnIcon.colorSecondary,
              ]}
              icon={<BackWard />}
              onClick={(e) => {
                e.stopPropagation()
                handleRepeat()
              }}
            />
          </div>
        ) : user.role === 'SECURITY' &&
          pass.statusDescription === 'Активный' ? (
          cross === 'IN' ? (
            <BtnText
              classes={[
                stylesBtnText.btnTextMedium,
                stylesBtnText.colorPrimary,
                styles.tableItemAction,
              ]}
              icon={<Arrow />}
              onClick={(e) => {
                e.stopPropagation()
                handlePass()
              }}
            >
              Въезд
            </BtnText>
          ) : (
            <BtnText
              classes={[
                stylesBtnText.btnTextMedium,
                stylesBtnText.colorPrimary,
                styles.tableItemAction,
              ]}
              iconRight={<ArrowRight />}
              onClick={(e) => {
                e.stopPropagation()
                handlePass()
              }}
            >
              Выезд
            </BtnText>
          )
        ) : null}
      </li>
      <Modal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <PassMore
          passId={pass.id}
          isShowModal={isShowModal}
          // changeFavoriteLocal={changeFavoriteLocal}
          setIsShowModal={setIsShowModal}
        />
      </Modal>
    </>
  )
}
