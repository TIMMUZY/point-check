// import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'
import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../UI/btnText/BtnText.module.css'
import { Bell } from '../../../utilits/icon/bell'
import { Ticket } from '../../../utilits/icon/ticket'
import { NavLink, useLocation } from 'react-router-dom'
import { Home } from '../../../utilits/icon/home'
import { Profile } from '../../../utilits/icon/profile'
import { useContext, useMemo } from 'react'
import { ResponsiveContext } from '../../context/ResponsiveContext'

export default function Navigation() {
  const location = useLocation()
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])
  const { isDesktop } = useContext(ResponsiveContext)

  const getBtnTextClasses = (path) => {
    const commonClasses = isDesktop
      ? [stylesBtnText.btnTextMedium]
      : [stylesBtnText.btnTextSmall]

    if (location.pathname === path) {
      return [...commonClasses, stylesBtnText.colorActive]
    } else {
      return [...commonClasses, stylesBtnText.colorGhost]
    }
  }

  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink to="/">
            <BtnText classes={getBtnTextClasses('/')} icon={<Ticket />}>
              Пропуска
            </BtnText>
          </NavLink>
        </li>
        <li>
          <NavLink to="/events">
            <BtnText classes={getBtnTextClasses('/events')} icon={<Bell />}>
              События
            </BtnText>
          </NavLink>
        </li>
        <li>
          <NavLink to="/territories">
            <BtnText
              classes={getBtnTextClasses('/territories')}
              icon={<Home />}
            >
              Объекты
            </BtnText>
          </NavLink>
        </li>
        {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
          <li>
            <NavLink to="/users">
              <BtnText classes={getBtnTextClasses('/users')} icon={<Profile />}>
                Пользователи
              </BtnText>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}
