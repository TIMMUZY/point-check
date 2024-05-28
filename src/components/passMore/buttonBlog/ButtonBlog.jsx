/* eslint-disable no-unused-vars */
import styles from './ButtonBlog.module.css'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { delPass, cancelPass, activePass } from '../../API/PassAPI'
import {
  useMarkFavoriteMutation,
  useMarkNotFavoriteMutation,
  useDeletePassMutation,
} from '../../../store/RTKQuery/pass'
import BtnIcon from '../../UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../UI/btnIcon/BtnIcon.module.css'
import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../UI/btnText/BtnText.module.css'
import { Close } from '../../../utilits/icon/close'
import { Repeat } from '../../../utilits/icon/repeat'
import { Delete } from '../../../utilits/icon/delete'
import { Edit } from '../../../utilits/icon/edit'
import { Heart } from '../../../utilits/icon/heart'
import { useDispatch, useSelector } from 'react-redux'
import { setIsChangePass } from '../../../store/slices/changeSlice'
import { isPassChangeSelector } from '../../../store/selectors'

export default function ButtonBlog({
  pass,
  changeFavoriteLocal,
  setIsShowModal,
  error,
  setError,
}) {
  const navigate = useNavigate()
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])
  const [favorite, setFavorite] = useState(false)
  const [isLoadingCancel, setIsLoadingCancel] = useState(false)
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false)
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)
  const [isActive, setIsActive] = useState(
    pass?.status === 'ACTIVE' ? true : false,
  )
  const isPassChange = useSelector(isPassChangeSelector)
  const dispatch = useDispatch()

  const [favoriteQuery] = useMarkFavoriteMutation()
  const [notFavoriteQuery] = useMarkNotFavoriteMutation()
  const [delPass, { isLoading: isLoadingDel }] = useDeletePassMutation()

  useEffect(() => {
    setFavorite(pass?.favorite)
  }, [])

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
          toast.error('Что-то пошло не так, попробуйте позже!', {
            className: styles.error,
          })
          return
        }

        setFavorite(!favorite)
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        const response = await notFavoriteQuery({ id: pass.id })
        if (response.error?.data?.status === 404) {
          toast.error('Пропуск не найден!', { className: styles.error })
          return
        }

        if (response.error?.data?.status === 500) {
          toast.error('Ошибка сервера!', { className: styles.error })
          return
        }

        if (response.error) {
          toast.error('Что-то пошло не так, попробуйте позже!', {
            className: styles.error,
          })
          return
        }
        setFavorite(!favorite)
      } catch (err) {
        console.error(err)
      }
    }
  }
  const handleCancel = async () => {
    try {
      setError(null)
      setIsLoadingCancel(true)
      await cancelPass(pass.id)
      setIsActive(!isActive)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoadingCancel(false)
    }
  }
  const handleActive = async () => {
    try {
      setError(null)
      setIsLoadingCancel(true)
      await activePass(pass.id)
      setIsActive(!isActive)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoadingCancel(false)
    }
  }
  const handleRepeat = async () => {
    try {
      setError(null)
      setIsLoadingRepeat(true)
      navigate(`/addPass/${pass.id}`)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoadingRepeat(false)
    }
  }
  const handleEdit = async () => {
    try {
      setError(null)
      setIsLoadingEdit(true)
      navigate(`/changePass/${pass.id}`)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoadingEdit(false)
    }
  }
  const handleDel = async () => {
    try {
      setError(null)
      await delPass({ id: pass.id })
      dispatch(setIsChangePass(!isPassChange))
      setIsShowModal(false)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.buttonBlogWrap}>
      <div className={styles.buttonBlog}>
        {(user?.role === 'USER' ) &&
        <BtnIcon
          classes={[
            stylesBtnIcon.btnIconMedium,
            stylesBtnIcon.square,
            favorite ? stylesBtnIcon.colorActive : stylesBtnIcon.colorSecondary,
          ]}
          icon={<Heart />}
          onClick={handleFavorite}
        />}
        {(pass.status === 'ACTIVE' || pass.status === 'CANCELLED') &&
          (isActive ? (
            <BtnText
              classes={[
                stylesBtnText.btnTextSmall,
                stylesBtnText.colorHighlightLight,
              ]}
              icon={<Close />}
              onClick={handleCancel}
              disabled={isLoadingCancel}
            >
              {isLoadingCancel ? 'Обработка...' : 'Отменить'}
            </BtnText>
          ) : (
            <BtnText
              classes={[
                stylesBtnText.btnTextSmall,
                stylesBtnText.colorHighlightLight,
              ]}
              icon={<Close />}
              onClick={handleActive}
              disabled={isLoadingCancel}
            >
              {isLoadingCancel ? 'Обработка...' : 'Активаровать'}
            </BtnText>
          ))}

        <BtnText
          classes={[
            stylesBtnText.btnTextSmall,
            stylesBtnText.colorHighlightLight,
          ]}
          icon={<Repeat />}
          onClick={handleRepeat}
          disabled={isLoadingRepeat}
        >
          {isLoadingRepeat ? 'Обработка...' : 'Повторить'}
        </BtnText>
        {(pass?.status === 'ACTIVE' || pass?.status === 'DELAYED') && (
          <BtnText
            classes={[
              stylesBtnText.btnTextSmall,
              stylesBtnText.colorHighlightLight,
            ]}
            icon={<Edit />}
            onClick={handleEdit}
            disabled={isLoadingEdit}
          >
            {isLoadingEdit ? 'Обработка..' : 'Изменить'}
          </BtnText>
        )}
        <BtnText
          classes={[
            stylesBtnText.btnTextSmall,
            stylesBtnText.colorHighlightLight,
          ]}
          icon={<Delete />}
          onClick={handleDel}
          disabled={isLoadingDel}
        >
          {isLoadingDel ? 'Удаляем...' : 'Удалить'}
        </BtnText>
      </div>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  )
}
