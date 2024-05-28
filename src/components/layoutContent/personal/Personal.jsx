/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Personal.module.css'
import { Link } from 'react-router-dom'
import { getAvatarApi } from '../../API/AvatarApi'
import { AvatarLogoMini } from '../../../utilits/icon/avatarLogoMini'
import { setAvatarUrl } from '../../../store/slices/avatarSlice'
import { avatarIdSelector, avatarUrlSelector } from '../../../store/selectors'
import { useContext } from 'react'
import { ResponsiveContext } from '../../../components/context/ResponsiveContext'

export default function Personal() {
  const { isDesktop } = useContext(ResponsiveContext)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const avatarUrl = useSelector(avatarUrlSelector)
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const responseGet = await getAvatarApi()
        const blob = await responseGet.blob()
        dispatch(setAvatarUrl(URL.createObjectURL(blob)))
      } catch (currentError) {
        setError(currentError.message)
      }
    }

    fetchAvatar()
  }, [])

  const authUser = JSON.parse(sessionStorage.getItem('user'))
  function getRole() {
    if (authUser.role == 'USER') {
      return 'Пользователь'
    }
    if (authUser.role == 'MANAGER') {
      return 'Менеджер'
    }
    if (authUser.role === 'SECURITY') {
      return 'Охранник'
    }
    if (authUser.role === 'ADMIN') {
      return 'Администратор'
    }
  }
  const role = getRole()

  sessionStorage.setItem('role', role)

  return (
    <div className={styles.personWrap}>
      <Link to="/personal" className={styles.account}>
        <div className={styles.accountPhoto}>
          {avatarUrl ? (
            <img alt="avatar" src={avatarUrl} className={styles.imgAva} />
          ) : (
            <AvatarLogoMini />
          )}
        </div>
        {isDesktop && (
          <div className={styles.accountTitle}>
            <p className={styles.accountName}>{authUser?.fullName}</p>
            <p className={styles.accountRole}>{role}</p>
          </div>
        )}
      </Link>
    </div>
  )
}
